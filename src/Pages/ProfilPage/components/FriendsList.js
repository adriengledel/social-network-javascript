import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { colors } from 'styles';

import SwitchButton from 'components/common/SwitchButton';
import InputSearch  from 'components/common/InputSearch';

const Container = styled.div`
  flex           : 1;
  display        : flex;
  flex-direction : column;
  border-radius : 4px;
  color          : white;
`;

const Head = styled.div`
`;

const Content = styled.div`
  flex : 1;
`;

const SwitchContainer = styled.div`
  height      : 50px;
  font-weight : 450;
  font-size   : 0.8em;
  border-radius : 4px;
`;

class FriendsList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      view : 0,
      filter : '',
      friends : []
    }
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleSearch     = this.handleSearch.bind(this);
  }

  handleViewChange(value){
    this.setState({view : value});
  }

  handleSearch(event){
    this.setState({filter : event.target.value})
  }

  render(){
    const { 
      className, 
      user, 
      users, 
      friends = [], 
      accepteRequest, 
      ignoreRequest, 
      valideRecommendRequest, 
      ignoreRecommendRequest,
      deleteFriend
    } = this.props;

    const friendsItems = friends.filter(item => item.id === user._id);
    const allFriends = friendsItems.length >= 1 ? friendsItems[0].userId : [];
    const friendsConfirmed = allFriends.filter(friend => friend.statusId === 3);
    const waitingForConfirmation = allFriends.filter(friend => friend.statusId === 2);
    const requestReceived = allFriends.filter(friend => friend.statusId === 5);
    const recommendReceived = allFriends.filter(friend => friend.statusId === 6);
    const ignored = allFriends.filter(friend => friend.statusId === 4);

    const allItems = [[...friendsConfirmed], [...waitingForConfirmation], [...requestReceived], [...recommendReceived], [...ignored]];
    const filteredItems = allItems[this.state.view].filter(
      item => users[item.id].firstName.toLowerCase().includes(this.state.filter.trim().toLowerCase()) || 
              users[item.id].lastName.toLowerCase().includes(this.state.filter.trim().toLowerCase())
    );
    return(
      <Container className={className}>
        <Head>
          <SwitchContainer>
            <SwitchButton
                items={[
                  {value : 0, name : 'Amis',                       color : '#71b1fe'},
                  {value : 1, name : 'En attente de confirmation', color : '#71b1fe'},
                  {value : 2, name : 'Demande reçu',               color : '#71b1fe'},
                  {value : 3, name : 'Recommandation',             color : '#71b1fe'},
                  {value : 4, name : 'Demande refusée',            color : '#ed3d4f'}
                ]}
                value={this.state.view}
                onSelect={this.handleViewChange}
            />
          </SwitchContainer>
        </Head>
        <Content>
          {
            this.state.view === 0 ?
            <InputSearch
              key='amis'
              showList={true}
              items={filteredItems}
              onChange={this.handleSearch}
              users={users}
              deleteButton
              deleteFriend={deleteFriend}
            /> :
            this.state.view === 1 ?
            <InputSearch
              key='attente'
              showList={true}
              items={filteredItems}
              onChange={this.handleSearch}
              users={users}
              deleteButton
              deleteFriend={deleteFriend}
            /> :
            this.state.view === 2 ?
            <InputSearch
              key='demande reçu'
              showList={true}
              items={filteredItems}
              onChange={this.handleSearch}
              users={users}
              userId={user._id}
              buttons
              onClickLeft={accepteRequest}
              onClickRight={ignoreRequest}
            /> :
            this.state.view === 3 ?
            <InputSearch
              key='recommandation'
              showList={true}
              items={filteredItems}
              onChange={this.handleSearch}
              users={users}
              userId={user._id}
              buttons
              onClickLeft={valideRecommendRequest}
              onClickRight={ignoreRecommendRequest}
            /> :
            <InputSearch
              key='ignored'
              showList={true}
              items={filteredItems}
              onChange={this.handleSearch}
              users={users}
              userId={user._id}
              deleteButton
              deleteFriend={deleteFriend}
            />  
          }
        </Content>
      </Container>
    );
  }
}

export default connect(null)(FriendsList);