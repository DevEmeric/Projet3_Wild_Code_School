import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Row, Container, Label, Col,
} from 'reactstrap';
import changeCakeSize from '../../../../Actions/cakeActions/changeCakeSize';
import changeCakeAmount from '../../../../Actions/cakeActions/changeCakeAmount';

import '../../../../Assets/Styles/BrownieSizeSelection.css';

const CakeSizeSelection = (props) => {
  const { size, selectCakeSize, selectQuantity } = props;
  return (
    <Container style={{ minWidth: '100%' }} className="text-center">
      <Label className="labels-perso mt-3">Choisissez la taille de vos brownies</Label>
      <Row className="brownieSizeSelection">
        <Col className="sm-4"><Button id="smallBrownie" className={size === 'S' && 'selectionOutline'} onClick={() => selectCakeSize('S')}>Petit</Button></Col>
        <Col className="sm-4"><Button id="averageBrownie" className={size === 'M' && 'selectionOutline'} onClick={() => selectCakeSize('M')}>Moyen</Button></Col>
        <Col className="sm-4"><Button id="bigBrownie" className={size === 'L' && 'selectionOutline'} onClick={() => selectCakeSize('L')}>Gros</Button></Col>
      </Row>
      <Row>
        <Label className="labels-perso mt-3">Choisissez le nombre de brownies que vous voulez </Label>
        <input placeholder="Quantité de brownies" onChange={event => selectQuantity(parseInt(event.target.value, 10))} />
      </Row>
    </Container>
  );
};

CakeSizeSelection.propTypes = {
  size: PropTypes.string.isRequired,
  selectCakeSize: PropTypes.func.isRequired,
  selectQuantity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ size: state.cakeCharacteristics.size });

const mapDispatchToProps = dispatch => ({
  selectCakeSize: size => dispatch(changeCakeSize(size)),
  selectQuantity: amount => dispatch(changeCakeAmount(amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CakeSizeSelection);
