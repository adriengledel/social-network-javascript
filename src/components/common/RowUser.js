import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from 'styles';

import AddButtonPng from 'components/img/add-button.png';
import DeleteButtonPng from 'components/img/bin.png';

import {
  PROFIL_USER
} from 'Routes/Paths.js';

const Container = styled.div`
  display         : flex;
  flex-direction  : row;
  justify-content : space-between;
  align-items     : center;
  height          : 50px;
  width           : 100%;
  border-bottom   : 1px solid ${colors.background};
  background-color : ${colors.backgroundHighLight};
`;

const Avatar = styled.img`
  width         : 35px;
  height        : 35px;
  border-radius : 50%;
`;

const Name = styled.div`
  margin-left : 10px;
`;

const Left = styled(Link)`
  display         : flex;
  flex-drection   : row;
  align-items     : center;
  cursor          : pointer;
  text-decoration : none;
  color           : white;
`;

const UserWithoutAvatar = styled.div`
  width           : 30px;
  height          : 30px;
  border-radius   : 50%;
  border          : 1px solid white;
  background-color : salmon;
  text-align      : center;
  margin-right    : 5px;
  display         : flex;
  flex-direction  : column;
  justify-content : center;
  align-items     : center;
  flex-shrink     : 0;
  flex-basis      : 30px;  
`;

const Right = styled.div`
  display         : flex;
  flex-direction  : column;
  justify-content : flex-start;
  align-items     : flex-end;
`;

const LightConnect = styled.div.attrs(({connect}) => ({
  style :{
    backgroundColor : connect ? colors.greenElectron : colors.redElectron
  }
}))`
  border-radius    : 50%;
  width            : 7px;
  height           : 7px;
  background-color : white;
  margin-bottom    : 6px;
  margin-right     : 5px;
`;

const ContainerButton = styled.div`
  display        : flex;
  flex-direction : row;
`;
const ButtonAccept = styled.div`
  color        : ${colors.background};
  margin-right : 8px;
  padding      : 2px 5px;
  border-radius: 3px;
  background-color : ${colors.greenElectron};
  cursor       : pointer;
`;

const ButtonIgnore = styled.div`
  color        : ${colors.background};
  margin-right : 8px;
  padding      : 2px 5px;
  border-radius: 3px;
  background-color : ${colors.redElectron};
  cursor       : pointer;
`;

const AddButton = styled.img`
  width : 20px;
  height : 20px;
  cursor : pointer;
`;

const DeleteButton = styled.img`
  width : 20px;
  height : 20px;
  margin-right : 30px;
  cursor : pointer;
`;

class RowUser extends React.Component{
  render(){
    const { 
      user={}, 
      buttons, 
      onClickLeft, 
      onClickRight, 
      userId, 
      onClick, 
      noLink, 
      addButton, 
      onClickAdd, 
      deleteButton, 
      deleteFriend,
      className
    } = this.props;
    console.log(userId)
    return(
      <Container onClick={ onClick ? () => onClick(user._id) : null} className={className}>
        {
          noLink ?
          <Left>
          {
            user.avatarUrl ?
              <Avatar src={user.avatarUrl || ''}/> :
              <UserWithoutAvatar >
                {(user.firstName   || ' ')[0].toUpperCase()}
                {(user.lastName  || ' ')[0].toUpperCase()}
              </UserWithoutAvatar>
          }
          <Name>
            {user.firstName} {user.lastName}
          </Name>
        </Left> :
        <Left to={`${PROFIL_USER}/${user._id}`}>
          {
            user.avatarUrl ?
              <Avatar src={user.avatarUrl || ''}/> :
              <UserWithoutAvatar >
                {(user.firstName   || ' ')[0].toUpperCase()}
                {(user.lastName  || ' ')[0].toUpperCase()}
            </UserWithoutAvatar>
          }
          <Name>
            {user.firstName} {user.lastName}
          </Name>
        </Left>
        }
        <Right>
          <LightConnect connect={user.logged}/>
            {
              buttons ?
              <ContainerButton>
                <ButtonAccept onClick={() => onClickLeft(user._id)}>Accepter</ButtonAccept>
                <ButtonIgnore onClick={()=>onClickRight(user._id)}>Ignorer</ButtonIgnore>
              </ContainerButton> :
              addButton ?
              <ContainerButton>
                <AddButton 
                  src={AddButtonPng}
                  onClick={onClickAdd} 
                />
              </ContainerButton> : 
              deleteButton ?
              <ContainerButton>
                <DeleteButton 
                  src={DeleteButtonPng}
                  onClick={() => deleteFriend(user._id)} 
                />
              </ContainerButton> : null
            }
        </Right>
      </Container>
    );
  }
}

export default RowUser;