app.controller("LunchCheckController", LunchCheckController);
app.controller("ShoppingListAddController", ShoppingListAddController);
app.controller("ShoppingListShowController", ShoppingListShowController)
app.controller("ShoppingListController1", ShoppingListController1);
app.controller("ShoppingListController2", ShoppingListController2);

app.config(Config);


app2.controller("ToBuyController", ToBuyController);
app2.controller("AlreadyBoughtController", AlreadyBoughtController);


Config.$inject = ['ShoppingListServiceProvider'];
function Config(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.defaults.maxItems = 2;

}

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

ShoppingListController1.$inject = ["ShoppingListFactory"];
function ShoppingListController1(ShoppingListFactory) {

    var list1 = this;

    var shoppingList = ShoppingListFactory();

    list1.items = shoppingList.getItems();
    list1.itemName = "";
    list1.Quantity = "";
    list1.addItem = function () {
        shoppingList.addItem(list1.itemName, list1.Quantity);
    }

    list1.removeItem = function (itemIndex) {
        shoppingList.removeItem(itemIndex);
    }


}

ShoppingListController2.$inject = ["ShoppingListService"];
function ShoppingListController2(ShoppingListService) {
    var list2 = this;

    var shoppingList = ShoppingListService;

    list2.items = shoppingList.getItems();
    list2.itemName = "";
    list2.Quantity = "";
    list2.addItem = function () {
        try {

            shoppingList.addItem(list2.itemName, list2.Quantity);
        } catch (error) {
            list2.errorMessage = error.message;
        }
    }

    list2.removeItem = function (itemIndex) {
        shoppingList.removeItem(itemIndex);
        if (list2.items.length < 3)
            list2.errorMessage = false;
    }
}

ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService) {

    var service = this;
    service.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
    service.itemName = "";
    service.Quantity = "";
    service.addItem = function () {
        ShoppingListCheckOffService.addItem(service.itemName, service.Quantity);
    };

    service.buyItem = function (itemIndex) {
        ShoppingListCheckOffService.buyItem(itemIndex);
    }


}
AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var service = this;
    service.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    service.removeItem = function () {
        ShoppingListCheckOffService.removeItem();
    }
    service.removeItems = function () {
        ShoppingListCheckOffService.removeItems();
    }
}
