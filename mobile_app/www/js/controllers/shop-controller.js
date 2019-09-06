(function(MainController) {

    MainController.module
        .controller('ShopIndexController', ['$scope', 'ShopService', '$cordovaLocalNotification', function($scope, ShopService, $cordovaLocalNotification) {
            MainController.handleNotification($scope, $cordovaLocalNotification);
            ShopService.allProducts(function(products) {
                $scope.products = products;
            });
        }])
        .controller('ShopDetailController', ['$scope', '$stateParams', 'ShopService', 'PayPalService', '$cordovaLocalNotification', function($scope, $stateParams, ShopService, PayPalService, $cordovaLocalNotification) {
            MainController.handleNotification($scope, $cordovaLocalNotification);

            ShopService.product($stateParams.shopId, function(product) {
                $scope.product = product;
            });
            if (window.PayPalMobile !== undefined) {
                PayPalService(function(buyNow) {
                        $scope.buyNow = buyNow;
                    },
                    $scope.product.price,
                    $scope.product.title);
            }

        }]);

})(MainController);
