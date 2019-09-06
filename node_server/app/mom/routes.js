var ManOfTheMatchVotes = require('./models/mom');

var voteFor = function(name) {
   ManOfTheMatchVotes.findOne({_id: name}, function(err, data) {
      if (data === null) {
         ManOfTheMatchVotes.create({
            _id: name,
            votes: 1
         });
      } else {
         ManOfTheMatchVotes.update({_id: name}, {$set: {votes: (data.votes + 1)}}, function(err, updated) {
         });
      }
   });
}

var allPercentages = function(res) {
   ManOfTheMatchVotes.find(function(err, momVotes) {
      var counter = 0;
      for (var voteIdx in momVotes) {
         counter = (counter + momVotes[voteIdx].votes);
      }
      var percentages = [];
      for (var voteIdx in momVotes) {
         percentages.push({
            name: momVotes[voteIdx]._id,
            percentage: ((momVotes[voteIdx].votes / counter) * 100)
         });
      }
      res.send(percentages); 
   });
}

module.exports = function(app) {

   app.get('/vote/:playerName', function(req, res) {
      voteFor(req.params.playerName);
      res.send("");
      return;
   });

   app.get('/votePercentages', function(req, res) {
      allPercentages(res);
      return;
   });

};

