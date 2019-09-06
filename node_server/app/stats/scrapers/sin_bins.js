var request = require('request');
var cheerio = require('cheerio');

var url = "http://rugby.statbunker.com/competitions/MostSinBins?comp_id=469&club_id=4";

function sinBinTable(res) {
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var table = [];

            $("tbody").find("tr").each(function() {
                var sinBinDetails = {};

                sinBinDetails.player = $(this).find("td").eq(0).find("p").text();
                sinBinDetails.yellows = $(this).find("td").eq(1).text();
                sinBinDetails.firstHalf = $(this).find("td").eq(2).text();
                sinBinDetails.secondHalf = $(this).find("td").eq(3).text();
                sinBinDetails.home = $(this).find("td").eq(4).text();
                sinBinDetails.away = $(this).find("td").eq(5).text();
                sinBinDetails.mins = $(this).find("td").eq(6).text();
                sinBinDetails.minPerCard = $(this).find("td").eq(7).text();

                table.push(sinBinDetails);
            });
            res.send(table);
        }

    });
}

exports.table = function(req, httpRes, next) {
    sinBinTable(httpRes);
}
