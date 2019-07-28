import React from 'react';
import styled from 'styled-components';

import { colors, typography } from 'styles';

const Container = styled.div`
  display         : flex;
  flex-direction  : column;
  justify-content : center;
`;

const Label = styled.div`
  font-size     : ${typography.medium}em;
  color         : ${colors.yellowElectron};
  text-align    : left;
  margin-bottom : 3px;
`;

const Information = styled.div`
  font-size        : ${typography.medium}em;
  background-color :  ${colors.blueLightElectron};
  color            : ${colors.background};
  border-radius    : 5px;
  padding          : 5px 10px; 
`;

class Info extends React.Component{
  render(){
    const { label } = this.props;
    return(
      <Container>
        {
          this.props.children ?
            <>
            <Label>{label}</Label>
            <Information>
              {this.props.children}
            </Information> </> : null
        }
      </Container>
    );
  }
}

export default Info;