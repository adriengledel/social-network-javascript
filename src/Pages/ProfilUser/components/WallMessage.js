import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';

import { colors } from 'styles';

import ArrowPng from 'components/img/play.png';
import editPng  from 'components/img/edit.png';
import binPng   from 'components/img/bin.png';
import { typography } from 'styles';

const Container = styled.div`
  display        : flex;
  flex-direction : column;
  border-radius  : 4px;
  margin-top     : 5px;
  background-color : ${colors.backgroundHighLight};
  padding        : 10px;
`;

const ContainerResponse = styled.div`
  display        : flex;
  flex-direction :  column;
  margin-left    : 25px;
`;

const Head = styled .div`
  display         : flex;
  flex-direction  : row;
  align-items     : center;
  justify-content : space-between;
  color           : ${colors.blueElectron};
`;

const Left = styled.div`
  display        : flex;
  flex-direction : row;
  align-items    : center;
`;

const Right = styled.div`
  display        : flex;
  flex-direction : row;
  align-items    : center;
`;

const Sender = styled.div``;

const Recipient = styled.div``;

const Message = styled.div`
  font-size : ${typography.medium}em;
  margin    : 5px 0;
  color     : white;
  font-weight : 500;
`;

const Date = styled.div`
  font-size : 10px;
  color     : white;
`;

const Delete = styled.img`
  width  : 20px;
  height : 20px;
  margin : 0 5px;
`;

const Arrow = styled.img`
  width  : 15px;
  height : 15px;
  margin : 0 5px;
`;

const Response = styled.div``;

const TextResponse = styled.div`
  text-decoration : underline;
  color           : ${colors.yellowElectron};
  font-size       : 12px;
  margin-left     : 25px;
`;

const ZoneText = styled.div`
  display        : flex;
  flex-direction : row;
  align-items    : center;
  border-radius  : 4px;
  height         : 35px;
  margin-top     : 10px;
  margin-bottom  : 10px;
  overflow       : hidden;
  border         : 2px solid ${colors.yellowElectron};
`;

const TextArea = styled.textarea`
  width : 100%;
  resize : none;
  height : 100%;
  background-color : ${colors.backgroundHighLight};
  border: none;
  overflow: auto;
  outline: none;
  padding-top: 18px;
  padding-left: 18px;
  color : white;
  caret-color : white;
  font-size   : 16px;
`;

const Input = styled.input`
  border           : none;
  background-color : ${colors.backgroundHighLight};
  height           : 20px;
  width            : 40px;
  color            : white;
  border-radius    : 4px;
  border-bottom    : ${colors.redElectron};
`;

const PublishButton = styled.div`
  display : flex;
  flex-direction : row;
  align-items : center;
  justify-content : center;
  width : 80px;
  height : 94%;
  color  : white;
  background-color : ${colors.backgroundHighLight};
  border-left : 2px solid ${colors.yellowElectron};
  border-radius : 4px;
  cursor : pointer;
  :active {
    background-color : ${colors.red};
    color : white;
  }
  :hover {
    color : ${colors.blueElectron};
    border-left : 2px solid ${colors.blueElectron};
    background-color : ${colors.red};
  }
  `;

class WallMessage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hoverMessage : false,
      hoverResponse: false,
      showTextArea : false
    }
    this.handleClickOnResponse = this.handleClickOnResponse.bind(this);
    this.handleSendResponse    = this.handleSendResponse.bind(this);
  }

  handleClickOnResponse(){
    this.setState({showTextArea : true}, () => {
      this.responseInput.focus();
    });
  }

  handleSendResponse(){
    const { user, sendResponse, message, userAccount } = this.props;
    const { senderId, recipientId, text, date, id, responses } = message;
    const subId = (responses || []).length+1;
    const lastResponse = responses.length > 0 ? responses[responses.length-1] : [];

    if(responses.length > 0){
      sendResponse(userAccount._id, lastResponse.senderId, id,`${id}-${subId}`);
    }
    else{
      sendResponse(userAccount._id, senderId, id,`${id}-${subId}`);
    }
    this.setState({showTextArea : false});
  }
  
  render(){
    const { 
      message, 
      user, 
      users =[], 
      deleteMessage, 
      value, 
      onChange, 
      sendResponse, 
      walls, 
      deleteResponse,
      userAccount 
    } = this.props;

    const { senderId, recipientId, text, date, id, responses } = message;
    const sender = users[senderId];
    const recipient = users[recipientId] || [];
    const subId = (responses || []).length+1;
    const lastResponse = responses.length > 0 ? responses[responses.length-1] : [];

    return(
      <Container 
        onMouseOver={()=>this.setState({hoverMessage : true})}
        onMouseLeave={()=>this.setState({hoverMessage : false})}
      >
        <Head>
          <Left>
            <Sender>{sender.firstName} {sender.lastName} </Sender>
            {
              sender.firstName !== recipient.firstName && sender.lastName !== recipient.lastName ?
              <>
              <Arrow src={ArrowPng}/>
              <Recipient> {recipient.firstName} {recipient.lastName}</Recipient>
              </> : null
            }
          </Left>
          <Right>
          {
            this.state.hoverMessage ?
            <>
            {
              userAccount.role === "admin" || senderId === userAccount._id ?
              <Delete 
                src={binPng}
                onClick={()=> deleteMessage(user._id, id)}
              /> :null
            }
            </> : null
          }
          </Right>
        </Head>
        <Date>{moment(date).format('D MMMM YYYY HH mm')}</Date>
        <Message>{text}</Message>
        {
          responses.map((response, index) => {
            let sender = users[response.senderId];
            let recipient = users[response.recipientId];
            return <ContainerResponse 
              onMouseOver={()=>this.setState({hoverResponse : true})}
              onMouseLeave={()=>this.setState({hoverResponse : false})}
              key={index}
            >
              <Head>
                <Left>
                  <Sender>{sender.firstName} {sender.lastName} </Sender>
                  <Arrow src={ArrowPng}/>
                  <Recipient> {recipient.firstName} {recipient.lastName}</Recipient>
                </Left>
                <Right>
                {
                  this.state.hoverResponse ?
                  <>
                  {
                    userAccount.role === "admin" || sender._id === userAccount._id ?
                    <Delete 
                      src={binPng}
                      onClick={()=> deleteResponse(user._id, id, `${response.id}`)}
                    /> : null
                  }
                  </> : null
                }
                </Right>
              </Head>
              <Date>{moment(date).format('D MMMM YYYY HH MM')}</Date>
              <Message>{response.text}</Message>
          </ContainerResponse>
          })
        }
        {
          user._id === userAccount._id || lastResponse.recipientId === userAccount._id || userAccount.role === "admin" ?
        <Response>
          {
            !this.state.showTextArea ?
            <TextResponse onClick={this.handleClickOnResponse}>Répondre</TextResponse> :
            <ZoneText>
              <TextArea 
                onChange={onChange}
                value={value}
                ref={(input) => { this.responseInput = input }} 
              />
              <PublishButton onClick={this.handleSendResponse}>Envoyer</PublishButton>
            </ZoneText>
          }
        </Response> : null
        }
      </Container>
    );
  }
}

export default connect( state => ({
  userAccount : state.user
}))(WallMessage);