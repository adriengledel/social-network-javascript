import API from 'utils/API';
import { socket } from 'Pages/LoginPage/LoginPage';

export const messageRequest = (userIdSender, userIdRecipient, message, messageId, email, wallId) => {
  return (dispatch, getState) => {
    API.wallRequest({userIdSender, userIdRecipient, message, messageId, email, wallId});
    /* socket.on('wallsData', (walls) =>{
      console.log(walls)
      localStorage.setItem('walls', JSON.stringify(walls));
      dispatch(loadWalls(walls));
    }); */
  };
}

export const deleteMessage = (userIdRecipient, messageId) => {
  return (dispatch, getState) => {
    API.deleteMessage({userIdRecipient, messageId});
    /* socket.on('wallsData', (walls) =>{
      console.log(walls)
      localStorage.setItem('walls', JSON.stringify(walls));
      dispatch(loadWalls(walls));
    }); */
  };
}

export const responseRequest = (wallId, userIdSender, userIdRecipient, message, messageId, subMessageId, email) => {
  return (dispatch, getState) => {
    API.responseRequest({wallId, userIdSender, userIdRecipient, message, messageId, subMessageId, email});
    /* socket.on('wallsData', (walls) =>{
      console.log(walls)
      localStorage.setItem('walls', JSON.stringify(walls));
      dispatch(loadWalls(walls));
    }); */
  };
}

export const deleteResponse = (userIdRecipient, messageId, subMessageId) => {
  return (dispatch, getState) => {
    API.deleteResponse({userIdRecipient, messageId, subMessageId});
   /*  socket.on('wallsData', (walls) =>{
      console.log(walls)
      localStorage.setItem('walls', JSON.stringify(walls));
      dispatch(loadWalls(walls));
    }); */
  };
}

export const loadWalls = (walls) => ({
  type : 'LOAD_WALLS',
  walls
});