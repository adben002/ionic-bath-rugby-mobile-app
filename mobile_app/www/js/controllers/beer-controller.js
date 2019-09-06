(function(MainController) {

    MainController.module
        .controller('BeerCtrl', ['$scope','$ionicScrollDelegate', 'userSession', 'BeerService', '$cordovaLocalNotification', function($scope,$ionicScrollDelegate, userSession, BeerService, $cordovaLocalNotification) {
            MainController.handleNotification($scope, $cordovaLocalNotification);
            $scope.beers = [{'name':'Becks', 'imagename':'becks.jpg', 'price':'2.50'}, 
               {'name':'Gem', 'imagename':'gem.jpg', 'price':'3.25'}, 
               {'name':'Schweppes Lemonade', 'imagename':'schweppes.jpg', 'price':'0.50'}, 
               {'name':'Stella Artois', 'imagename':'stella.jpg', 'price':'3.99'}];
			$scope.userId = userSession.regid;
            $scope.AddItem = function() {
               var order="";
               for (beer in $scope.beers) {
                  order += $scope.beers[beer].name + ':';
                  order += document.getElementById($scope.beers[beer].name + 'Input').value;
                  order += ';';
               }
               BeerService.beerOrder(order, userSession.regid, function() {
                  document.getElementById('beerOrderForm').className += " hide";
                  
                  document.getElementById('orderIsPlaced').className="";
                  $ionicScrollDelegate.scrollTop();
                  });
            }
            $scope.getCurrentPrice= function() {
               var currentPrice = 0;
               for (beer in $scope.beers) {
                  currentPrice += document.getElementById($scope.beers[beer].name + 'Input').value*$scope.beers[beer].price;
               }
               var currentPriceLabel=document.getElementById("currentPrice");
               var currentPriceDiv=document.getElementById("currentPriceDiv");
               currentPriceDiv.className="";
               currentPriceLabel.innerHTML="Total: £" + currentPrice.toFixed(2);
               
            }
            $scope.incrementBeer= function(data) {
               var value = parseInt(document.getElementById(data).value, 10);
               value = isNaN(value) ? 0 : value;
               value++;
               document.getElementById(data).value = value;
            }
        }]);
         
})(MainController);
