import API from 'utils/API';

export const updateUser = (userId, data) => {
  return (dispatch, getState) => {
    API.updateUser({userId, data});
    /* dispatch(loadUser(data)) */
  };
}

export const deleteUser = (userId) => {
  return (dispatch, getState) => {
    API.deleteUser({userId});
  }
}

const loadUser = (user) => ({
  type : 'LOAD_USER',
  user
});

export const updateUsers = (users) => ({
  type : 'UPDATE_USERS',
  users
});