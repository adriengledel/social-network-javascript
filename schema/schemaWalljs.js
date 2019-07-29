const mongoose = require('mongoose');

var messagesSchema = mongoose.Schema({
  senderId : { type : String },
  text     : { type : String },
  date     : { type : Date },
}) 

var wallSchema = mongoose.Schema({
  category   : { type : String },
  messages : [messagesSchema],
}, { timestamps: { createdAt: 'created_at' }});


module.exports = mongoose.model('wallsJs', wallSchema);