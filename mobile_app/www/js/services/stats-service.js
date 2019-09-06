(function(MainService) {

    MainService.module
        .factory('StatService', function($http) {
            return {
                table: function($scope) {
					$http.get(MainService.httpUrl + 'table')
                        .then(
                            function(resp) {
                                $scope.table = resp.data;
                            },
                            function(err) {
                                console.error('ERR', err);
                            });
                },
				fixtures: function($scope) {
					$http.get(MainService.httpUrl + 'stats/fixturesResults')
                        .then(
                            function(resp) {
                                $scope.fixtureResults = resp.data;
                            },
                            function(err) {
                                console.error('ERR', err);
                            });
				},
				clubVsClub: function($scope) {
					$http.get(MainService.httpUrl + 'stats/clubVsClub')
                        .then(
                            function(resp) {
                                $scope.clubVsClub = resp.data;
                            },
                            function(err) {
                                console.error('ERR', err);
                            });
				},
				topScorers: function($scope) {
					$http.get(MainService.httpUrl + 'stats/sinBins')
                        .then(
                            function(resp) {
                                $scope.topScorers = resp.data;
                            },
                            function(err) {
                                console.error('ERR', err);
                            });
				},
				sinBins: function($scope) {
					$http.get(MainService.httpUrl + 'stats/topScorers')
                        .then(
                            function(resp) {
                                $scope.sinBins = resp.data;
                            },
                            function(err) {
                                console.error('ERR', err);
                            });
				}
            }
        });

})(MainService);
