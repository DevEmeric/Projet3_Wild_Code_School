import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Container, Row, Label, Button,
} from 'reactstrap';
// import { Redirect } from 'react-router-dom';
import { createAdmin, connectAdmin, updateAdmin } from './admin_DB_actions';
import registerToken from '../../../Actions/adminsActions/registerToken';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        adminPassword: '',
      },
      passwordConfirm: '',
    };
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress = (event) => {
    const { user, passwordConfirm } = this.state;
    const { action } = this.props;
    if (((action === 'Se connecter' && user.name === '' && user.adminPassword === '') || (user.name === '' || user.adminPassword === '' || user.adminPassword !== passwordConfirm)) && (event.key === 'Enter')) {
      this.submitUser();
    }
  }

  submitUser = async () => {
    const { action, history, saveToken } = this.props;
    const { user } = this.state;
    if (action === 'Créer') {
      createAdmin(user);
      history.push('/admin/adminList');
    }
    if (action === 'Se connecter') {
      const answer = await connectAdmin(user);
      window.alert(answer.message);
      saveToken(answer.token);
      history.push('/admin/adminList');
    }
    if (action === 'Modifier') {
      const { index } = this.props;
      updateAdmin(user, index);
      history.push('/admin/adminList');
    }
  }

  updateUser = (stateToUpdate, value) => {
    this.setState({
      ...this.state,
      user: {
        ...this.state.user,
        [stateToUpdate]: value,
      },
    });
  }

  render() {
    const { action } = this.props;
    const { user, passwordConfirm } = this.state;
    const confirmStyle = {
      display: action === 'Se connecter' ? 'none' : 'block',
    };
    let disabled;
    if (action === 'Se connecter') disabled = user.name === '' || user.adminPassword === '';
    else disabled = user.name === '' || user.adminPassword === '' || user.adminPassword !== passwordConfirm;

    return (
      <Container>
        <Row>
          <Label>Identifiant : </Label>
          <input
            placeholder="Identifiant"
            type="text"
            onChange={e => this.updateUser('name', e.target.value)}
          />
        </Row>
        <Row>
          <Label>Mot de passe : </Label>
          <input
            placeholder="Mot de passe"
            type="password"
            onChange={e => this.updateUser('adminPassword', e.target.value)}
          />
        </Row>
        <Row style={confirmStyle}>
          <Label>Confirmer mot de passe : </Label>
          <input
            placeholder="Confirmer mot de passe"
            type="password"
            onChange={e => this.setState({ passwordConfirm: e.target.value })}
          />
        </Row>
        <Button disabled={disabled} onClick={() => this.submitUser()}>{action}</Button>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  index: state.adminIndex,
});

const mapDispatchToProps = dispatch => ({
  saveToken: token => dispatch(registerToken(token))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
