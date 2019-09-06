(function (MainController) {

	MainController.module
	.controller('CardController', ['$scope', '$cordovaLocalNotification', 'CardService', function ($scope, $cordovaLocalNotification, CardService) {
				
				MainController.handleNotification($scope, $cordovaLocalNotification);
				
				var players = [{'Agulla':{'height':'1.81m', 'weight': '88kg', 'speed': '5/10', 'strength':'6/10', 'kick':'5/10', 'passing':'4/10'}},
										{'Auterac':{'height':'1.83m', 'weight': '115kg', 'speed': '6/10', 'strength':'6/10', 'kick':'4/10', 'passing':'3/10'}}, 
										{'Burgess':{'height':'1.96m', 'weight': '116kg', 'speed': '4/10', 'strength':'2/10', 'kick':'7/10', 'passing':'6/10'}}, 
										{'Day':{'height':'1.98m', 'weight': '116kg', 'speed': '8/10', 'strength':'3/10', 'kick':'6/10', 'passing':'10/10'}}, 
										{'Fa\'osiliva':{'height':'1.83m', 'weight': '112kg', 'speed': '2/10', 'strength':'7/10', 'kick':'1/10', 'passing':'2/10'}}, 
										{'Garvey':{'height':'1.98m', 'weight': '125kg', 'speed': '7/10', 'strength':'2/10', 'kick':'3/10', 'passing':'9/10'}}, 
										{'Houston':{'height':'1.88m', 'weight': '114kg', 'speed': '5/10', 'strength':'7/10', 'kick':'2/10', 'passing':'7/10'}}, 
										{'Louw':{'height':'1.90m', 'weight': '109kg', 'speed': '3/10', 'strength':'8/10', 'kick':'7/10', 'passing':'4/10'}}
									];
				// Shuffle the deck
				players = shuffle(players);
				
				function setVariables(){
					var currentPlayerName = Object.keys(players[0])[0];
					$scope.currentPlayerName = currentPlayerName;
					
					var playerStats = players[0][currentPlayerName]
					$scope.playerStats = playerStats;
				}
				
				setVariables();
				
				$scope.winClick = function(){
					console.log(players);
					var resultArray = [];
					for(i = 0; i < players.length - 1; i++){
						var firstPlayer = players[0];
						resultArray[i] = players[i+1];
						resultArray[players.length -1] = firstPlayer;
					}
					console.log(resultArray)
					players = resultArray;
					setVariables();
				}
				
				$scope.loseClick = function(){
					if(players.length == 1){
						document.getElementById('card').className += " hide";
						document.getElementById('youLose').className = '';
						document.getElementById('winButton').className = 'hide';
						document.getElementById('loseButton').className = 'hide';
						return;
					}
					console.log(players);
					var resultArray = [];
					for(i = 0; i < players.length - 1; i++){
						var firstPlayer = players[0];
						resultArray[i] = players[i+1];
						resultArray[players.length -1] = firstPlayer;
						resultArray.splice(players.length - 1, 1);
					}
					console.log(resultArray)
					players = resultArray;
					setVariables();
				}
				
				//	$scope.players = shuffle(['Agulla', 'Auterac', 'Burgess', 'Day', 'Fa\'osiliva', 'Garvey', 'Houston', 'Louw',
					//'Palma-Newport.jpg', 'Sisi.jpg', 'Thomas.jpg', 'Williams.jpg', 'Young.jpg', 'Arscott.jpg', 'Banahan.jpg', 'Catt.jpg', 'Devoto.jpg',
					//'Fearns.jpg', 'Henson.jpg', 'James.jpg', 'Mercer.jpg', 'Rokoduguni.jpg', 'Spencer.jpg', 'Watson.jpg', 'Wilson.jpg', 'Attwood.jpg',
					//'Batty.jpg', 'Cook.jpg', 'Eastmond.jpg', 'Ford.jpg', 'Hooper.jpg', 'Joseph.jpg', 'Orlandi.jpg', 'Shiells.jpg', 'Stringer.jpg',
					//'Webber.jpg', 'Woodburn.jpg'
				//	]);
							}]);
							
							
	function shuffle(array) {
		var tmp,
		current,
		top = array.length;

		if (top){
				while (--top) {
					current = Math.floor(Math.random() * (top + 1));
					tmp = array[current];
					array[current] = array[top];
					array[top] = tmp;
				}
			}
		return array;
	}
	

})(MainController);