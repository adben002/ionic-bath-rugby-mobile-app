(function(MainController) {

    MainController.module
        .controller('YoutubeCtrl', ['$scope', '$cordovaLocalNotification', 'YoutubeService', function($scope, $cordovaLocalNotification, YoutubeService) {
            MainController.handleNotification($scope, $cordovaLocalNotification);
            YoutubeService.all($scope);
        }]);

})(MainController);
