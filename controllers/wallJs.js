import walls from "../schema/schemaWalljs";

var date = new Date();

export function messageJSRequest(req, socket) {
  var wall = {
    category : req.type,
    messages: [{
      senderId: req.userIdSender,
      text: req.message,
      date: date
    }]
  }

  walls.findOne({
    category: req.type
  }, (err, result) => {
    if (result === null) {
      new walls(wall).save().then(() => {
        walls.find({}, function (err, results) {
          var datas = {};
          results.forEach(function (result) {
            datas[result.category] = result;
          });

          socket.broadcast.emit('wallsJSData', datas);
          socket.emit('wallsJSData', datas);
        });
      });
    } else {
      walls.updateOne({
        category: req.type
      }, {
        $push: {
          messages: {
            senderId: req.userIdSender,
            text: req.message,
            date: date
          }
        }
      }, function (err, result) {
        walls.find({}, function (err, results) {
          var wall = {};
          results.forEach(function (result) {
            wall[result.category] = result;
          });
          socket.broadcast.emit('wallsJSData', wall);
          socket.emit('wallsJSData', wall);
        });
      });
    }
  });
}

/* export function deleteMessage(req, socket){
  walls.findOneAndUpdate({
    userId: req.userIdRecipient
  },{
    $pull: {
      messages : {
        id : req.messageId
      }
    }
  }).then(()=>{
    walls.find({}, function (err, results) {
      let wall = {};
      results.forEach(function (result) {
        console.log(result)
        wall[result.userId] = result;
      });
      console.log('emit')
      socket.broadcast.emit('wallsData', wall);
      socket.emit('wallsData', wall);
    });
  });
}

export function responseRequest(req, socket){
  walls.findOneAndUpdate({
    userId: req.wallId,
    'messages.id' : req.messageId
  },{
    $push: {
        'messages.$.responses' : {
          id       : req.subMessageId,
          senderId : req.userIdSender,
          recipientId : req.userIdRecipient,
          text     : req.message,
          date     : date
      }
    }
  }).then(()=>{
    walls.find({}, function (err, results) {
      let wall = {};
      results.forEach(function (result) {
        console.log(result)
        wall[result.userId] = result;
      });
      console.log('emit')
      socket.broadcast.emit('wallsData', wall);
      socket.emit('wallsData', wall);
    });
  });
}

export function deleteResponse(req, socket){
  walls.findOneAndUpdate({
    userId: req.userIdRecipient,
    'messages.id' : req.messageId
  },{
      $pull: {
          'messages.$.responses' : {
              id : req.subMessageId
        }
    }
  }).then(()=>{
    walls.find({}, function (err, results) {
      let wall = {};
      results.forEach(function (result) {
        console.log(result)
        wall[result.userId] = result;
      });
      console.log('emit')
      socket.broadcast.emit('wallsData', wall);
      socket.emit('wallsData', wall);
    });
  });
} */