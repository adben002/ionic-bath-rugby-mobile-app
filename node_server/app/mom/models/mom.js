var mongoose = require('mongoose');

module.exports =  mongoose.model('ManOfTheMatchVotes', {
   _id: String,
   votes: Number
});

