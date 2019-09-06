var http = require('http');
var FeedParser = require('feedparser');

var rssFeeds = [
'http://www.bathrugby.com/rss/rss-all-news.rss', 
'http://www.bbc.co.uk/sport/rugby-union/teams/bath/rss.xml'
];

function extend(base, extra) {
   for(i in extra) {
      base[i] = extra[i];
   } 
};

String.prototype.hashCode = function(){
   var hash = 0;
   if (this.length == 0) return hash;
   for (i = 0; i < this.length; i++) {
      char = this.charCodeAt(i);
      hash = ((hash<<5)-hash)+char;
      hash = hash & hash;
   }
   return hash;
}

function formEpisodes(initStream, endStringNum){
   var episodes = [];
   var stream = initStream;
   while (item = stream.read()){
      var ep = {
         id : item.guid.hashCode(),
         title: item.title,
         description: item.description.substring(0, endStringNum),
         date: new Date(item.pubDate)
      };
      episodes.push(ep);
   }
   return episodes;
}

function readAllRss(httpRes) {
   runRssFeeds(httpRes, function(episodes) {
      episodes.sort(function(a,b){
         return b.date - a.date;
      });
      return episodes;
   },
   {endNumString: 100});
}

function readIdRss(httpRes, id) {
   runRssFeeds(httpRes, function(episodes) {
      for (var epIdx in episodes) {
         var currEp = episodes[epIdx];
         if (currEp.id === parseInt(id, 10)) {
            return currEp;
         }
      }
   },
   {});
}

function runRssFeeds(httpRes, endFunction, config) {
   var updatedConfig = {
      feeds: rssFeeds,
      episodes: [],
      httpRes: httpRes,
      endFunction: endFunction,
   };
   extend(updatedConfig, config)
   readRssWithEndFunction(updatedConfig);
}

function readRssWithEndFunction(config) {
   http.get(config.feeds[0], function(res) {
      res.pipe(new FeedParser({}))
      .on('readable', function() {
         config.episodes = config.episodes.concat(formEpisodes(this, config.endNumString));
      })
   .on('end', function() {
      if (config.feeds.length === 1) {
         config.httpRes.send(config.endFunction(config.episodes));
         return;
      } else {
         config.feeds = config.feeds.slice(1);
         readRssWithEndFunction(config);
      }
   })
   });
}

exports.findAll = function (req, httpRes, next) {
   readAllRss(httpRes);
}

exports.byId = function (req, httpRes, next) {
   readIdRss(httpRes, req.params.id);
}

