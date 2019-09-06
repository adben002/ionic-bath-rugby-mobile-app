var gcm = require('node-gcm');
var Registration = require('./models/registration');

var SENDER_ID = 'AIzaSyDdkODwSNdWfMl4pC5L8IUV54FBXCMhFsk';

function sendMessage(sender, message, registeredIds) {
    sender.send(message, registeredIds, 4, function(err, result) {
        console.log(err);
        console.log(result);
    });
}
module.exports = function(messageKey, regid) {

    var message = new gcm.Message({
        collapseKey: 'demo',
        delayWhileIdle: true,
        timeToLive: 3,
        data: {
            message: messageKey
        }
    });

    var sender = new gcm.Sender(SENDER_ID);

    if (regid === undefined) {
        Registration.find(function(err, registered) {
            var registeredIds = [];
            for (var idx in registered) {
                registeredIds.push(registered[idx]._id);
            }
            sendMessage(sender, message, registeredIds);
        });
    } else {
        sendMessage(sender, message, [regid]);
    }

};
