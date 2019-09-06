
(function(MainService) {

    MainService.module
        .factory('TwitterService', function($http) {
            return {
                all: function($scope) {
                    $http.get(MainService.httpUrl + 'twitter')
                        .then(
                            function(resp) {
                                $scope.tweets = resp.data;
                            },
                            function(err) {
                                console.error('ERR', err);
                            });
                }
            }
        });

})(MainService);
