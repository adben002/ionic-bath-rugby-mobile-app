(function(MainController) {

    MainController.module
        .controller('LoginController', ['$scope', 'FIREBASE_REF', '$firebaseSimpleLogin', 'userSession', '$cordovaLocalNotification', '$cordovaPush', 'RegistrationService', function($scope, FIREBASE_REF, $firebaseSimpleLogin, userSession, $cordovaLocalNotification, $cordovaPush, RegistrationService) {
            MainController.handleNotification($scope, $cordovaLocalNotification);
            if (window.plugins !== undefined) {
                var config = {
                    "senderID": "603017825126",
                };
                $cordovaPush.register(config);

                $scope.$on('pushNotificationReceived', function(event, notification) {
                    if (notification.event === 'registered') {
                        userSession.regid = notification.regid;
                        RegistrationService.register(notification.regid);
                    }
                });
            }

            userSession.auth = $firebaseSimpleLogin(new Firebase(FIREBASE_REF));

            $scope.login = function(provider) {
                userSession.auth.$login(provider);
            }

        }]);

})(MainController);
