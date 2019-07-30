import API from 'utils/API';

export const loginRequested = (data) => {
  return (dispatch, getState) => {

     API.login(data).then(res => {
      localStorage.setItem('token', JSON.stringify(res.data.token));
      localStorage.setItem('users', JSON.stringify(res.data.users));
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('friends', JSON.stringify(res.data.friends));
      localStorage.setItem('walls', JSON.stringify(res.data.walls));
      localStorage.setItem('topics', JSON.stringify(res.data.topics));
      localStorage.setItem('wallJS', JSON.stringify(res.data.wallJS));
      dispatch(initState(res.data.user, res.data.users, res.data.friends, res.data.walls, res.data.topics, res.data.wallJS));
    })
    .catch(err => {
      console.log(err);
    });
  };
}


  const loadUser = (user) => ({
    type : 'LOAD_USER',
    user
  });
  
  const loadUsers = (users) => ({
    type : 'LOAD_USERS',
    users
  });

  export const initState = (user, users, friends, walls, topics, wallJs) => ({
    type : 'LOAD_INIT_STATE',
    user,
    users,
    friends,
    walls,
    topics,
    wallJs
  })
  
