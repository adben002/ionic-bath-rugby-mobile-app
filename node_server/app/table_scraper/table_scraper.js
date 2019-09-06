var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.bbc.co.uk/sport/rugby-union/english-premiership/table';

function findTextWithClassAndTrim(context, className) {
    return context.find("td." + className).text().trim();
}

function scrapeTableAndSend(res) {
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);

            var table = [];
            $('table tr').each(function() {
                if ($(this).find("td").length === 10) {
                    var teamColText = $(this).find("td.col_text");
                    var possibleTeamName = teamColText.find("a").text().trim();
                    if (possibleTeamName === "") {
                        possibleTeamName = teamColText.text().trim();
                    }
                    table.push({
                        rank: findTextWithClassAndTrim($(this), "rank"),
                        teamName: possibleTeamName,
                        played: findTextWithClassAndTrim($(this), "pld"),
                        won: findTextWithClassAndTrim($(this), "w"),
                        drawn: findTextWithClassAndTrim($(this), "d"),
                        lost: findTextWithClassAndTrim($(this), "l"),
                        forPoints: findTextWithClassAndTrim($(this), "f"),
                        againstPoints: findTextWithClassAndTrim($(this), "a"),
                        bonusPoints: findTextWithClassAndTrim($(this), "b"),
                        points: findTextWithClassAndTrim($(this), "pts"),
                    });
                }
            });
            res.send(table);
        }

    });
}

exports.getTable = function(req, httpRes, next) {
    scrapeTableAndSend(httpRes);
}
