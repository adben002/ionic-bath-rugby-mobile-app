// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = (function(out) {
    'use strict';

    out.controllerPath = 'com.ipl.hackathon.controllers';
    out.servicesPath = 'com.ipl.hackathon.services';

    angular.module('bathRugby', ['ionic', 'firebase', 'ngCordova', out.controllerPath, out.servicesPath])

    .run(function($ionicPlatform, $state, $rootScope, userSession) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            $state.go('login');

            $rootScope.$on('$firebaseSimpleLogin:login', function(event, user) {
                userSession.user = user;
                $state.go('tab.rss-index-tab');
            });

            $rootScope.$on('$firebaseSimpleLogin:error', function(event, error) {
                console.log('Error logging user in: ', error);
            });

            $rootScope.$on('$firebaseSimpleLogin:logout', function(event) {
                $state.go('login');
            });
        });
    }).config(['$stateProvider', function($stateProvider) {

        $stateProvider.state('login', {
                url: '/login',
                controller: 'LoginController',
                templateUrl: 'views/login/login.html'
            })
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'views/templates/tabs.html'
            })
            .state('tab.rss-index-tab', {
                url: '/rss',
                views: {
                    'rss-tab': {
                        templateUrl: 'views/news/rss-index.html',
                        controller: 'RssIndexController'
                    }
                }
            })
            .state('tab.rss-detail', {
                url: '/rssDetail/:rssId',
                views: {
                    'rss-tab': {
                        templateUrl: 'views/news/rss-detail.html',
                        controller: 'RssDetailController'
                    }
                }
            })
            .state('tab.twitter', {
                url: '/twitter',
                views: {
                    'twitter-tab': {
                        templateUrl: 'views/twitter/twitter.html',
                        controller: 'TwitterCtrl'
                    }
                }
            })
            .state('tab.youtube', {
                url: '/youtube',
                views: {
                    'youtube-tab': {
                        templateUrl: 'views/youtube/youtube.html',
                        controller: 'YoutubeCtrl'
                    }
                }
            })
            .state('tab.beer', {
                url: '/orderBeer',
                views: {
                    'beer-tab': {
                        templateUrl: 'views/beer/beer.html',
                        controller: 'BeerCtrl'
                    }
                }
            })
            .state('tab.mom', {
                url: '/mom',
                views: {
                    'mom-tab': {
                        templateUrl: 'views/man_of_the_match/mom.html',
                        controller: 'ManOfTheMatchController'
                    }
                }
            })
            .state('tab.stats', {
                url: '/stats',
                views: {
                    'stats-tab': {
                        templateUrl: 'views/stats/stats.html',
                        controller: 'StatsCtrl'
                    }
                }
            })
            .state('tab.shop-index-tab', {
                url: '/shop',
                views: {
                    'shop-tab': {
                        templateUrl: 'views/shop/shop-index.html',
                        controller: 'ShopIndexController'
                    }
                }
            })
            .state('tab.shop-detail', {
                url: '/shop/:shopId',
                views: {
                    'shop-tab': {
                        templateUrl: 'views/shop/shop-detail.html',
                        controller: 'ShopDetailController'
                    }
                }
            })
            .state('tab.about', {
                url: '/about',
                views: {
                    'about-tab': {
                        templateUrl: 'views/about/about.html',
                        controller: 'AboutController'
                    }
                }
            })
			.state('tab.card', {
				url: '/card',
				views: {
					'card-tab': {
						templateUrl: 'views/card/card.html',
						controller: 'CardController'
					}
				}
			});
    }]);

    return out;
})({});
