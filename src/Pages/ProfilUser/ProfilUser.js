import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { socket } from 'Pages/LoginPage/LoginPage';

import LandingPage     from 'components/common/LandingPage';
import Avatar          from 'components/common/Avatar';
import Info            from 'components/common/Info';
import InputSearchList from 'components/common/InputSearchList';
import ButtonList      from 'components/common/ButtonList';
import WallMessage     from './components/WallMessage';
import Informations    from './components/Informations';

import EditButtonPng      from 'components/img/edit.png';
import SaveButtonPng      from 'components/img/save.png';

import { colors } from 'styles';
import { compare } from 'helper/sort';

import { friendRequest, recommendRequest } from 'store/actions/friends';
import { messageRequest, deleteMessage, responseRequest, deleteResponse, loadWalls } from 'store/actions/walls';
import { updateUsers }  from 'store/actions/users';
import { status } from 'constants/status';
import { typography } from 'styles';

import { updateUser } from 'store/actions/users';
import { loadFriends } from 'store/actions/friends';
import { loadWallJS } from 'store/actions/wallJs';


const Container = styled.div`
  display        : flex;
  flex-direction : column;
  margin-top     : 50px;
  @media(min-width: 1200px) {
    font-size : ${typography.xlarge}em;
  }
`;

const Head = styled.div`
  display        : flex;
  flex-direction : column;
`;

const ContainerAvatar = styled.div`
  display        : flex;
  flex-direction : row;
  justify-content: space-between;
  align-items    : center; 
`;

const AvatarProfil = styled(Avatar)`
  text-align : center;
  height     : 80px;
  width      : 80px;
`;

const EditButton = styled.img`
  width: 5%;
  max-width: 45px;
`;

const SaveButton = styled.img`
  width: 5%;
  max-width: 45px;
`;


const Row = styled.div`
  display         : flex;
  flex-drection   : row;
  justify-content : space-between;
  margin-top      : 10px;

  @media(min-width: 600px) {
    width         : 100%;
  }
  @media(min-width: 800px) {
    width         : 80%;
  }
  @media(min-width: 1200px) {
    width         : 40%;
  }
`;

const ContainerButton = styled.div`
  width          : 40%;
  display        : flex;
  flex-direction : row;
  justify-content: space-between;
  margin-top     : 20px;

  @media(max-width: 600px) {
    width         : 100%;
  }
  @media(min-width: 601px) {
    width         : 80%;
  }
  @media(min-width: 1200px) {
    width         : 40%;
  }
`;

const Status = styled.div`
  padding          : 10px 20px;
  background-color : ${colors.blueElectron};
  border-radius    : 5px;
  cursor           : pointer;
`;

const Recommend = styled.div`
  padding          : 10px 20px;
  background-color : ${colors.blueElectron};
  border-radius    : 5px;
  cursor           : pointer;
`;

const Wall = styled.div`
  flex             : 1;
  border-radius    : 5px;
`;

