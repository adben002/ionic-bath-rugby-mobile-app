var Rss = require('./rss');

module.exports = function(app) {
   var newsMapping = "/news";
   app.get(newsMapping, Rss.findAll);
   app.get(newsMapping + '/:id', Rss.byId);
};

