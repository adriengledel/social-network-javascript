import React from 'react';
import styled from 'styled-components';

const Container = styled.div.attrs(({delay}) => ({
    style : {
      animationDelay : delay
    }
}))`
    @keyframes appear {
      0% {
        opacity : 0;
      }
      100% {
        opacity : 1;
      }
    }
    opacity   : 0;
    animation : 1s appear forwards;
`;

const Item = styled.div.attrs(({delay}) => ({
  style : {
    animationDelay : delay
  }
}))`
    :hover {
      color : blue;
    }
    :active {
      color : blue;
    }
    @keyframes slideIn {
      0% {
        transform: translateX(-2%);
      }
      100% {
        transform: translateX(0);
      }
    }
    font-size: 1.2rem;
    padding: 1rem 0;
    margin: 0 5%;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    animation: 0.5s slideIn forwards;

`;

const Line = styled.div.attrs(({delay}) => ({
  style : {
    animationDelay : delay
  }
}))`
    @keyframes shrink {
      0% {
        width: 95%;
      }
      100% {
        width: 90%;
      }
    }
    width: 90%;
    height: 1px;
    background: gray;
    margin: 0 auto;
    animation: 0.5s shrink forwards;

`;

class MenuItem extends React.Component{
    render(){
      const { delay } = this.props;
      return(
        <Container delay={delay}>
          <Item 
            onClick={this.props.onClick}
          >
            {this.props.children}  
          </Item>
        <Line/>
      </Container>  
      )
    }
  }

  export default MenuItem;