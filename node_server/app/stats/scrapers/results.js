var request = require('request');
var cheerio = require('cheerio');

var url = "http://rugby.statbunker.com/competitions/LastMatches?comp_id=469&club_id=4&limit=10&offs=UTC";

function allLatestResults(res) {
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var latestMatches = [];

            var counter = 0;
            $(".upcomingMatchesTitle.slateGrey:not(.greenBackground), .matchLineup").each(function() {
                var num = Math.floor(counter / 2);
                if ($(this).hasClass("upcomingMatchesTitle")) {
                    latestMatches[num] = {
                        num: num,
                        date: $(this).find("h3").text()
                    };
                } else if ($(this).hasClass("matchLineup")) {
                    var obj = latestMatches[num];
                    obj.homeTeam = $(this).find(".matchTeam").first().find("p").text();
                    obj.awayTeam = $(this).find(".matchTeam").last().find("p").text();
                    obj.score = $(this).find(".matchVs").find("p").text();
                }
                counter++;
            });

            res.send(latestMatches);
        }

    });
}

function parseEvent($, report, eqNum) {
    var events = [];
    report.find(".matchReportInt").eq(eqNum).find(".matchReportSubInt").each(function() {
        events.push({
            evt: $(this).find("p").text(),
            type: $(this).find("small").text()
        });
    });
    return events;
}

function getALatestResult(num, res, next) {

    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);
            var result = $(".matchLineup").eq(num);
            var resultLink = result.find(".matchStatLink").find("a").first().attr("href");

            request(resultLink, function(error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);
                    var report = $("#matchReportCon");
                    var reportObjToSend = {};
                    var title = report.find(".matchReportTitle");
                    reportObjToSend.homeTeam = title.find("h2").eq(0).text();
                    reportObjToSend.awayTeam = title.find("h2").eq(2).text();
                    reportObjToSend.score = title.find("h2").eq(1).text();

                    reportObjToSend.homeEvents = parseEvent($, report, 1);
                    reportObjToSend.awayEvents = parseEvent($, report, 2);

                    res.send(reportObjToSend);
                }
            });
        }
    });
}

exports.all = function(req, httpRes, next) {
    allLatestResults(httpRes);
}
exports.select = function(req, httpRes, next) {
    getALatestResult(req.params.id, httpRes, next);
}
