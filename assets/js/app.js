angular.module('app', [])
.controller('appCtrl', function($scope, $interval){
    $scope.items = {
        lambeosaurus: {
            name: "Lambeosaurus",
            price: 10,
            have: 0,
            hint: "+1 Raptors/s",
            onBuy: function(){
                $scope.coinRate += 1;
            }
        },
        brontosaurus: {
            name: "Brontosaurus",
            price: 100,
            have: 0,
            hint: "+10 Raptors/s",
            onBuy: function(){
                $scope.coinRate += 10;
            }
        }
    };

    $scope.specials = {
        exhibit: {
            name: "Exhibit",
            price: 10000,
            hint: "Exhibit the dinosaurs",
            onBuy: function(){
                $scope.stage = 1;
            }
        },
        betterTools: {
            name: "Better tools",
            price: 1000,
            hint: "Triple productivity",
            onBuy: function(){
                $scope.coinRate = $scope.coinRate * 3;
            }
        }
    }

    $scope.buy = function(item){
        var i = $scope.items[item];
        if($scope.coins >= i.price) {
            $scope.coins -= i.price;
            i.have += 1;
            if(i.onBuy) i.onBuy();
        }
    }

    $scope.buySpecial = function(special){
        var s = $scope.specials[special];
        if($scope.coins >= s.price) {
            $scope.coins -= s.price;
            s.bought = true;
            if(s.onBuy) s.onBuy();
        }
    }

    $scope.drop = function(){
        $scope.coins = 0;
    }

    if(localStorage.coins) {
        $scope.coins = localStorage.coins -0;
        $scope.coinRate = localStorage.coinRate -0;
        $scope.stage = localStorage.stage -0;
        $scope.items = JSON.parse(localStorage.items);
        $scope.specials = JSON.parse(localStorage.specials);
    } else {
        $scope.coins = 0;
        $scope.coinRate = 1;
        $scope.stage = 0;
    }

    window.onbeforeunload = function(){
        localStorage.coins = $scope.coins;
        localStorage.coinRate = $scope.coinRate;
        localStorage.stage = $scope.stage;
        localStorage.items = JSON.stringify($scope.items);
        localStorage.specials = JSON.stringify($scope.specials);
    };

    if(location.hash == "#debug") $scope.debug = true;

    var step = function(){
        $scope.coins += $scope.coinRate;
        for(item in $scope.items) {
            var i = $scope.items[item];
            if($scope.coins >= i.price) i.available = true;
        }

        for(special in $scope.specials) {
            var i = $scope.specials[special];
            if($scope.coins >= i.price) i.available = true;
        }
    }

    $interval(function(){
        step();
    }, 1000);
});