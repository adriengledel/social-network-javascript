import React from 'react';
import styled from 'styled-components';

import LoginFooter from 'Pages/LoginPage/LoginFooter';
import HeaderMenu  from 'components/common/HeaderMenu';

import { colors } from 'styles.js';




const Background = styled.div` 
  background-color : ${colors.background};
  width            : 100%;
  height           : 100%;
  overflow-x       : hidden;
   @media(max-width : 800px){
     
   }
`;

const Container = styled.div`
  width     : 80%;
  height    : 100%;
  margin    : 0 auto;
  display        : flex;
  flex-direction : column;
   @media(max-width:600px){
     width : 90%;
   }
`;



class LandingPage extends React.Component {
  render() {
    const { footer, history } = this.props;
    return (
        <Background>
          <Container>
            <HeaderMenu history={history}/>
              {this.props.children}
            {
              footer ?
              <LoginFooter /> : <div style={{height:'30px'}}></div>
            }  
          </Container>
        </Background>
    );
  }
}

export default LandingPage;
