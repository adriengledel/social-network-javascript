import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { socket } from 'Pages/ProfilPage/ProfilPage';

import RowUser from 'components/common/RowUser';
import ChatMessage from './ChatMessage';

import AddButtonPng   from 'components/img/add-button.png';
import ValidButtonPng from 'components/img/valid-button.png';
import CrossPng       from 'components/img/delete.png';
import SendPng        from 'components/img/send.png';

import { colors, shadows } from 'styles';

import { 
  createTopic, 
  deleteTopic, 
  addFriendToTopic, 
  joinTopic, 
  messageTopic, 
  deleteMessageTopic, 
  loadTopics,
  leaveTopic,
  connectTopic 
} from 'store/actions/topics';

const Container = styled.div`
  display        : flex;
  flex-direction : row;
  border         : 1px solid white;
  height         : 500px;
  border-radius  : 4px;
`;

const Left = styled.div`
  display        : flex;
  flex-direction : column;
  border         : 1px solid white;
  width          : 40%;
`;

const AddTopic = styled.div`
  display        : flex;
  flex-direction : row;
  align-items    : center;
  border         : 1px solid white;
  height         : 40px;
`;

const AddTopicInput = styled.div`
  display        : flex;
  flex-direction : row;
  align-items    : center;
  border         : 1px solid white;
  height         : 40px;
  background-color : ${colors.backgroundHighLight};
`;

const AddButton = styled.img`
  width  : 30px;
  height : 30px;
`;

const CreateTopic = styled.div`
  margin-left : 10px;
  color       : white;
  font-weight : 400;
`;

const List = styled.div`
  display        : flex;
  flex-direction : column;
  border         : 1px solid white;
  justify-content: space-between;
  height         : 92%;
`;

const ListFriends = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const InvitedFriends = styled.div`

`;

const HeadTitleListFriend = styled.div`
  color : white;
`;

const ListInvitedFriends = styled.div`
  display        : flex;
  flex-direction : column;
  border         : 1px solid white;
  height         : 150px;
  overflow       : auto;
`;

const Admin = styled.div``;

const HeadTitleAdmin = styled.div`
  color : white;
  border-bottom : 1px solid white;
`;

const Right = styled.div`
  flex           : 1;
  display        : flex;
  flex-direction : column;
  border         : 1px solid white;
`;

const ChatTopic = styled.div.attrs(({selected}) => ({
  style : {
    backgroundColor : selected ? colors.blueElectron : colors.topicNoSeleted 
  }
}))`
  display          : flex;
  flex-direction   : row;
  justify-content  : space-around;
  align-items      : center;
  width            : 35%;
  height           : 100%;
  background-color : ${colors.blueElectron};
  box-shadow       : ${shadows.buttonShadow};
  border-bottom-right-radius  : 13px;
  border-top-right-radius     : 3px;

`;

const Head = styled.div`
  border         : 1px solid white;
  height         : 40px;
  display        : flex;
  flex-direction : row;
`;

const Body = styled.div`
  border         : 1px solid white;
  flex           : 1;
  display        : flex;
  flex-direction : column;
  align-items    : flex-end;
  overflow       : auto;
`;

const Footer = styled.div`
  border           : 1px solid white;
  flex             : 0;
  background-color : ${colors.backgroundHighLight};
`;

const Input = styled.input`
  background-color : ${colors.backgroundHighLight};
  border           : none;
  padding          : 11px 10px;
  outline          : none;
  width            : 100%;
  color            : white;
  caret-color      : white;
  focus {
    padding-left : 20px;
  }
`;

const DeleteTopic = styled.img`
  width  : 15px;
  height : 15px;
`;

const SendButton = styled.img`
  width        : 30px
  height       : 30px;
  margin-right : 10px;
`;

const Join = styled.div`
  display         : flex;
  flex-direction  : row;
  align-items     : center;
  justify-content : center;
  width           : 100%;
  height          : 100%;
  background-color: ${colors.backgroundHighLight};;
`;

const JoinButton = styled.div`
  display         : flex;
  flex-direction  : row;
  align-items     : center;
  justify-content : center;
  width           : 100px;
  height          : 30px;
  background-color: ${colors.blueElectron};
  color           : white;
  border-radius   : 4px;
  box-shadow      : ${shadows.buttonShadow};
`;

