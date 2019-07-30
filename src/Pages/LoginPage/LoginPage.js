import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import capitalize from 'capitalize';
import { connect } from 'react-redux';
import socketIOClient from "socket.io-client";


import LandingPage from 'components/common/LandingPage';
import LoginForm   from './LoginForm';
import HeaderMenu from 'components/common/HeaderMenu';
import Matrix from 'components/common/Matrix';

import {loginRequested} from 'store/actions/auth';
import { initState } from 'store/actions/auth';


import {
  PROFIL_PAGE
} from 'Routes/Paths.js';

import API from 'utils/API';


export var token;
export var socket = socketIOClient(process.env.REACT_APP_API_URL);

const Container = styled.div`
  height : 100%;
  @media(max-width:800px){
      font-size : 0.7em;
  }

  @media(max-width:600px){
      font-size : 0.7em;
  }

  @media(max-width:360px){
      font-size : 0.5em;
  }
`;

class LoginPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      redirect : false,
      erreurMessage : '',
      usersConnected : 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    socket.on('usersConnected', (datas) => {
      this.setState({usersConnected : datas.length});
    });

  }

  handleSubmit(data){
    const { history } = this.props;
    API.login(data).then(res => {
      history.push('/profil');
     localStorage.setItem('token', JSON.stringify(res.data.token));
     localStorage.setItem('users', JSON.stringify(res.data.users));
     localStorage.setItem('user', JSON.stringify(res.data.user));
     localStorage.setItem('friends', JSON.stringify(res.data.friends));
     localStorage.setItem('walls', JSON.stringify(res.data.walls));
     localStorage.setItem('topics', JSON.stringify(res.data.topics));
     localStorage.setItem('wallJS', JSON.stringify(res.data.wallJS));
     this.props.initState(res.data.user, res.data.users, res.data.friends, res.data.walls, res.data.topics, res.data.wallJS);
   })
   .catch(err => {
     console.log(err)
     this.setState({erreurMessage : 'Email ou mot de passe incorrecte'});
   });
    /* this.props.loginRequested(data);
    console.log(x)*/

  }

  render() {
    return (
    <Container>
      <LandingPage footer={true}>
        <LoginForm usersConnected={this.state.usersConnected} erreurMessage={this.state.erreurMessage} onSubmit={this.handleSubmit} />
      </LandingPage>
    </Container> 
    );
  }
}


export default connect(null, {loginRequested, initState})(LoginPage);
