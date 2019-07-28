import API from 'utils/API';

export const createTopic = (userIdSender, topic, topicId) => {
  return (dispatch, getState) => {
    API.createTopic({userIdSender, topic, topicId});
  };
}

export const deleteTopic = (topicId) => {
  return (dispatch, getState) => {
    API.deleteTopic({topicId});
  };
}

export const addFriendToTopic = (topicId, userIdRecipient, email) => {
  return (dispatch, getState) => {
    API.addFriendToTopic({topicId, userIdRecipient, email});
  };
}

export const joinTopic = (topicId, userId) => {
  return (dispatch, getState) => {
    API.joinTopic({topicId, userId});
  };
}

export const messageTopic = (topicId, userId, messageId, message) => {
  return (dispatch, getState) => {
    API.messageTopic({topicId, userId,  messageId, message});
  };
}

export const deleteMessageTopic = (topicId, messageId) => {
  return (dispatch, getState) => {
    API.deleteMessageTopic({topicId, messageId});
  };
}

export const leaveTopic = (topicId, userId) => {
  return (dispatch, getState) => {
    API.leaveTopic({topicId, userId});
  };
}

export const connectTopic = (topicId) => {
  return (dispatch, getState) => {
    API.connectTopic({topicId});
  };
}

export const loadTopics = (topics) => ({
  type : 'LOAD_TOPICS',
  topics
});

export const leaveTopics = (topics) => ({
  type : 'LEAVE_TOPICS',
  topics
});