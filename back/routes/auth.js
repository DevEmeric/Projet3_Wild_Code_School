const express = require('express');
const auth = express.Router();
const connection = require('../helper/db');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../helper/jwt_secret');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  {
    usernameField: 'id',
    passwordField: 'password'
  },
  function (id, password, cb) {
    connection.query('SELECT * FROM admin WHERE admin_id = ?', id, (err, result) => {
      if (err) return cb(err);
      else {
        const user = result[0];
        const hash = result[0].admin_password;
        const isSame = bcrypt.compareSync(password, hash);
        console.log("user, hash, isSame", user, hash, isSame)
        if (!isSame) cb(null, false, { message: 'Incorrect email or password.' });
        return cb(null, user, { message: 'Logged In Successfully' });
      }
    })
  }
));

// Authentification login / mot de passe - OK
auth.post('/auth/login', function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generates a signed son web token with the admin_id and returns it in the response
      const token = jwt.sign(user.admin_id, secret);
      return res.status(200).json({ user, token });
    });
  })(req, res);
});

// Ajout d'un nouvel admin - OK
auth.post('/auth/new', (req, res) => {
  // hashage password
  const hash = bcrypt.hashSync(req.body.password, 10);
  const id = req.body.id;
  connection.query('INSERT INTO admin SET ?', { admin_id: id, admin_password: hash }, (err, results) => {
    if (err) res.status(500).send(err);
    return res.status(200).send('Admin mis à jour');
  })
});

// Mise à jour d'un administrateur
auth.put('/auth/:id', (req, res) => {
  console.log(req.body)
  // hashage password
  const hash = bcrypt.hashSync(req.body.newAdmin.password, 10);
  const adminData = { admin_id: req.body.newAdmin.id, admin_password: hash }
  console.log(adminData, hash);
  connection.query('UPDATE admin SET ? WHERE id = ?', [ adminData, req.params.id ], (err, results) => {
    if (err) res.status(500).send(err);
    return res.status(200).send('Admin mis à jour');
  })
});

module.exports = auth;