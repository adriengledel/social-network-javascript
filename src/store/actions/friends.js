
import API from 'utils/API';

export const friendRequest = (userIdSender, userIdRecipient, statusIdSender, statusIdRecipient, email) => {
  console.log(userIdSender)
  return (dispatch, getState) => {
    API.friendRequest({userIdSender, userIdRecipient, statusIdSender, statusIdRecipient, email});
  };
}

export const updateFriendRequest = (userIdSender, userIdRecipient, statusIdSender, statusIdRecipient) => {
  return (dispatch, getState) => {
    API.updateFriendRequest({userIdSender, userIdRecipient, statusIdSender, statusIdRecipient});
  };
}

export const recommendRequest = (userIdSender, userIdRecipient, userIdRecommend, statusId, email) => {
  return (dispatch, getState) => {
    API.recommendFriendRequest({userIdSender, userIdRecipient, userIdRecommend, statusId, email});
  };
}

export const validRecommendRequest = (userIdSender, userIdRecipient, statusIdSender, statusIdRecipient, email) => {
  console.log(userIdSender)
  return (dispatch, getState) => {
    API.validRecommendFriendRequest({userIdSender, userIdRecipient, statusIdSender, statusIdRecipient, email});
  };
}

export const deleteFriend = (accountId, friendId) => {
  return (dispatch, getState) => {
    API.deleteFriend({accountId, friendId});
  }
}

export const loadFriends = (friends) => ({
  type : 'LOAD_FRIENDS',
  friends
});