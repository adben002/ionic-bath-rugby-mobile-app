(function(MainController) {

    MainController.module
        .controller('RssIndexController', ['$scope', 'RssService', '$cordovaLocalNotification', function($scope, RssService, $cordovaLocalNotification) {
            MainController.handleNotification($scope, $cordovaLocalNotification);
            RssService.all($scope);
        }])
        .controller('RssDetailController', ['$scope', '$stateParams', '$cordovaLocalNotification', 'RssService', function($scope, $stateParams, $cordovaLocalNotification, RssService) {
            MainController.handleNotification($scope, $cordovaLocalNotification);
            RssService.get($stateParams.rssId, $scope);
        }]);

})(MainController);
