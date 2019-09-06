(function(MainController) {

    MainController.module
        .controller('TwitterCtrl', ['$scope', '$cordovaLocalNotification', 'TwitterService', function($scope, $cordovaLocalNotification, TwitterService) {
            MainController.handleNotification($scope, $cordovaLocalNotification);
            TwitterService.all($scope);
        }]);

})(MainController);
