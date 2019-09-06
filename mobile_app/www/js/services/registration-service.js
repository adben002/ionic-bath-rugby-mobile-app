(function(MainService) {

    MainService.module
        .factory('RegistrationService', function($http) {
            return {
                register: function(registrationId) {
                    $http({
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        url: MainService.httpUrl + 'register',
                        method: "POST",
                        data: {
                            id: registrationId
                        }
                    });
                }
            }
        });

})(MainService);
