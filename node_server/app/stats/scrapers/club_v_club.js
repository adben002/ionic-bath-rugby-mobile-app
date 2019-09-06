var request = require('request');
var cheerio = require('cheerio');

var url = "http://rugby.statbunker.com/competitions/ClubVsClubs?comp_id=469&club_id=4";

function clubVsClubTable(res) {
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var table = [];

            $("tbody").find("tr").each(function() {
                var clubVsClubDetails = {};
                clubVsClubDetails.num = $(this).find("td").eq(0).text();
                clubVsClubDetails.club = $(this).find("td").eq(1).find("p").text();
                clubVsClubDetails.played = $(this).find("td").eq(2).text();
                clubVsClubDetails.won = $(this).find("td").eq(3).text();
                clubVsClubDetails.draw = $(this).find("td").eq(4).text();
                clubVsClubDetails.lost = $(this).find("td").eq(5).text();
                clubVsClubDetails.pointFor = $(this).find("td").eq(6).text();
                clubVsClubDetails.pointAgainst = $(this).find("td").eq(7).text();
                clubVsClubDetails.pointDifference = $(this).find("td").eq(8).text();
                clubVsClubDetails.fourT = $(this).find("td").eq(9).text();
                clubVsClubDetails.lessSeven = $(this).find("td").eq(10).text();
                clubVsClubDetails.points = $(this).find("td").eq(11).text();

                table.push(clubVsClubDetails);
            });
            res.send(table);
        }

    });
}

exports.table = function(req, httpRes, next) {
    clubVsClubTable(httpRes);
}
