var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.bathrugby.com/fixtures-and-results/first-team/";

function clubVsClubTable(res) {
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var table = [];

            $(".fixture_result_detail").each(function() {
                var fixturesResults = {};

                fixturesResults.dateTime = $(this).find(".fr_date").text().replace("\n", "") + " " + $(this).find(".fr_time").text().replace("\n", "");
                fixturesResults.loc = $(this).find(".fr_location").text();
                fixturesResults.team = $(this).find(".fr_team").text();
                fixturesResults.type = $(this).find(".fr_type").text();
                fixturesResults.result = $(this).find(".fr_result").text();
                fixturesResults.score = $(this).find(".fr_score").text().replace(/\n/g, "");

                table.push(fixturesResults);
            });
            res.send(table);
        }

    });
}

exports.table = function(req, httpRes, next) {
    clubVsClubTable(httpRes);
}
