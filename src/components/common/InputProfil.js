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
  color         : white;
  text-align    : left;
  margin-bottom : 3px;
`;

const Information = styled.input`
  font-size        : ${typography.medium}em;
  background-color : ${colors.blueLightElectron};
  color            : ${colors.background};
  border-radius    : 5px;
  padding          : 5px 10px; 
  outline          : none;
  width            : 50%;
`;

class Info extends React.Component{
  render(){
    const { label, value, onChange } = this.props;
    return(
      <Container>
        <Label>{label}</Label>
        <Information
          value={value}
          onChange={onChange} 
        />
      </Container>
    );
  }
}

export default Info;