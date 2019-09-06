(function (MainController) {

	MainController.module
	.controller('ManOfTheMatchController', ['$scope', '$cordovaLocalNotification', '$ionicScrollDelegate', 'ManOfTheMatchService', function ($scope, $cordovaLocalNotification, $ionicScrollDelegate, ManOfTheMatchService) {
				MainController.handleNotification($scope, $cordovaLocalNotification);
				$scope.players = ['Agulla.jpg', 'Auterac.jpg', 'Burgess.jpg', 'Day.jpg', 'Fa\'osiliva.jpg', 'Garvey.jpg', 'Houston.jpg', 'Louw.jpg',
					'Palma-Newport.jpg', 'Sisi.jpg', 'Thomas.jpg', 'Williams.jpg', 'Young.jpg', 'Arscott.jpg', 'Banahan.jpg', 'Catt.jpg', 'Devoto.jpg',
					'Fearns.jpg', 'Henson.jpg', 'James.jpg', 'Mercer.jpg', 'Rokoduguni.jpg', 'Spencer.jpg', 'Watson.jpg', 'Wilson.jpg', 'Attwood.jpg',
					'Batty.jpg', 'Cook.jpg', 'Eastmond.jpg', 'Ford.jpg', 'Hooper.jpg', 'Joseph.jpg', 'Orlandi.jpg', 'Shiells.jpg', 'Stringer.jpg',
					'Webber.jpg', 'Woodburn.jpg'
				];
				$scope.VoteFor = function (player) {
					ManOfTheMatchService.vote(player.replace(".jpg", ""), function (data) {

						data.sort(function (d1, d2) {
							return d2.percentage - d1.percentage;
						});
						
						for (i = 0; i < data.length; i++){
							data[i].percentage = data[i].percentage.toFixed(2);
						}
						
						$scope.dataset = data
					});
					document.getElementById('playerPictures').className += "hide";
					document.getElementById('revoteDiv').className = "";
					document.getElementById('resultsTable').className = "";
					$ionicScrollDelegate.scrollTop();
				};
				
				$scope.reVote = function() {
					document.getElementById('playerPictures').className = "";
					document.getElementById('revoteDiv').className += "hide";
					document.getElementById('resultsTable').className += "hide";
					$ionicScrollDelegate.scrollTop();
				}
			}
		]);

})(MainController);