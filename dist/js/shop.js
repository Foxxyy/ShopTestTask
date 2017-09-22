var app = angular.module("shop", ['ui.router', 'ngModal'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('mainpage', {
      url: "/",
      templateUrl: "../html/main.html"
    })
    .state('cart', {
      url: "/cart",
      templateUrl: "../html/cart.html"
    })
    $urlRouterProvider.otherwise('/');
  });

var cart = [];

//{"name": "Apple Iphone 5s", "price": "20000", "count": "2"},
//{"name": "Apple Iphone 6s", "price": "35000", "count": "1"},
//{"name": "Apple Iphone 7", "price": "40000", "count": "4"}

app.controller("list", function($scope) {
  var request = new XMLHttpRequest();
  request.open("GET", "../products.json", false);
  request.send(null)
  var prodArr = JSON.parse(request.responseText);
  $scope.products = prodArr;
  $scope.count = 1;
  //$scope.prodCount = 0;
  //$scope.totalPrice = 0;
  $scope.addtocart = function(name, price, count) {
    $scope.dialogShown = false;
    var flag = true;
    cart.forEach(function(item, i, cart) {
      if (item.name == name) {
        item.count += count;
        flag = false;
        return;
      }
    });
    if (flag)
      cart.push({name, price, count});
    console.log(cart);
    $scope.prodCount = cart.length;
    console.log($scope.prodCount);
    var tp = 0;
    cart.forEach(function(item, i, cart) {
      tp += parseInt(item.price) * parseInt(item.count);
    });
    $scope.totalPrice = tp;
    console.log($scope.totalPrice);

  }
});

app.controller("cart", function($scope) {
  console.log(cart);
  $scope.cart = cart;
  var tp = 0;
  cart.forEach(function(item, i, cart) {
    tp += parseInt(item.price) * parseInt(item.count);
  });
  $scope.total = tp;
  $scope.delete = function(name) {
    cart.forEach(function(item, i, cart) {
      if (name == item.name) {
        cart.splice(i, 1);
      }
    });
  }
});
