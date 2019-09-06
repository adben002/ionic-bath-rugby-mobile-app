var TableScraper = require('./table_scraper');

module.exports = function(app) {
   app.get("/table", TableScraper.getTable);
};

