var TwitterParser = require('./twitterParser');

module.exports = function(app) {
   app.get('/twitter', TwitterParser.all);
};

