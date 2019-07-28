import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from 'styles';

const palette = [colors.blueElectron, colors.yellowElectron, colors.greenElectron, colors.purpleElectron]

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
    height : 50px;
`;

const Item = styled.a.attrs(({delay}) => ({
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
    font-size: 1.5rem;
    padding: 1rem 0;
    margin: 0 5%;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    animation: 0.5s slideIn forwards;
    color : ${colors.redElectron};
    text-decoration : none;

`;

const ItemLink = styled(Link).attrs(({index}) => ({
    style : {
      color : palette[index]
    }
}))`
    text-decoration : none;
    font-size: 1.5rem;
    padding: 1rem 0;
    margin: 0 5%;
    cursor: pointer;
    transition: color 0.2s ease-in-out;
    animation: 0.5s slideIn forwards;
    cursor : pointer;

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
      const { delay, item, index, feature, disconnect } = this.props;
      return(
        <Container delay={delay}>
          {
            feature ?
              <Item
              onClick={()=>disconnect()}
              href='/'
              >
                {this.props.children} 
              </Item> :
              <ItemLink 
                to={item.link}
                index={index}
              >
                {this.props.children}  
              </ItemLink>
          }
        <Line/>
      </Container>  
      )
    }
  }

  export default MenuItem;