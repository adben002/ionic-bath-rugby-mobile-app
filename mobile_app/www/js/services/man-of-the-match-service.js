(function(MainService) {

    MainService.module
        .factory('ManOfTheMatchService', function($http) {
            return {
                vote: function(player, callback) {
                    $http.get(MainService.httpUrl + 'vote/' + player);
                    $http.get(MainService.httpUrl + 'votePercentages')
                        .success(function(data) {
                            callback(data)
                        });
                }
            }
        });

})(MainService);
