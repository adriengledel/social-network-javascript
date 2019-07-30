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

`;

const Head = styled.div`
  margin-top : 50px;
`;

const Content = styled.div`
  margin-top : 50px;
  flex : 1;
  background-color : ${colors.background};
  display : flex;
  flex-direction : row;
  justify-content : center;
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

const WallJsMobile = styled(WallJs)`
  min-width : 0px;
`;

class ProfilPageMobile extends React.Component{
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
    
    const usersItems = Object.values(users);
    const myFriends = (friends.filter( friend => friend.id === user._id)[0] || []).userId || [];
    const myFriendsConfirmed = myFriends.filter(friend => friend.statusId === 3);
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

    return(
      <LandingPage history={history}>
        <Container>
          <Head>
            <User to={`${PROFIL_USER}/${user._id}`}>
              <Avatar user={user} />  
              {user.pseudo}
            </User>
            <SwitchContainer>
              <SwitchButton
                items={[
                  {value : 'gestion', name : 'Gestions des Amis', color : '#71b1fe'},
                  {value : 'fil', name : 'Fil d"actualité', color : '#71b1fe'},
                  {value : 'chat', name : 'Chat Forum', color : '#71b1fe'}
                ]}
                value={this.state.value}
                onSelect={this.handleViewChange}
              />
            </SwitchContainer>
            <InputSearchList 
              items={filteredItems}
              onChange={this.handleSearch}
              placeholder="Rechercher"
            />
          </Head>
          <Content>
            {
              this.state.value === 'gestion' ?
              <FriendsList
                user={user} 
                users={users}
                friends={friends}
                accepteRequest={accepteRequest}
                ignoreRequest={ignoreRequest}
                valideRecommendRequest={valideRecommendRequest}
                ignoreRecommendRequest={ignoreRecommendRequest}
                deleteFriend={deleteFriend}
              /> :
              this.state.value === 'chat' ?
              <Forum 
                friends={myFriendsConfirmed}
                users={users}
                messages={messages}
              /> : 
              <WallJsMobile
                mobile 
                users={users}
                friends={friends}
                user={user}
              />
            }
          </Content>
        </Container>
      </LandingPage>
    );
  }
}

export default ProfilPageMobile;

