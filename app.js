"use strict";

var app = angular.module("app", []);

app.controller("firstController", greeting, hello)

firstController.$inject = ['$scope'];

function greeting($scope) {
    $scope.name = "";
    $scope.greeting = function () {
        return "Hello " + $scope.name;
    };
    $scope.test = function () {
        return $scope.m = 'Hello ' + $scope.name;
    }


};

function hello($scope) {
    $scope.job = "";
};
