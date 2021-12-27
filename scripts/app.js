var app = angular.module("LunchCheck", []);

app.controller("LunchCheckController", function ($scope) {
    const MAX_ITEMS = 3;
    $scope.items = "";
    $scope.flag = false;

    $scope.msg = function () {
        let filteredItems = $scope.items
            .split(",")
            .map((item) => item.replace(/\s/g, "").trim())
            .filter((item) => item !== "");
        if (
            filteredItems.length === 0
        ) {
            $scope.message = "Please enter data first";
            $scope.checked = false;
            $scope.flag = true;
        }
        else if (
            filteredItems.length <= MAX_ITEMS
        ) {
            $scope.message = "Enjoy!";
            $scope.checked = true;
            $scope.flag = true;

        }
        else {
            $scope.message = "Too much!";
            $scope.checked = true;
            $scope.flag = true;

        }
    };
});
