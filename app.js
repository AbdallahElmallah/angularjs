var app = angular.module("LunchCheck", []);

app.controller("LunchCheckController", function ($scope) {
    $scope.items = "";
    $scope.message = "";
    $scope.msg = function () {
        if (
            $scope.items
                .split(",")
                .map((item) => item.replace(/\s/g, "").trim())
                .filter((item) => item !== "").length === 0
        )
            $scope.message = "Please enter data first";
        else if (
            $scope.items
                .split(",")
                .map((item) => item.replace(/\s/g, "").trim())
                .filter((item) => item !== "").length <= 3
        )
            $scope.message = "Enjoy!";
        else $scope.message = "Too much!";
    };
});
