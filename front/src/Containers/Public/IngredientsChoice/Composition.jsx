import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import IngredientsCakeStructure from './IngredientsCakeStructure';
import IngredientsMacaronStructure from './IngredientsMacaronStructure';
import IngredientsCookieStructure from './IngredientsCookieStructure';
import IngredientsBrownieStructure from './IngredientsBrownieStructure';
import IngredientsButtons from './IngredientsButtons';
import Progressbar from '../Progressbar';
import Price from '../Price';
import CakeInProgress from './CakeInProgress';

import '../../../Assets/Styles/Composition.css';

const Composition = (props) => {
  const { index, cake } = props;

  const renderComposition = (cakeType) => {
    let render;
    switch (cakeType) {
      case 'macaron': render = (<IngredientsMacaronStructure />); break;
      case 'cookie': render = (<IngredientsCookieStructure />); break;
      case 'brownie': render = (<IngredientsBrownieStructure />); break;
      default: render = (<IngredientsCakeStructure />);
    }
    return render;
  };

  return (
    <Container className="wrapper">
      <Row className="text-center">
        <Progressbar />
      </Row>
      <Row className="renderComposition">
        <Col sm="8">
          {renderComposition(cake.type)}
        </Col>
        <Col sm="4">
          <CakeInProgress />
          <Price />
        </Col>
      </Row>
      <Row sm="12">
        <IngredientsButtons index={index} />
      </Row>
    </Container>
  );
};

Composition.propTypes = {
  index: PropTypes.number.isRequired,
  cake: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  cake: state.cakeCharacteristics,
  price: state.price,
  index: state.pageIndex,
});

export default connect(mapStateToProps)(Composition);
