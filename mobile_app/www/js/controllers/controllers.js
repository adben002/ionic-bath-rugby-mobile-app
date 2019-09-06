(function(app) {
    'use strict';

    function handleNotification($scope, $cordovaLocalNotification) {
        $scope.$on('pushNotificationReceived', function(event, notification) {
            if (notification.event === 'message') {
                $cordovaLocalNotification.add({
                    id: '1',
                    message: 'Your order is on its way',
                    title: 'Beer Ready'
                });
            }
        });
    }

    angular.module(app.controllerPath, [])
        .controller('LoginController', ['$scope', 'FIREBASE_REF', '$firebaseSimpleLogin', 'userSession', '$cordovaLocalNotification', '$cordovaPush', 'RegistrationService', function($scope, FIREBASE_REF, $firebaseSimpleLogin, userSession, $cordovaLocalNotification, $cordovaPush, RegistrationService) {
            handleNotification($scope, $cordovaLocalNotification);
            if (window.plugins !== undefined) {
                var config = {
                    "senderID": "603017825126"
                };
                $cordovaPush.register(config);

                $scope.$on('pushNotificationReceived', function(event, notification) {
                    if (notification.event === 'registered') {
                        userSession.regid = notification.regid;
                        RegistrationService.register(notification.regid);
                    }
                });
            }

            userSession.auth = $firebaseSimpleLogin(new Firebase(FIREBASE_REF));

            $scope.login = function(provider) {
                userSession.auth.$login(provider);
            }

        }])
        .controller('RssIndexController', ['$scope', 'RssService', '$cordovaLocalNotification', function($scope, RssService, $cordovaLocalNotification) {
            handleNotification($scope, $cordovaLocalNotification);
            RssService.all($scope);
        }])
        .controller('RssDetailController', ['$scope', '$stateParams', '$cordovaLocalNotification', 'RssService', function($scope, $stateParams, $cordovaLocalNotification, RssService) {
            handleNotification($scope, $cordovaLocalNotification);
            RssService.get($stateParams.rssId, $scope);
        }])
        .controller('TwitterCtrl', ['$scope', '$cordovaLocalNotification', 'TwitterService', function($scope, $cordovaLocalNotification, TwitterService) {
            handleNotification($scope, $cordovaLocalNotification);
            TwitterService.all($scope);
        }])
        .controller('BeerCtrl', ['$scope', 'userSession', 'BeerService', '$cordovaLocalNotification', function($scope, userSession, BeerService, $cordovaLocalNotification) {
            handleNotification($scope, $cordovaLocalNotification);
            $scope.AddItem = function(data) {
                BeerService.beerOrder(data.beerOrder, userSession.regid);
            }
        }])
        .controller('StatsCtrl', ['$scope', '$cordovaLocalNotification', function($scope, $cordovaLocalNotification) {
            handleNotification($scope, $cordovaLocalNotification);
        }])
		.controller('CardController', ['$scope', '$cordovaLocalNotification', 'CardService', function ($scope, $cordovaLocalNotification, CardService) {
				MainController.handleNotification($scope, $cordovaLocalNotification);
				$scope.players = ['Agulla.jpg', 'Auterac.jpg', 'Burgess.jpg', 'Day.jpg', 'Fa\'osiliva.jpg', 'Garvey.jpg', 'Houston.jpg', 'Louw.jpg',
					'Palma-Newport.jpg', 'Sisi.jpg', 'Thomas.jpg', 'Williams.jpg', 'Young.jpg', 'Arscott.jpg', 'Banahan.jpg', 'Catt.jpg', 'Devoto.jpg',
					'Fearns.jpg', 'Henson.jpg', 'James.jpg', 'Mercer.jpg', 'Rokoduguni.jpg', 'Spencer.jpg', 'Watson.jpg', 'Wilson.jpg', 'Attwood.jpg',
					'Batty.jpg', 'Cook.jpg', 'Eastmond.jpg', 'Ford.jpg', 'Hooper.jpg', 'Joseph.jpg', 'Orlandi.jpg', 'Shiells.jpg', 'Stringer.jpg',
					'Webber.jpg', 'Woodburn.jpg'
				];
			}
		])
        .controller('ManOfTheMatchController', ['$scope', '$cordovaLocalNotification', 'ManOfTheMatchService', function($scope, $cordovaLocalNotification, ManOfTheMatchService) {
            handleNotification($scope, $cordovaLocalNotification);
            $scope.players = ['Agulla.jpg', 'Auterac.jpg', 'Burgess.jpg', 'Day.jpg', 'Fa\'osiliva.jpg', 'Garvey.jpg', 'Houston.jpg', 'Louw.jpg',
                'Palma-Newport.jpg', 'Sisi.jpg', 'Thomas.jpg', 'Williams.jpg', 'Young.jpg', 'Arscott.jpg', 'Banahan.jpg', 'Catt.jpg', 'Devoto.jpg',
                'Fearns.jpg', 'Henson.jpg', 'James.jpg', 'Mercer.jpg', 'Rokoduguni.jpg', 'Spencer.jpg', 'Watson.jpg', 'Wilson.jpg', 'Attwood.jpg',
                'Batty.jpg', 'Cook.jpg', 'Eastmond.jpg', 'Ford.jpg', 'Hooper.jpg', 'Joseph.jpg', 'Orlandi.jpg', 'Shiells.jpg', 'Stringer.jpg',
                'Webber.jpg', 'Woodburn.jpg'
            ];
            $scope.VoteFor = function(player) {
                ManOfTheMatchService.vote(player.replace(".jpg", ""), function(data) {
                    $scope.percentages = data;
                });
            };
        }])
        .controller('ShopIndexController', ['$scope', 'ShopService', '$cordovaLocalNotification', function($scope, ShopService, $cordovaLocalNotification) {
            handleNotification($scope, $cordovaLocalNotification);
            ShopService.allProducts(function(products) {
                $scope.products = products;
            });
        }])
        .controller('ShopDetailController', ['$scope', '$stateParams', 'ShopService', '$cordovaLocalNotification', function($scope, $stateParams, ShopService, $cordovaLocalNotification) {
            handleNotification($scope, $cordovaLocalNotification);

            ShopService.product($stateParams.shopId, function(product) {
                $scope.product = product;
            });
            var clientIDs = {
                "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
                "PayPalEnvironmentSandbox": "AQuk6BDCjPbawRIIofzySFV6YW1sD5BVzBspFE6qB9fSqDycY8-ITl13Hwfb"
            };
            var config = new PayPalConfiguration({
                merchantName: "My test shop",
                merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
                merchantUserAgreementURL: "https://mytestshop.com/agreement"
            });
            var onPayPalMobileInit = function() {
                PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", config, function() {
                    $scope.buyNow = function() {
                        var price = $scope.product.price;
                        var paymentDetails = new PayPalPaymentDetails(price, "0.00", "0.00");
                        var payment = new PayPalPayment(price, "GBP", $scope.product.title, "Sale", paymentDetails);
                        PayPalMobile.renderSinglePaymentUI(payment);
                    }
                });
            }
            if (window.PayPalMobile !== undefined) {
                PayPalMobile.init(clientIDs, onPayPalMobileInit);
            }

        }]);
})(app);

