app.controller("LunchCheckController", LunchCheckController);
app.controller("ShoppingListAddController", ShoppingListAddController);
app.controller("ShoppingListShowController", ShoppingListShowController)
LunchCheckController.$inject = ["$scope", "enterFilter"];

function LunchCheckController($scope, enterFilter) {
    const MAX_ITEMS = 3;
    $scope.items = "";
    $scope.flag = false;
    console.log(enterFilter("enter"));
    $scope.msg = function () {
        let filteredItems = $scope.items
            .split(",")
            .map((item) => item.replace(/\s/g, "").trim())
            .filter((item) => item !== "");
        if (filteredItems.length === 0) {
            $scope.message = "Please enter data first";
            $scope.checked = false;
            $scope.flag = true;
        } else if (filteredItems.length <= MAX_ITEMS) {
            $scope.message = "Enjoy!";
            $scope.checked = true;
            $scope.flag = true;
        } else {
            $scope.message = "Too much!";
            $scope.checked = true;
            $scope.flag = true;
        }
    };
}
ShoppingListAddController.$inject = ["ShoppingListService"];
function ShoppingListAddController(ShoppingListService) {
    var itemAdder = this;
    itemAdder.itemName = "";
    itemAdder.itemQuantity = "";

    itemAdder.addItem = function () {
        ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
    };
}

ShoppingListShowController.$inject = ["ShoppingListService"];
function ShoppingListShowController(ShoppingListService) {
    var showList = this;
    showList.items = ShoppingListService.getItems();
    showList.removeItem = function (itemIndex) {
        ShoppingListService.removeItem(itemIndex);
    }
}