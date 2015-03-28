angular.module('app', [])
.controller('appCtrl', function($scope, $interval){
    $scope.items = {
        bagel: {
            name: "bagel",
            price: 10,
            have: 0,
            onBuy: function(){
                $scope.coinRate += 1;
            }
        },
        superBagel: {
            name: "super bagel",
            price: 100,
            have: 0,
            onBuy: function(){
                $scope.coinRate += 10;
            }
        }
    };
    $scope.buy = function(item){
        var i = $scope.items[item];
        if($scope.coins >= i.price) {
            $scope.coins -= i.price;
            i.have += 1;
            if(i.onBuy) i.onBuy();
        }
    }
    $scope.drop = function(){
        $scope.coins = 0;
    }
    $scope.coins = 0;
    $scope.coinRate = 1;

    var step = function(){
        $scope.coins += $scope.coinRate;
        for(item in $scope.items) {
            var i = $scope.items[item];
            if($scope.coins >= i.price) i.available = true;
        }
    }

    $interval(function(){
        step();
    }, 1000);
});