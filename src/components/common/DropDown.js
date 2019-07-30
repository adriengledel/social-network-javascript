import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';


const Container = styled.div`
  position       : relative;
  vertical-align : bottom;
`;

const Button = styled.div`
`;


class DropDown extends React.Component {
  state = {visible : false};

  constructor(props) {
    super(props);

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleButtonClick   = this.handleButtonClick.bind(this);
    this.close               = this.close.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click',    this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click',    this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleDocumentClick(event) {
    if (!ReactDOM.findDOMNode(this).contains(event.target)) {
      this.close();
    }
  }

  handleButtonClick(event) {
    this.setState({visible : !this.state.visible});
  }

  close() {
    this.setState({visible : false})
  }

  render() {
    const { ButtonElement, DropDownElement, className } = this.props;

    return (
      <Container className={className}>
        <Button
          onClick={this.handleButtonClick}
        >
          {ButtonElement}
        </Button>
        {this.state.visible ? DropDownElement : null}
      </Container>
    );
  }
}


export default DropDown;