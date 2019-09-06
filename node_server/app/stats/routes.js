var Results = require('./scrapers/results');
var SinBins = require('./scrapers/sin_bins');
var TopScorers = require('./scrapers/top_scorers');
var ClubVsClub = require('./scrapers/club_v_club');
var FixturesResults = require('./scrapers/fixtures_results');

module.exports = function(app) {
    app.get('/stats/latestResults', Results.all);
    app.get('/stats/latestResults/:id', Results.select);

    app.get('/stats/clubVsClub', ClubVsClub.table);

    app.get('/stats/sinBins', SinBins.table);

    app.get('/stats/topScorers', TopScorers.table);

    app.get('/stats/fixturesResults', FixturesResults.table);
};
