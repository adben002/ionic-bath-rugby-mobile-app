var request = require('request');
var cheerio = require('cheerio');

var url = "http://rugby.statbunker.com/competitions/LeadingTopScorers?comp_id=469&club_id=4";

function topScorersTable(res) {
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var table = [];

            $("tbody").find("tr").each(function() {
                var topScorerDetails = {};

                topScorerDetails.points = $(this).find("td").eq(0).text();
                topScorerDetails.player = $(this).find("td").eq(1).find("p").text();
                topScorerDetails.tries = $(this).find("td").eq(2).text();
                topScorerDetails.conversions = $(this).find("td").eq(3).text();
                topScorerDetails.penalties = $(this).find("td").eq(4).text();
                topScorerDetails.dropGoals = $(this).find("td").eq(5).text();

                table.push(topScorerDetails);
            });
            res.send(table);
        }

    });
}

exports.table = function(req, httpRes, next) {
    topScorersTable(httpRes);
}
