import API from 'utils/API';
import { socket } from 'Pages/LoginPage/LoginPage';

export const messageRequest = (userIdSender, userIdRecipient, message, messageId, email, wallId) => {
  return (dispatch, getState) => {
    API.wallRequest({userIdSender, userIdRecipient, message, messageId, email, wallId});
    
  };
}

export const deleteMessage = (userIdRecipient, messageId) => {
  return (dispatch, getState) => {
    API.deleteMessage({userIdRecipient, messageId});
    
  };
}

export const responseRequest = (wallId, userIdSender, userIdRecipient, message, messageId, subMessageId, email) => {
  return (dispatch, getState) => {
    API.responseRequest({wallId, userIdSender, userIdRecipient, message, messageId, subMessageId, email});
  
  };
}

export const deleteResponse = (userIdRecipient, messageId, subMessageId) => {
  return (dispatch, getState) => {
    API.deleteResponse({userIdRecipient, messageId, subMessageId});
   
  };
}

export const loadWalls = (walls) => ({
  type : 'LOAD_WALLS',
  walls
});