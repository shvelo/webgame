angular.module('app', [])
.controller('appCtrl', function($scope, $interval){
    $scope.items = {
        bagel: {
            name: "lambeosaurus",
            price: 10,
            have: 0,
            onBuy: function(){
                $scope.coinRate += 1;
            }
        },
        superBagel: {
            name: "Brontosaurus",
            price: 100,
            have: 0,
            onBuy: function(){
                $scope.coinRate += 10;
            }
        },
        ticket: {
            name: "T-Rex",
            price: 10000,
            have: 0,
            onBuy: function(){
                $scope.stage = 1;
                delete $scope.items.ticket;
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
    $scope.stage = 0;

    if(location.hash == "#debug") $scope.debug = true;

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