class Forum extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages  : (this.props.topics[0] || []).messages,
      showInput : false,
      topic     : '',
      topicId   : '',
      message   : '',
      index     : 0 
    }
    this.handleClickAddTopic      = this.handleClickAddTopic.bind(this);
    this.handleCreateTopic        = this.handleCreateTopic.bind(this);
    this.handleChangeTopic        = this.handleChangeTopic.bind(this);
    this.handleDeleteTopic        = this.handleDeleteTopic.bind(this);
    this.handleAddFriendToTopic   = this.handleAddFriendToTopic.bind(this);
    this.handleClickTopic         = this.handleClickTopic.bind(this);
    this.handleJoinRoom           = this.handleJoinRoom.bind(this);
    this.handleChangeMessage      = this.handleChangeMessage.bind(this);
    this.handleSendMessage        = this.handleSendMessage.bind(this);
    this.handleDeleteMessageTopic = this.handleDeleteMessageTopic.bind(this);

    /* socket.on('topicsData', (datas) =>{
      console.log(datas)
      localStorage.setItem('topics', JSON.stringify(datas));
      this.props.loadTopics(datas);
      this.setState({messages : datas});
    }); */
  }

  componentWillMount(){
    const { topics, messages } = this.props;
    this.setState({ 
      topicId  : (topics[0] || []).topicId,
    })
  }

  componentDidMount(){
    this.props.connectTopic(this.state.topicId);
  }

  /* componentWillReceiveProps(){
    const { topics } = this.props;
    this.setState({ 
      topicId  : (topics[0] || []).topicId,
    });
  } */

  handleClickAddTopic(event){
    this.setState({ showInput : true });
  }

  handleChangeTopic(event){
    event.preventDefault();
    this.setState({ topic : event.target.value})
  }

  handleClickTopic(topicId, index){
    this.setState({
      showInput : false,
      topicId   : topicId,
      index
    }, ()=>this.props.connectTopic(this.state.topicId));
  }

  handleCreateTopic(){
    const { user } = this.props;
    this.setState({
      showInput : false,
      topicId   : user._id+this.state.topic
    });
    this.props.createTopic(user._id, this.state.topic, user._id+this.state.topic);
  }

  handleDeleteTopic(topic){
    const { topics, user } = this.props;
    if(topic.adminTopicId === user._id || user.role === "admin"){
      this.props.deleteTopic(topic.topicId);
      this.setState({ topicId :  (topics[0] || []).topicId});
    }
    else{
      this.props.leaveTopic(topic.topicId, user._id);
      this.setState({ topicId :  (topics[0] || []).topicId});
    }
  }

  handleAddFriendToTopic(userId){
    const { topics, users, user } = this.props;
    const topic = topics.filter(topic => this.state.topicId === topic.topicId);
    const yetInvited = topic[0].inviteId.filter(user => user.id === userId);
    const yetConfirmed = topic[0].confirmId.filter(user => user.id === userId);
    const email = users[userId].email;
    const name  = `${user.firstName} ${user.lastName}`;
    if(yetInvited.length > 0 || yetConfirmed.length > 0 || userId === topic[0].adminTopicId){
      return;
    }
    else{
      this.props.addFriendToTopic(this.state.topicId, userId, {email, name});
    }
  }

  handleJoinRoom(){
    const { user } = this.props;
    this.props.joinTopic(this.state.topicId, user._id);
    this.setState({topicId : this.state.topicId})
  }

  handleChangeMessage(event){
    this.setState({message : event.target.value});
  }

  handleSendMessage(){
    const { user, topics } = this.props;
    const messageId = (topics.filter(topic => this.state.topicId === topic.topicId)[0] || []).messages.length+1;
    this.props.messageTopic(this.state.topicId, user._id, messageId , this.state.message);
    this.setState({message :''});
  }

  handleDeleteMessageTopic(messageId){
    this.props.deleteMessageTopic(this.state.topicId, messageId);
  }
  

  render(){
    const {friends=[], topics=[], users=[], user } = this.props;
    const adminTopics = topics.filter(topic => topic.adminTopicId === user._id);
    const usersItems = Object.values(users).filter(user => user.logged);
    const friendsItems = Object.values(friends).filter(friend => users[friend.id].logged);
    let invited = [];
    const inviteTopics = topics.forEach(topic => {
        topic.inviteId.forEach(invite => {
          if(invite.id === user._id){
            invited.push(topic);
          }
      });
    });
    let confirmed = [];
    const confirmTopics = topics.forEach(topic => {
      topic.confirmId.forEach(confirm => {
        if(confirm.id === user._id){
          confirmed.push(topic);
        }
      });
    });

    const myTopics = [...adminTopics, ...invited, ...confirmed];
    const currentTopic = myTopics.filter(topic => topic.topicId === this.state.topicId);
    let testinvite = [];
    let test = () => {
      for(let i = 0; i<currentTopic[0].inviteId.length; i++){
        if(currentTopic[0].inviteId[i].id === user._id){
          testinvite.push(currentTopic[0].inviteId[i].id);
        }
      }
    }

   
    return(
      <Container>
        <Left>
            {
              this.state.showInput ?
              <AddTopicInput>
                <Input 
                placeholder="Saisi le nom du sujet"
                onChange={this.handleChangeTopic}
                />
                <AddButton onClick={this.handleCreateTopic} src={ValidButtonPng}/> 
              </AddTopicInput> :
              <AddTopic>
                <AddButton onClick={this.handleClickAddTopic} src={AddButtonPng}/>
                <CreateTopic>Créer ton sujet</CreateTopic>
              </AddTopic>
            }
          <List>
            <ListFriends>
              {
                user.role === "admin" ?
                usersItems.map(user => <RowUser onClickAdd={() => this.handleAddFriendToTopic(user._id)} addButton user={users[user._id]}/>) :
                friendsItems.map(friend => <RowUser onClickAdd={() => this.handleAddFriendToTopic(friend.id)} addButton user={users[friend.id]}/>)
              }
            </ListFriends>
            <InvitedFriends>
              <HeadTitleAdmin>
                Admin du sujet
              </HeadTitleAdmin>
              <Admin>
                {
                  (currentTopic[0] || []).adminTopicId ?
                    <RowUser user={(users[(currentTopic[0] || []).adminTopicId])}/> : null
                }
              </Admin>
              <HeadTitleListFriend>
                Membres invités
              </HeadTitleListFriend>
              <ListInvitedFriends>
                {
                  ((topics.filter(topic => this.state.topicId === topic.topicId)[0] || []).confirmId || []).map(user => <RowUser user={users[user.id]}/>)
                }
              </ListInvitedFriends>
              </InvitedFriends>
          </List>
        </Left>
        <Right>
          <Head>
            {
              user.role === "admin" ?
              topics.map((topic, index) => 
              <ChatTopic 
                onClick={()=>this.handleClickTopic(topic.topicId, index)}
                selected={topic.topicId === this.state.topicId}
              >
                {topic.topic}
                <DeleteTopic 
                  onClick={() => this.handleDeleteTopic(topic)} 
                  src={CrossPng}
                />
              </ChatTopic>) :

              myTopics.map((topic, index) => 
              <ChatTopic 
                onClick={()=>this.handleClickTopic(topic.topicId, index)}
                selected={topic.topicId === this.state.topicId}
              >
                {topic.topic}
                <DeleteTopic 
                  onClick={() => this.handleDeleteTopic(topic)} 
                  src={CrossPng}
                />
              </ChatTopic>)
            }
          </Head>
          <Body>
            {
              invited.filter(topic => this.state.topicId === topic.topicId).length > 0 ?
              <Join>
                <JoinButton onClick={this.handleJoinRoom}>rejoindre</JoinButton>
              </Join> :
              ((topics.filter(topic => this.state.topicId === topic.topicId)[0] || []).messages || [])
              .map(message => 
              <ChatMessage 
                deleteMessage={this.handleDeleteMessageTopic} 
                users={users} 
                message={message}
                user={user}
                />
              )
            }
          </Body>
          <Footer>
          <AddTopic>
            <Input 
            placeholder="Saisissez votre message"
            onChange={this.handleChangeMessage}
            value={this.state.message}
            />
            <SendButton onClick={this.handleSendMessage} src={SendPng}/> 
          </AddTopic>
          </Footer>
        </Right>
      </Container>
    );
  }
}

export default connect(state => ({
  user : state.user,
  topics : state.topics,
  users : state.users
}), 
{ 
  createTopic,
  deleteTopic,
  addFriendToTopic,
  joinTopic,
  messageTopic,
  deleteMessageTopic,
  loadTopics,
  leaveTopic,
  connectTopic
 }
)(Forum);
