(function(MainController) {

    MainController.module
        .controller('AboutController', ['$scope', '$cordovaLocalNotification', 'userSession', '$cordovaGeolocation', function($scope, $cordovaLocalNotification, userSession, $cordovaGeolocation) {
            MainController.handleNotification($scope, $cordovaLocalNotification);
            $scope.logout = function() {
                userSession.auth.$logout();
            }
			
			$scope.help = function() {
				$cordovaGeolocation
					.getCurrentPosition()
					.then(function (position) {
						var lat  = position.coords.latitude
						var long = position.coords.longitude
						alert("lat: " + lat + ", long: " + long);
					}, function(err) {
						// error
					});
			}
        }]);

})(MainController);
