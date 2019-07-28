const initialState = {
  users    : JSON.parse(localStorage.getItem('users')),
  user     : JSON.parse(localStorage.getItem('user')),
  friends  : JSON.parse(localStorage.getItem('friends')),
  walls    : JSON.parse(localStorage.getItem('walls')),
  topics   : JSON.parse(localStorage.getItem('topics'))
};
export const initState = (state=initialState, action) => {
  switch(action.type){
    case 'LOAD_INIT_STATE' : 
    return {
      ...state,
      user    : action.user,
      users   : action.users,
      friends : action.friends,
      walls   : action.walls,
      topics  : action.topics
    };

    default : return state;
    
  }
}