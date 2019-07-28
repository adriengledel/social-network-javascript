import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import LandingPage from 'components/common/LandingPage';

import { LOGIN_PATH } from 'Routes/Paths';

import { colors, typography } from 'styles';

const Text = styled.div`
  font-size : ${typography.xlarge}em;
  color     : ${colors.blueElectron};
`;

const Content = styled.div`
  display         : flex;
  flex-direction  : column;
  justify-content : center;
  align-items     : center;
  height          : 100%;
`;

const LoginPage = styled(Link)`
  color      : ${colors.redElectron};
  margin-top : 50px;
  font-size  : ${typography.xlarge}em;
`;

class Authentificate extends React.Component{
  render(){
    return(
      <LandingPage>
        <Content>
          <Text>Félicitation votre compte à bien été créé ! vous recevrez un mail d'ici un instant</Text>
          <LoginPage to="/">Page d'acceuil</LoginPage>
        </Content>
      </LandingPage>
    );
  }
}

export default Authentificate;