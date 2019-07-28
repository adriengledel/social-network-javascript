import React from 'react';
import styled from 'styled-components';

import { colors, typography } from 'styles.js';

const Text = styled.div`
  line-height  : 65px;
  font-weight  : 400;
  margin-right : 40px;
    @media(max-width:800px){
      text-align : center;
      line-height  : 40px;
      margin-right : inherit;
    }
`;

const HeadSentence = styled.h1`
  color       : white;
  font-weight : 500;
  font-size   : ${typography.huge}em;
  margin      : 3%;
  font-family : 'Bungee Shade' , cursive;
`;

const Sentence = styled.div`
  font-size   : ${typography.xlarge}em;
  line-height : 30px;
  color       : ${colors.textColorLogin};
  margin      : 3%;
  font-family : 'Bungee Inline' , cursive;
`;

const Blue = styled.span`
  color : ${colors.blueElectron};
`;

const Yellow = styled.span`
  color : ${colors.yellowElectron};
`;

const Red = styled.span`
  color : #e76572;
`;

class TextPresentation extends React.Component {
  render() {
    return (
      <Text>
        <HeadSentence>
          Le <Blue>réseau social</Blue>,
          <br /> 
          des <Red>développeurs</Red> <Yellow>Javascript</Yellow> !
        </HeadSentence>
        <Sentence>
          Echange des astuces et conseils, 
          <br/>
          avec des milliers de développeurs !
        </Sentence>
      </Text>
    );
  }
}

export default TextPresentation;