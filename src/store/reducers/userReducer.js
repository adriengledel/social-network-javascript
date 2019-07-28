const initialState = {
    users    : JSON.parse(localStorage.getItem('users')),
    user     : JSON.parse(localStorage.getItem('user')),
    friends  : JSON.parse(localStorage.getItem('friends')),
    walls    : JSON.parse(localStorage.getItem('walls')),
    topics   : JSON.parse(localStorage.getItem('topics'))
  };
export const userReducer = (state=initialState, action) => {
  switch(action.type){
    case 'LOAD_USER' : 
    return {
      ...state,
      user : action.user,
    };

    case 'LOAD_USERS' : 
    return {
      ...state,
      users : action.users,
    };

    case 'UPDATE_USERS' : 
    return {
      ...state,
      users : action.users
    };

    default : return state;
    
  }
}