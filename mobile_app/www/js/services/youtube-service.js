
(function(MainService) {

    MainService.module
        .factory('YoutubeService', function($http) {
            return {
                all: function ($scope) {
                    $scope.videos = ["http://www.youtube.com/embed/f30INuggTRk?rel=0", "http://www.youtube.com/embed/y0B-s1TsCF0?rel=0", "http://www.youtube.com/embed/huE7Whf7YMI?rel=0", "http://www.youtube.com/embed/H00c2doqRKU?rel=0"];
                }
            }
        });

})(MainService);
