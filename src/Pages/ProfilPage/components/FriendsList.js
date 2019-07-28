import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SwitchButton from 'components/common/SwitchButton';
import InputSearch  from 'components/common/InputSearch';

const Container = styled.div`
  flex           : 1;
  display        : flex;
  flex-direction : column;
  border         : 1px solid black;
`;

const Head = styled.div`
`;

const Content = styled.div`
  flex : 1;
`;

const SwitchContainer = styled.div`
  height      : 40px;
  font-weight : 450;
`;

class FriendsList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      view : 'amis',
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
    return(
      <Container className={className}>
        <Head>
          <SwitchContainer>
            <SwitchButton
                items={[
                  {value : 'amis', name : 'Amis'},
                  {value : 'attente', name : 'En attente de confirmation'},
                  {value : 'demande reçu', name : 'Demande reçu'},
                  {value : 'recommandation', name : 'Recommandation'},
                  {value : 'demande refusée', name : 'Demande refusée'}
                ]}
                value={this.state.view}
                onSelect={this.handleViewChange}
            />
          </SwitchContainer>
        </Head>
        <Content>
          {
            this.state.view === 'amis' ?
            <InputSearch
              key='amis'
              showList={true}
              items={friendsConfirmed}
              onChange={this.handleSearch}
              users={users}
              deleteButton
              deleteFriend={deleteFriend}
            /> :
            this.state.view === 'attente' ?
            <InputSearch
              key='attente'
              showList={true}
              items={waitingForConfirmation}
              onChange={this.handleSearch}
              users={users}
              deleteButton
              deleteFriend={deleteFriend}
            /> :
            this.state.view === 'demande reçu' ?
            <InputSearch
              key='demande reçu'
              showList={true}
              items={requestReceived}
              onChange={this.handleSearch}
              users={users}
              userId={user._id}
              buttons
              onClickLeft={accepteRequest}
              onClickRight={ignoreRequest}
            /> :
            this.state.view === 'recommandation' ?
            <InputSearch
              key='recommandation'
              showList={true}
              items={recommendReceived}
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
              items={ignored}
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