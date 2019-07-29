import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Widget } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';


import SwitchButton    from 'components/common/SwitchButton';
import LandingPage     from 'components/common/LandingPage';
import InputSearchList from 'components/common/InputSearchList';
import FriendsList     from '../components/FriendsList';
import Avatar          from 'components/common/Avatar';
import Forum           from '../components/Forum';
import WallJs          from '../components/WallJs';

import { colors } from 'styles';

import {
  PROFIL_USER
} from 'Routes/Paths.js';

const Container = styled.div`
  height : 80%;
`;

const Head = styled.div`
`;

const Content = styled.div`
  display : flex;
  flex-direction : row;
  justify-content : space-between;
  background-color : ${colors.background};
  height           : 100%;
  align-items      : center;
`;

const LeftContainer = styled.div`
  height : 100%;
  display : flex;
  flex-direction : column;
  justify-content : center;
  margin-right : 30px;
  min-width : 400px;
`;

const RightContainer = styled.div`
  height : 100%;
  display : flex;
  flex-direction : column;
  justify-content : center;
  margin-left : 30px;
  min-width : 400px;
`;

const MiddleContainer = styled.div`
  display : flex;
  flex-direction : column;
  height : 100%;
  width : 100%;
  align-items : center;
`;

const SwitchContainer = styled.div`
  height      : 50px;
  font-weight : 450;
  color       : white;
`;

const User = styled(Link)`
  display        : flex;
  flex-direction : row;
  align-items    : center;
  margin-bottom  : 20px;
  text-decoration : none;
  color : white;
`;

const SettingFriends = styled(FriendsList)`
  min-width : 400px;
  flex : none;
`;

const Chat = styled(Forum)`
  min-width : 400px;
  flex : none;
`;

const Title = styled.div`
  color : ${colors.yellowElectron};
  text-align : center;
  font-size : 25px;
  margin-bottom : 25px;
`;

const TitleActuality = styled.div`
  color : ${colors.yellowElectron};
  text-align : center;
  font-size : 25px;
  margin-top : -50px;
`;

class ProfilPageDesktop extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      value : 'gestion',
      filter : ''
    }
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleViewChange(value){
    this.setState({value});
  }

  handleSearch(event){
    this.setState({filter : event.target.value})
  }

  render(){
    const { 
      users, 
      user, 
      friends, 
      accepteRequest, 
      ignoreRequest, 
      valideRecommendRequest, 
      ignoreRecommendRequest, 
      messages,
      deleteFriend,
      history
    } = this.props;
    const myFriends = (friends.filter( friend => friend.id === user._id)[0] || []).userId || [];
    const myFriendsConfirmed = myFriends.filter(friend => friend.statusId === 3);
    
    /* const usersItems = Object.values(users);
    let test = [];
    const filteredUser = usersItems.filter( (userItem) => userItem._id !== user._id );
    const filteredFriends = filteredUser.filter( userItem =>{ 
      for(let i = 0; i < myFriends.length; i++){
        if(userItem._id === myFriends[i].id){
          test.push('exist');
        }
      }
      if(test.length >= 1){
        test = [];
        return false;
      }
      else{
        test = [];
        return true;
      } 
    });
    
    const filteredItems = filteredFriends.filter(
      item => item.firstName.toLowerCase().includes(this.state.filter.trim().toLowerCase()) || 
              item.lastName.toLowerCase().includes(this.state.filter.trim().toLowerCase())
    );
 */
    return(
      <LandingPage history={history}>
        <Container>
          <Head>
            <User to={`${PROFIL_USER}/${user._id}`}>
              <Avatar user={user} />  
              {user.pseudo}
            </User>
          </Head>

          <Content>
            <LeftContainer>
              <Title>Gestion des Amis</Title>
              <SettingFriends
                user={user} 
                users={users}
                friends={friends}
                accepteRequest={accepteRequest}
                ignoreRequest={ignoreRequest}
                valideRecommendRequest={valideRecommendRequest}
                ignoreRecommendRequest={ignoreRecommendRequest}
                deleteFriend={deleteFriend}
              /> 
            </LeftContainer>
            <MiddleContainer>
              <TitleActuality>Fil d'actualité</TitleActuality>
              <WallJs 
                users={users}
                friends={friends}
                user={user}
                />
            </MiddleContainer>
              <RightContainer>
                <Title>Chat</Title>
                <Chat 
                  friends={myFriendsConfirmed}
                  users={users}
                  messages={messages}
                />
              </RightContainer>
          </Content>
        </Container>
      </LandingPage>
    );
  }
}

export default ProfilPageDesktop;

