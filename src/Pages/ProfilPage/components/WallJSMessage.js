import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { colors } from 'styles';

import BinPng from 'components/img/bin.png';

const Container = styled.div`
  color            : white;
  display          : flex;
  flex-direction   : column;
  color            : white;
  background-color : ${colors.blueElectronHighLight};
  border-radius    : 4px;
  margin-top       : 8px;
  width            : 90%;
`;

const Head = styled.div`
  display         : flex;
  flex-direction  : column;
  justify-content : space-between;
  margin-top      : 10px;
  margin-left     : 10px;
`;

const Sender = styled.div`
  font-size : 13px;
  font-weight : 500;
  color       : ${colors.blueElectron};
`;

const Bin = styled.img`
  width  : 15px;
  height : 15px; 
  margin-right : 10px;
`;

const Message = styled.div`
  padding   : 10px;
  font-size : 15px;
`;

const Date = styled.div`
  font-size : 10px;
  color     : ${colors.purpleElectron};
`;

class ChatMessage extends React.Component{
  render(){
    const { message, users, user, deleteMessage } = this.props;
    const sender = users[message.senderId];
    return(
      <Container>
        <Head>
          <Sender>
            {sender.firstName} {sender.lastName} 
          </Sender>
          <Date>{moment(message.date).format('D MMMM YYYY HH mm')}</Date>
        </Head>
        <Message>
          {message.text}
        </Message>
      </Container>
    );
  }
}

export default ChatMessage;