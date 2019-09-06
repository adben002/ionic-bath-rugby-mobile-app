var twitter = require('twitter');

var twit = new twitter({
    consumer_key: 'N6lOdmGBxIXl1Rszcikb6sCi0',
    consumer_secret: 'xuKGcG6ixLq4YXY9I8Hj6J038TLHGGn7Z7mlpFZbiYpDObkO3T',
    access_token_key: '2300015694-8LCRPDXkcjwvWWYycM0JmSYIdlrvm334gGmP2qL',
    access_token_secret: 'oo59UYYAY8KpyBgiRjG9GNglpi4Tgup1WtseFFB9Fl0ND'
});

exports.all = function(req, httpRes, next) {
    twit.get('/lists/statuses.json?slug=bath-rugby&owner_screen_name=adben002', function(data) {
        var tweetObjects = [];
        for (var dataIdx in data) {
            var tweet = data[dataIdx];
            tweetObjects.push({
                user: {
                    name: tweet.user.name,
                    image: tweet.user.profile_image_url
                },
                text: tweet.text
            });
        }
        httpRes.send(tweetObjects);
    });
};
