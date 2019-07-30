import React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import socketIOClient from "socket.io-client";

import { updateDatas } from 'store/update';
import { updateFriendRequest, validRecommendRequest, deleteFriend } from 'store/actions/friends';
import { loadWalls } from 'store/actions/walls';
import { loadWallJS } from 'store/actions/wallJs';


import { loadTopics }     from 'store/actions/topics';
import { updateUsers }    from 'store/actions/users'
import { loadFriends }    from 'store/actions/friends';
import { usersConnected } from 'store/actions/usersConnected'; 

import ProfilPageMobile from './mobile/ProfilPageMobile';
import ProfilPageDesktop from './deskstop/ProfilPageDesktop';

import { token } from '../LoginPage/LoginPage';

import { socket } from 'Pages/LoginPage/LoginPage';

/* var socket;
 */
const Container = styled.div`
  height : 100%;
`;



class ProfilPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      messages : this.props.topics,
      view     : ''
    }

    this.handleAcceptRequest               = this.handleAcceptRequest.bind(this);
    this.handleIgnoreRequest               = this.handleIgnoreRequest.bind(this);
    this.handleClickValidRecommendFriend   = this.handleClickValidRecommendFriend.bind(this); 
    this.handleClickIgnoreRecommendFriend  = this.handleClickIgnoreRecommendFriend.bind(this); 
    this.handleClickDeleteFriend           = this.handleClickDeleteFriend.bind(this); 

/*     socket = socketIOClient('http://localhost:8000/');
 */  

    socket.on('connect', () => {
    });
    
    if(!(this.props.usersItemsConnected || []).includes(this.props.user._id)){
      socket.emit('identify', {
        token : JSON.parse(localStorage.getItem('token'))
      });
    }

    socket.on('usersConnected', (datas) => {
      this.props.usersConnected(datas);
    });

    socket.on('topicsData', (datas) =>{
      localStorage.setItem('topics', JSON.stringify(datas));
      this.props.loadTopics(datas);
      /* this.setState({messages : datas}); */
    });

    socket.on('updateUsers', (datas) =>{
      localStorage.setItem('users', JSON.stringify(datas));
      this.props.updateUsers(datas);
      /* this.setState({messages : datas}); */
    });

    socket.on('friendsData', (friends) =>{
      localStorage.setItem('friends', JSON.stringify(friends));
      this.props.loadFriends(friends);
    });

    socket.on('wallsData', (walls) =>{
      localStorage.setItem('walls', JSON.stringify(walls));
      this.props.loadWalls(walls);
    });

    socket.on('wallsJSData', (walls) =>{
      localStorage.setItem('wallJS', JSON.stringify(walls));
      this.props.loadWallJS(walls);
    });
    
  }

  componentDidMount(){
    this.props.updateDatas();
    if(window.innerWidth < 1200){
      this.setState({ view : 'mobile'});
    }
  }
  
 
  handleAcceptRequest(friendId){
    const { user } = this.props;
    this.props.updateFriendRequest(user._id, friendId, 3, 3);
  }

  handleIgnoreRequest(friendId){
    const { user } = this.props;
    this.props.updateFriendRequest(user._id, friendId, 4, 4);
  }

  handleClickValidRecommendFriend(id){
    const { user, users } = this.props;
    const email = users[id].email;
    this.props.validRecommendRequest(user._id, id, 2, 5, email);
  }

  handleClickIgnoreRecommendFriend(id){
    const { user, users } = this.props;
    const email = users[id].email;
    this.props.validRecommendRequest(user._id, id, 4, 4, email);
  }

  handleClickDeleteFriend(friendId){
    const { user } = this.props;
    this.props.deleteFriend(user._id, friendId);
  }

  render(){
    const { users, user, friends, history } = this.props;
    return(
      <Container>
        {
          this.state.view === 'mobile' ?
          <ProfilPageMobile 
            users={users}
            user={user}
            friends={friends}
            accepteRequest={this.handleAcceptRequest}
            ignoreRequest={this.handleIgnoreRequest}
            valideRecommendRequest={this.handleClickValidRecommendFriend}
            ignoreRecommendRequest={this.handleClickIgnoreRecommendFriend}
            deleteFriend={this.handleClickDeleteFriend}
            messages={this.state.messages}
            history={history}
          /> :
          <ProfilPageDesktop 
            users={users}
            user={user}
            friends={friends}
            accepteRequest={this.handleAcceptRequest}
            ignoreRequest={this.handleIgnoreRequest}
            valideRecommendRequest={this.handleClickValidRecommendFriend}
            ignoreRecommendRequest={this.handleClickIgnoreRecommendFriend}
            deleteFriend={this.handleClickDeleteFriend}
            messages={this.state.messages}
            history={history}
          />
        }
      </Container>
    );
  }
}


export default connect( state => ({
  users : state.users,
  user  : state.user,
  friends : state.friends,
  topics  : state.topics,
  usersItemsConnected : state.usersConnected
}), {
  updateDatas,
  updateFriendRequest,
  validRecommendRequest,
  deleteFriend,
  loadTopics,
  updateUsers,
  loadFriends,
  loadWalls,
  usersConnected,
  loadWallJS
})(ProfilPage);