import React from 'react';
import styled from 'styled-components';

import { colors } from 'styles';

import BinPng from 'components/img/bin.png';

const Container = styled.div`
  color            : white;
  display          : flex;
  flex-direction   : column;
  color            : white;
  background-color : ${colors.blueElectron};
  border-radius    : 4px;
  margin-bottom    : 8px;
  margin-right     : 15px;
  min-width        : 150px;
`;

const Head = styled.div`
  display         : flex;
  flex-direction  : row;
  justify-content : space-between;
  align-items     : center;
  margin-top      : 10px;
`;

const Sender = styled.div`
  font-size : 13px;
  font-weight : 500;
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

class ChatMessage extends React.Component{
  render(){
    const { message, users, user, deleteMessage } = this.props;
    console.log(message)
    const sender = users[message.userId];
    return(
      <Container>
        <Head>
          <Sender>
            {sender.firstName} {sender.lastName} 
          </Sender>
          {
            message.userId === user._id || user.role === "admin" ?
            <Bin 
              src={BinPng}
              onClick={() => deleteMessage(message.messageId)}
            /> : null
          }
        </Head>
        <Message>
          {message.message}
        </Message>
      </Container>
    );
  }
}

export default ChatMessage;