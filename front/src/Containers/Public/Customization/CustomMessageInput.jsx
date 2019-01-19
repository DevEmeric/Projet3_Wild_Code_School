import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'reactstrap';
import '../../../Assets/Styles/Customization.css';

class CustomMessageInput extends Component {
  constructor(props) {
    const { customAdmin } = props;
    super(props);
    this.mixFont = customAdmin.selectedFonts[Math.floor(Math.random()
      * customAdmin.selectedFonts.length)];
    this.state = { randomFont: this.mixFont };
  }

  componentWillMount() {
    const { randomFont } = this.state;
    const { sendDefaultFont } = this.props;
    sendDefaultFont(randomFont);
  }
    
  updateMessage = (e) => {
    const { modify } = this.props;
    const type = 'UPDATE_CUSTOM_MESSAGE';
    modify(type, e.target.value);
  };

  render() {
    const { customAdmin, message } = this.props;
    const { randomFont } = this.state;

    return (
      <div>
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css?family=${message.msgFont}`}
        />
        <Input
          type="textarea"
          style={{
            fontFamily: message.msgFont ? message.msgFont : randomFont,
            fontSize: '1.2em',
            backgroundColor: message.msgBgColor,
            color: message.msgColor,

          }}
          name="text"
          id="wantsCustomMessage"
          maxLength="40"
          placeholder={customAdmin.placeHolder}
          onChange={this.updateMessage}
          // onClick={updateMessage}
          value={message.msgContent}
          resize="none"
        />
      </div>
    );
  }
}

CustomMessageInput.propTypes = {
  customAdmin: PropTypes.shape({}).isRequired,
  modify: PropTypes.func.isRequired,
  message: PropTypes.shape({}).isRequired,
};

const mapStatetoProps = state => ({
  customAdmin: state.customizationAdmin,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStatetoProps, mapDispatchToProps)(CustomMessageInput);
