const initialState = {
  users    : JSON.parse(localStorage.getItem('users')),
  user     : JSON.parse(localStorage.getItem('user')),
  friends  : JSON.parse(localStorage.getItem('friends')),
  walls    : JSON.parse(localStorage.getItem('walls')),
  topics   : JSON.parse(localStorage.getItem('topics')),
  wallJs   : JSON.parse(localStorage.getItem('wallJS'))
};

export const wallJSReducer = (state=initialState, action) => {
  switch(action.type){
    case 'LOAD_WALLS_JS' :
    return {
      ...state,
      wallJs : action.wallJs
    };

    default : return state;
    
  }
}