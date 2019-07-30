import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import SwitchButton from 'components/common/SwitchButton';
import InputSearchList from 'components/common/InputSearchList';
import WallJSMessage   from './WallJSMessage';

import { messageWallJS } from 'store/actions/wallJs'; 
import sendPng           from 'components/img/send.png';
import { compare } from 'helper/sort';


import { colors } from 'styles';

const Container = styled.div`
  height         : 100%;
  width          : 100%;
  flex           : 1;
  display        : flex;
  flex-direction : column;
  border-radius : 4px;
  color          : white;
  max-width      : 700px; 
  min-width      : 500px;
`;

const Head = styled.div`
margin-bottom : 30px;
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

const Body = styled.div`
  flex             : 1;
  border-radius    : 4px;
  background-color : #343f56;
  display          : flex;
  flex-direction   : column;
  align-items      : center;
  overflow         : auto;
  margin           : 10px 0;
`;

const Footer = styled.div`
  width: 100%;
  resize: none;
  height: 115px;
  display : flex;
  flex-direction : row;
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  height: 82%;
  background-color: #343f56;
  border: none;
  overflow: auto;
  outline: none;
  padding-top: 18px;
  padding-left: 17px;
  color: white;
  caret-color: white;
  font-size: 16px;
  border-bottom-left-radius : 4px;
  border-top-left-radius : 4px;
`;

const Button = styled.div`
  min-width : 80px;
  background-color : ${colors.blueElectron};
  border-bottom-right-radius : 4px;
  border-top-right-radius : 4px;
  display : flex;
  flex-direction : row;
  align-items : center;
  justify-content : center;
`;

const Img = styled.img`
  width : 40px;
  height : 40px;
`;

class WallJs extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      view : 'react',
      filter : '',
      message : ''
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleSearch(event){
    this.setState({filter : event.target.value})
  }

  handleViewChange(value){
    this.setState({view : value});
  }

  handleSendMessage(){
    const { user } = this.props;
    this.props.messageWallJS(this.state.view, user._id, this.state.message);
    this.setState({message : ''});
  }

  handleMessageChange(event){
    this.setState({ message : event.target.value})
  }

  render(){
    const { className, users, friends, user, walls=[], mobile } = this.props;

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

    const currentWall = (walls[this.state.view] || []).messages;
    const messageSortByDate = (currentWall || []).sort(compare);
    return(
      <Container className={className}>
        <Head>
          {
            !mobile ? 
            <InputSearchList 
              items={filteredItems}
              onChange={this.handleSearch}
              placeholder="Rechercher"
            /> : null
          }
        </Head>
        
          <SwitchContainer>
            <SwitchButton
                items={[
                  {value : 'react', name : 'React Js',   color : '#71b1fe'},
                  {value : 'angular', name : 'Angular',    color : '#ed3d4f'},
                  {value : 'vue', name : 'Vue Js',     color : '#70F49C'},
                  {value : 'vanilla', name : 'Vanilla Js', color : '#fffa9e'},
                  {value : 'node', name : 'Node Js',    color : '#4e8050'}
                ]}
                value={this.state.view}
                onSelect={this.handleViewChange}
            />
          </SwitchContainer>
          <Body>
            {
              messageSortByDate.map(message => <WallJSMessage users={users} message={message}/>)
            }
          </Body>
          <Footer>
            <TextArea 
              onChange={this.handleMessageChange}
              value={this.state.message}
            />
            <Button onClick={this.handleSendMessage}><Img src={sendPng}/></Button>
          </Footer>
      </Container>
    );
  }
}

export default connect( state => ({
  walls : state.wallJs,
  users : state.users
}), {messageWallJS})(WallJs);