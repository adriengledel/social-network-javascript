const initialState = {
  users    : JSON.parse(localStorage.getItem('users')),
  user     : JSON.parse(localStorage.getItem('user')),
  friends  : JSON.parse(localStorage.getItem('friends')),
  walls    : JSON.parse(localStorage.getItem('walls')),
  topics   : JSON.parse(localStorage.getItem('topics'))
};

export const topicsReducer = (state=initialState, action) => {
  switch(action.type){
    case 'LOAD_TOPICS' :
    return {
      ...state,
      topics : action.topics,
    };

    default : return state;
    
  }
}