import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { colors, typography } from 'styles';

import LandingPage from 'components/common/LandingPage';
import InputSearchList from 'components/common/InputSearchList';
import RowUser from 'components/common/RowUser';

import { deleteUser } from 'store/actions/users';
import { updateUsers }    from 'store/actions/users'
import { deleteFriend, loadFriends } from 'store/actions/friends';

import { socket } from 'Pages/LoginPage/LoginPage';

const Content = styled.div`
  display         : flex;
  flex-direction  : column;
  align-items     : center;
  height          : 100%;
`;

const Title = styled.div`
  color : ${colors.redElectron};
  font-size : ${typography.xxlarge}em;
  margin-top : 50px;
`;

const SearchUsers = styled(InputSearchList)`
  max-width : 800px;
  margin-top : 150px;
`;

const ContainerUserSelected = styled.div`
  margin-top : 50px;
  width : 100%;
  max-width : 800px;
`;

const UserSelected = styled(RowUser)`
`;

const ContainerFriends = styled.div`
  margin-top : 50px;
  width : 100%;
  max-width : 800px;
`;

const FriendsHead = styled.div`
  color : ${colors.yellowElectron};
  margin-bottom : 20px;
`;

const Friends = styled(RowUser)`
  max-width : 800px;
`;

const User = styled.div`
  color : ${colors.blueElectron};
  margin-bottom : 20px;
`;

const HisFriends = styled.div``;

class Admin extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filter : '',
      userSelected : ''
    }
    this.handleSearch            = this.handleSearch.bind(this);
    this.handleClickOnUser       = this.handleClickOnUser.bind(this);
    this.handleClickDeleteFriend = this.handleClickDeleteFriend.bind(this);
    this.handleClickDeleteUser   = this.handleClickDeleteUser.bind(this);

    socket.on('updateUsers', (datas) =>{
      console.log(datas)
      localStorage.setItem('users', JSON.stringify(datas));
      this.props.updateUsers(datas);
    });

    socket.on('friendsData', (friends) =>{
      console.log(friends)
      localStorage.setItem('friends', JSON.stringify(friends));
      this.props.loadFriends(friends);
    });
  }

  handleSearch(event){
    this.setState({filter : event.target.value})
  }

  handleClickOnUser(userId){
    this.setState({userSelected : userId});
  }

  handleClickDeleteFriend(friendId){
    const { users } = this.props;
    this.props.deleteFriend(users[this.state.userSelected]._id, friendId);
  }

  handleClickDeleteUser(userId){
    this.props.deleteUser(userId);
    this.setState({userSelected : ''});
  }

  render(){
    const { users, friends } = this.props;
    const usersItems = Object.values(users);
    const filteredItems = usersItems.filter(
      item => item.firstName.toLowerCase().includes(this.state.filter.trim().toLowerCase()) || 
              item.lastName.toLowerCase().includes(this.state.filter.trim().toLowerCase())
    );

    const friendsItems = friends.filter(friend => friend.id === (users[this.state.userSelected] || [])._id);
    console.log(friendsItems);
    return(
      <LandingPage>
      <Content>
        <Title>Gestion des utilisateurs</Title>
        <SearchUsers 
          items={filteredItems}
          onChange={this.handleSearch}
          placeholder="Rechercher"
          noLink={true}
          userSelect={this.handleClickOnUser}
        />
        {
          this.state.userSelected ?
          <ContainerUserSelected>
            <User>Utilisateur sélectionné :</User>
            <UserSelected user={users[this.state.userSelected]} deleteButton deleteFriend={this.handleClickDeleteUser}/>
          </ContainerUserSelected> :
          null
        }
        {
          friendsItems.length > 0 ?
          <ContainerFriends>
            <FriendsHead>Ses amis :</FriendsHead>
            {
              friendsItems[0].userId.map(friend => <Friends user={users[friend.id]} deleteButton deleteFriend={this.handleClickDeleteFriend}/>)
            }
          </ContainerFriends> : null
        }
      </Content>
    </LandingPage>
    );
  }
}

export default connect( state => ({
  users : state.users,
  friends : state.friends
}),
{
  deleteUser,
  updateUsers,
  deleteFriend,
  loadFriends
})(Admin);