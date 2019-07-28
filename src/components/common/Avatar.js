import React from 'react';
import styled from 'styled-components';

const UserWithAvatar = styled.img`
  width : 35px;
  height : 35px;
  border-radius : 50%;
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

class Avatar extends React.Component{
  render(){
    const { user, className } = this.props;
    return(
      <div>
        {
          user.avatarUrl ?
            <UserWithAvatar className={className} src={user.avatarUrl}/> :
            <UserWithoutAvatar className={className} >
              {(user.firstName   || ' ')[0].toUpperCase()}
              {(user.lastName  || ' ')[0].toUpperCase()}
          </UserWithoutAvatar>
        }
      </div>
    );
  }
}

export default Avatar;