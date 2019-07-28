import axios from 'axios';
import { socket } from 'Pages/LoginPage/LoginPage';

const headers = {
    'Content-Type': 'application/json'
}
const url = REACT_APP_API_URL;

export default {
    login : function(send){
        return axios.post(url + '/login',send,{headers: headers})
    },
    signup : function(send){
        return axios.post(url + '/signup',send,{headers: headers})
    },
    isAuth : function() {
        return (localStorage.getItem('token') !== null);
    },
    logout : function() {
        localStorage.clear();
    },
    lostpassword : function(send) {
        console.log(send)
        return axios.post(url + '/lostpassword',send,{headers: headers})
    },
    friendRequest : function(send){
        return socket.emit("friendRequest", send);
    },
    updateFriendRequest : function(send){
        return socket.emit("updateFriend", send);
    },
    recommendFriendRequest : function(send){
        return socket.emit("recommendFriend", send);
    },
    validRecommendFriendRequest : function(send){
        return socket.emit("validRecommendFriend", send);
    },
    deleteFriend : function(send){
        return socket.emit("deleteFriend", send);
    },
    wallRequest : function(send){
        return socket.emit("messageRequest", send);
    },
    deleteMessage : function(send){
        return socket.emit("deleteMessageWall", send);
    },
    responseRequest : function(send){
        return socket.emit("responseRequest", send);
    },
    deleteResponse : function(send){
        return socket.emit("deleteResponse", send);
    },
    sendPrivateMessage : function(send){
        return socket.emit("room", send);
    },
    createTopic : function(send){
        return socket.emit("createTopic", send);
    },
    deleteTopic : function(send){
        return socket.emit("deleteTopic", send);
    },
    addFriendToTopic : function(send){
        return socket.emit("addFriendToTopic", send);
    },
    joinTopic : function(send){
        return socket.emit("room", send);
    },
    messageTopic : function(send){
        return socket.emit("messageTopic", send);
    },
    deleteMessageTopic : function(send){
        return socket.emit("deleteMessageTopic", send);
    },
    leaveTopic : function(send){
        return socket.emit("leaveTopic", send);
    },
    connectTopic : function(send){
        return socket.emit("connectTopic", send);
    },
    updateUser : function(send){
        return socket.emit("updateUser", send);
    },
    logout : function(send){
        return socket.disconnect();
    }

}
