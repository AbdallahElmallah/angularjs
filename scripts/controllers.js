app.controller("LunchCheckController", LunchCheckController);

app2.controller("ShoppingListController", ShoppingListController);
app2.controller("ShoppingLimitedListController", ShoppingLimitedListController);

app3.controller("ToBuyController", ToBuyController);
app3.controller("AlreadyBoughtController", AlreadyBoughtController);

app4.controller("ShoppingListPromiseController", ShoppingListPromiseController);

app5.controller("MenuCategoriesController", MenuCategoriesController);

LunchCheckController.$inject = ["$scope"];
function LunchCheckController($scope) {
    const MAX_ITEMS = 3;
    $scope.items = "";
    $scope.flag = false;
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


ShoppingListController.$inject = ["ShoppingListFactory"];
function ShoppingListController(ShoppingListFactory) {
    var list1 = this;
    list1.MAX_ITEMS = 4;
    var shoppingList = ShoppingListFactory(list1.MAX_ITEMS);
    list1.checked = false;
    list1.items = shoppingList.getItems();
    list1.itemName = "";
    list1.Quantity = "";
    var origTitle = "Shopping List #1";
    list1.title = origTitle + " (" + list1.items.length + " items )";
    list1.addItem = function () {
        try {
            if ((list1.itemName && list1.Quantity) === "") {
                list1.emptyItem = "Enter empty field(s) first";
                list1.emptyItemMsg = true;
                console.log(list1.emptyItem);
            } else {
                list1.emptyItemMsg = false;
                if (list1.itemName == "cookie") {
                    list1.warning = "cookie detected!";
                }
                shoppingList.addItem(list1.itemName, list1.Quantity);
                list1.title = origTitle + " (" + list1.items.length + " items )";
                list1.flag = false
            }
        } catch (error) {
            list1.errorMessage = error.message;
            console.log(list1.errorMessage);
        }
    };

    list1.removeItem = function (itemIndex) {
        list1.removedItem = "Last removed Item was " + "(" + list1.items[itemIndex].name + ")";
        if (list1.items.length == 1) {
            list1.flag = false
        }
        shoppingList.removeItem(itemIndex);
        list1.title = origTitle + " (" + list1.items.length + " items )";
        if (list1.items.length < list1.MAX_ITEMS) {
            return list1.errorMessage = false;
        }

    };

    list1.removeItems = function () {

        if (list1.items.length !== 0) {

            list1.removedItem = "Last removed Item was " +
                "(" + list1.items.at(-1).name + ")";

            list1.items.length = 0;

            list1.title = origTitle + " (" + list1.items.length + " items )";
            list1.emptyList = "List Items Deleted";
            console.log(list1.emptyList);
            list1.flag = false

        } else {

            list1.emptyList = "List is already empty";
            list1.flag = true;
            console.log(list1.emptyList)

        }



    }
}

ShoppingLimitedListController.$inject = ["ShoppingListFactory"];
function ShoppingLimitedListController(ShoppingListFactory) {
    var list2 = this;

    var shoppingList = ShoppingListFactory(2);

    list2.items = shoppingList.getItems();
    list2.itemName = "";
    list2.Quantity = "";
    list2.addItem = function () {
        try {
            shoppingList.addItem(list2.itemName, list2.Quantity);
        } catch (error) {
            list2.errorMessage = error.message;
        }
    };

    list2.removeItem = function (itemIndex) {
        shoppingList.removeItem(itemIndex);
        if (list2.items.length < 3) list2.errorMessage = false;
    };
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
    };
}
AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var service = this;
    service.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    service.removeItem = function () {
        ShoppingListCheckOffService.removeItem();
    };
    service.removeItems = function () {
        ShoppingListCheckOffService.removeItems();
    };
}

ShoppingListPromiseController.$inject = ["ShoppingListService"];
function ShoppingListPromiseController(ShoppingListService) {
    var list = this;

    list.items = ShoppingListService.getItems();

    list.itemName = "";
    list.itemQuantity = "";

    list.addItem = function () {
        ShoppingListService.addItem(list.itemName, list.itemQuantity);
    };

    list.removeItem = function (itemIndex) {
        ShoppingListService.removeItem(itemIndex);
    };
}

MenuCategoriesController.$inject = ["MenuCategoriesService"];
function MenuCategoriesController(MenuCategoriesService) {
    var menu = this;

    var promise = MenuCategoriesService.getMenuCategories();

    promise
        .then(function (response) {
            menu.categories = response.data;
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });

    menu.logMenuItems = function (shortName) {
        var promise = MenuCategoriesService.getMenuForCategory(shortName);

        promise
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
}
