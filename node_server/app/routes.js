var Todo = require('./todo/routes');
var Rss = require('./rss/routes');
var TwitterParser = require('./twitter/routes');
var Mom = require('./mom/routes');
var TableScraper = require('./table_scraper/routes');
var SeatColour = require('./seat_colour/routes');
var Registration = require('./registration/routes');
var Stats = require('./stats/routes');

module.exports = function(app) {
    Todo(app);
    Rss(app);
    TwitterParser(app);
    Mom(app);
    TableScraper(app);
    SeatColour(app);
    Registration(app);
    Stats(app);
};