const ZoneText = styled.div`
  display        : flex;
  flex-direction : row;
  align-items    : center;
  border-radius  : 4px;
  height         : 40px;
  margin-top     : 10px;
  margin-bottom  : 10px;
  overflow       : hidden;
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

const PublishButton = styled.button`
  display : flex;
  flex-direction : row;
  align-items : center;
  justify-content : center;
  width : 80px;
  height : 94%;
  color  : white;
  background-color : ${colors.backgroundHighLight};
  border : 2px solid white;
  border-radius : 4px;
  cursor : pointer;
  :active {
    background-color : ${colors.red};
    color : white;
  }
  :hover {
    color : ${colors.blueElectron};
    border : 2px solid ${colors.blueElectron};
    background-color : ${colors.red};
  }
  `;


const Messages = styled.div``;

class ProfileUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      message  : '',
      response : '',
      connect  : 'en attente de connection',
      modify   : false 
    }
    this.handleClickRequestFriend   = this.handleClickRequestFriend.bind(this); 
    this.handleClickRecommendFriend = this.handleClickRecommendFriend.bind(this); 
    this.handleSendMessage          = this.handleSendMessage.bind(this); 
    this.handleMessageChange        = this.handleMessageChange.bind(this);
    this.handleDeleteMessage        = this.handleDeleteMessage.bind(this);
    this.handleResponseChange       = this.handleResponseChange.bind(this);
    this.handleSendResponse         = this.handleSendResponse.bind(this);
    this.handleDeleteResponse       = this.handleDeleteResponse.bind(this);
    this.handleUpdateUser           = this.handleUpdateUser.bind(this);

    if(!(this.props.usersItemsConnected || []).includes(this.props.user._id)){
      console.log('identify')
      socket.emit('identify', {
        token : JSON.parse(localStorage.getItem('token'))
      });
    }

    socket.on('updateUsers', (datas) =>{
      console.log(datas)
      localStorage.setItem('users', JSON.stringify(datas));
      this.props.updateUsers(datas);
      /* this.setState({messages : datas}); */
    });
    socket.on('friendsData', (friends) =>{
      console.log(friends)
      localStorage.setItem('friends', JSON.stringify(friends));
      this.props.loadFriends(friends);
    });

    socket.on('wallsData', (walls) =>{
      console.log(walls)
      localStorage.setItem('walls', JSON.stringify(walls));
      this.props.loadWalls(walls);
    });

    socket.on('wallsJSData', (walls) =>{
      console.log(walls)
      localStorage.setItem('wallsJS', JSON.stringify(walls));
      this.props.loadWallJS(walls);
    });
  }
  
  handleClickRequestFriend(){
    const { location, user, users } = this.props;
    const id = location.pathname.split('/')[2];
    const email = users[id].email;
    this.props.friendRequest(user._id, id, 2, 4, email);
  }

  handleClickRecommendFriend(idRecommend){
    const { location, user, users } = this.props;
    const id = location.pathname.split('/')[2];
    const email = users[id].email;
    this.props.recommendRequest(user._id, id, idRecommend, 6, email);
  }
  
  handleSendMessage(){
    const { user, location, users, walls={} } = this.props;
    const id = location.pathname.split('/')[2];
    const email = users[id].email;
    const name = `${user.firstName} ${user.lastName}`;
    const messageId = ((walls[id] || {}).messages || []).length+1;

    if(user._id === id){
      this.props.messageRequest(user._id, id, this.state.message, messageId);
    }
    else{
      this.props.messageRequest(user._id, id, this.state.message, messageId, {email, name});
    }
    this.setState({message : ''});
  }

  handleMessageChange(event){
    this.setState({ message : event.target.value });
  }

  handleDeleteMessage(user, messageId){
    this.props.deleteMessage(user, messageId);
  }

  handleResponseChange(event){
    this.setState({ response : event.target.value });
  }

  handleSendResponse(senderId, recipientId, messageId, subMessageId){
    console.log('ok')
    const { user, users, location } = this.props;
    const id = location.pathname.split('/')[2];
    const email = users[recipientId].email;
    this.props.responseRequest(id, senderId, recipientId, this.state.response, messageId, subMessageId, email);
  }

  handleDeleteResponse(user, messageId, subMessageId){
    this.props.deleteResponse(user, messageId, subMessageId);
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }

  handleUpdateUser(datas){
    const { location } = this.props;
    const id = location.pathname.split('/')[2];
    this.props.updateUser(id, datas);
    this.setState({modify : false});
  }

  render(){
    const { users, user, friends, location, walls={}, history } = this.props;

    const id = location.pathname.split('/')[2];
    const userProfil = id ? users[id] : '';
    
    const friendsList = [];
    const friendsOfProfil = friends.filter(friend => friend.id === id);
    const friendsOfProfilConfirmed = ((friendsOfProfil[0] || []).userId || []).filter(friend => friend.statusId === 3);
    const friendsFilter = friendsOfProfilConfirmed.forEach(userFriend => friendsList.push(users[userFriend.id]));

    const recommendList = [];
    const myFriends = friends ? friends.filter(friend => friend.id === user._id) : [];
    const myFriendsConfirmed = ((myFriends[0] || []).userId || []).filter(friend => friend.statusId === 3);
    const friendProfil = myFriends.length >= 1 ? myFriends[0].userId.filter(friend => friend.id === userProfil._id) : [];
    const recommendFilter = myFriendsConfirmed.forEach(friend => {
      let test = [];
      console.log(friend)
      for(let i = 0; i < friendsList.length; i++){
        if(friend.id === friendsList[i]._id || friend.id === userProfil._id){
          test.push('ami');
        }
      }
      if(test.length >= 1){
        test = [];
      }
      else{
        recommendList.push({id :friend.id});
        test = [];
      } 
    });

    const myMessages = ((walls || [])[id] || []).messages || [];
    const messagesSortByDate = myMessages.sort(compare);
    console.log(messagesSortByDate)
    
    return(
      <LandingPage history={history}>
        <Container>
          <Head> 
            <Informations 
              modify={this.state.modify}
              userProfil={userProfil}
              update={this.handleUpdateUser}
              user={user}
            />
            <ContainerButton>
              {
                user._id !== id ?
                <Status onClick={this.handleClickRequestFriend}>
                  {
                    friendProfil.length >= 1 ?
                    status[friendProfil[0].statusId].name :
                    status[1].name
                  }
                </Status> : null
              }
            {
              friendProfil.length >= 1 && friendProfil[0].statusId === 3 ?
                <ButtonList
                  placeholder="Recommander"
                  items={recommendList}
                  users={users}
                  onClick={this.handleClickRecommendFriend}
                />: null
            }
            </ContainerButton>
            <InputSearchList 
              placeholder="Liste d'amis"
              items={friendsList}
            />
          </Head>
          <Wall>
            {
              user.role === "admin" || user._id === id || (status[(friendProfil[0] || []).statusId] || []).name === "Ami" ?
                <ZoneText>
                  <TextArea 
                    onChange={this.handleMessageChange}
                    value={this.state.message}
                  />
                  <PublishButton onClick={this.handleSendMessage}>Envoyer</PublishButton>
                </ZoneText> : null
            }
            <Messages>
              {
                user.role === "admin" || user._id === id || (status[(friendProfil[0] || []).statusId] || []).name === "Ami" ?
                messagesSortByDate.map((message, index) => 
                  <WallMessage
                  key={index}
                  walls={walls} 
                  message={message} 
                  users={users}
                  user={userProfil}
                  deleteMessage={this.handleDeleteMessage}
                  value={this.state.value}
                  onChange={this.handleResponseChange}
                  sendResponse={this.handleSendResponse}
                  deleteResponse={this.handleDeleteResponse}
                  />
                ) : null
              }
            </Messages>
            {
              userProfil.logged ?
              <Widget 
                title="Messagerie Privée"	
                handleNewUserMessage={this.handleNewUserMessage}
                subtitle={this.state.connect}
              /> : null
            }
          </Wall>
        </Container>
      </LandingPage>
    );
  }
}

export default connect( 
  state => ({
    user    : state.user,
    users   : state.users,
    friends : state.friends,
    walls   : state.walls,
    usersItemsConnected : state.usersConnected
  }), 
  {
    friendRequest,
    recommendRequest,
    messageRequest,
    deleteMessage,
    responseRequest,
    deleteResponse,
    updateUser,
    updateUsers,
    loadFriends,
    loadWalls,
    loadWallJS
  }
)(ProfileUser);