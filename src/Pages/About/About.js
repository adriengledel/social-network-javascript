import React from 'react';
import styled from 'styled-components';

import { typography } from 'styles';

import LandingPage from 'components/common/LandingPage';

const Content = styled.div`
  display         : flex;
  flex-direction  : row;
  align-items     : center;
  justify-content : center;
  height          : 100%;
  color           : white;
  font-size       : ${typography.xxlarge}em;
`;

class About extends React.Component{
  render(){
    return(
      <LandingPage>
        <Content>
          Bienvenue sur le réseau social des developppeurs ! tu peux échanger des astuces et conseils ou en recevoir.
        </Content>
    </LandingPage>
    );
  }
}

export default About;