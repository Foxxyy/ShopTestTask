var app = angular.module("shop", ['ui.router'])
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

app.controller("list", function($scope) {
  var request = new XMLHttpRequest();
  request.open("GET", "../products.json", false);
  request.send(null)
  var prodArr = JSON.parse(request.responseText);
  $scope.products = prodArr;
  /*$scope.count = prodArr.length;
  var tp = 0;
  prodArr.forEach(function(item, i, prodArr) {
    tp += parseInt(item.price);
  });
  $scope.totalPrice = tp;
  console.log(prodArr);
  console.log(prodArr.length);
  console.log(tp);*/
});
