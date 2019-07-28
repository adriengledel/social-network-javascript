import API from 'utils/API';

export const updateUser = (userId, data) => {
  return (dispatch, getState) => {
    API.updateUser({userId, data});
    /* dispatch(loadUser(data)) */
  };
}

const loadUser = (user) => ({
  type : 'LOAD_USER',
  user
});

export const updateUsers = (users) => ({
  type : 'UPDATE_USERS',
  users
});