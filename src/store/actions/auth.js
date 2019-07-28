import API from 'utils/API';

export const loginRequested = (data) => {
  return (dispatch, getState) => {

     API.login(data).then(res => {
       console.log('res', res)
      localStorage.setItem('token', JSON.stringify(res.data.token));
      localStorage.setItem('users', JSON.stringify(res.data.users));
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('friends', JSON.stringify(res.data.friends));
      localStorage.setItem('walls', JSON.stringify(res.data.walls));
      localStorage.setItem('topics', JSON.stringify(res.data.topics));
      dispatch(initState(res.data.user, res.data.users, res.data.friends, res.data.walls, res.data.topics));
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

  export const initState = (user, users, friends, walls, topics) => ({
    type : 'LOAD_INIT_STATE',
    user,
    users,
    friends,
    walls,
    topics
  })
  
