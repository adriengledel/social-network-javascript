import API from 'utils/API';

export const messageWallJS = (type, userIdSender, message) => {
  return (dispatch, getState) => {
    API.messageWallJS({type, userIdSender, message});
  };
}


export const loadWallJS = (wallJs) => ({
  type : 'LOAD_WALLS_JS',
  wallJs
});