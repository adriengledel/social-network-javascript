import { loadUsers } from 'store/actions/auth';
import { loadFriends } from 'store/actions/friends';

import API from 'utils/API';


export const updateDatas = () => {
  return (dispatch, getState) => {
    /* setInterval(
      () => {
        var datas = getState();
        var users = datas.data.users;
        var friends = datas.friends.friends || [];
        API.update().then(res => {

          if(Object.values(users).length !== Object.values(res.data.users).length){
            dispatch(loadUsers(res.data.users));
            localStorage.setItem('users', JSON.stringify(res.data.users));
          }

          if(friends.length !== res.data.friends.length){
            dispatch(loadFriends(res.data.friends));
            localStorage.setItem('friends', JSON.stringify(res.data.friends));
          }

        })
      },
    1000); */
  }
}