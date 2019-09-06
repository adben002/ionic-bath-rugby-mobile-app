var MainController = (function(out, app) {
    'use strict';

    function handleNotification($scope, $cordovaLocalNotification) {
        $scope.$on('pushNotificationReceived', function(event, notification) {
            if (notification.event === 'message') {
                $cordovaLocalNotification.add({
                    id: '1',
                    message: 'Your order is on its way',
                    title: 'Beer Ready'
                });
            }
        });
    }

    out.handleNotification = handleNotification;
    out.module = angular.module(app.controllerPath, []);

    return out;
})({}, app);
