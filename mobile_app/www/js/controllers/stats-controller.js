(function(MainController) {

    MainController.module
        .controller('StatsCtrl', ['$scope', 'userSession', 'StatService', '$cordovaLocalNotification', function($scope, userSession, StatService, $cordovaLocalNotification) {
            MainController.handleNotification($scope, $cordovaLocalNotification);
			StatService.table($scope);
			StatService.fixtures($scope);
			StatService.clubVsClub($scope);
			StatService.topScorers($scope);
			StatService.sinBins($scope);
			
			$scope.options = ["Table", "Fixtures/Results"];
			$scope.myDropDown = "table";
        }]);

})(MainController);
