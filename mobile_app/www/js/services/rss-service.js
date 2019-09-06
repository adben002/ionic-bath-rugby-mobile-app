(function(MainService) {

    MainService.module
        .factory('RssService', function($http) {
            // Might use a resource here that returns a JSON array

            return {
                all: function($scope) {
                    $http.get(MainService.httpUrl + 'news')
                        .then(
                            function(resp) {
                                $scope.allRss = resp.data;
                            },
                            function(err) {
                                console.error('ERR', err);
                            });
                },
                get: function(rssId, $scope) {

                    $http.get(MainService.httpUrl + 'news/' + rssId)
                        .then(
                            function(resp) {
                                $scope.rss = resp.data;
                            },
                            function(err) {
                                console.error('ERR', err);
                            });
                }
            }
        })

})(MainService);
