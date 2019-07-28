const initialState = {
  users    : JSON.parse(localStorage.getItem('users')),
  user     : JSON.parse(localStorage.getItem('user')),
  friends  : JSON.parse(localStorage.getItem('friends')),
  walls    : JSON.parse(localStorage.getItem('walls')),
  topics   : JSON.parse(localStorage.getItem('topics'))
};


export const usersConnectedReducer = (state=initialState, action) => {
  switch(action.type){
    case 'USERS_CONNECTED' : 
    return {
      ...state,
      usersConnected : action.users,
    };
    
    default : return state;
    
  }
}