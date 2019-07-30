import API from 'utils/API';
import { socket } from 'Pages/ProfilPage/ProfilPage';

export const messageRequest = (nameRoom, userIdSender, userIdRecipient, message, messageId, email) => {
  return (dispatch, getState) => {
    API.wallRequest({nameRoom, userIdSender, userIdRecipient, message, messageId, email, wallId});
    socket.on('privateMessage', (datas) =>{
      localStorage.setItem('privateMessage', JSON.stringify(datas));
      dispatch(loadWalls(walls));
    });
  };
}