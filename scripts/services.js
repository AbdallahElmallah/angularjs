app2.service("ShoppingLimitedListService", ShoppingLimitedListService);

app3.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

app4.service("ShoppingListService", ShoppingListService);
app4.service("WeightLossFilterService", WeightLossFilterService);

app5.service("MenuCategoriesService", MenuCategoriesService);
app5.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

app6.service("MenuSearchService", MenuSearchService);
app6.constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

function ShoppingLimitedListService() {
    var service = this;

    var items = [];

    service.addItem = function (itemName, quantity) {
        var item = {
            name: itemName,
            quantity: quantity,
        };
        items.push(item);
        console.log(items);
    };

    service.getItems = function () {
        return items;
    };

    service.removeItem = function (itemIndex) {
        items.splice(itemIndex, 1);
    };
}

function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [];
    var boughtItems = [];

    service.addItem = function (itemName, quantity) {
        var item = {
            name: itemName,
            quantity: quantity,
        };
        toBuyItems.push(item);
        console.log(toBuyItems);
    };

    service.getToBuyItems = function () {
        return toBuyItems;
    };
    service.getBoughtItems = function () {
        return boughtItems;
    };
    service.removeItem = function (itemIndex) {
        boughtItems.splice(itemIndex, 1);
    };
    service.removeItems = function () {
        boughtItems.length = 0;
    };
    service.buyItem = function (itemIndex) {
        boughtItems.push(toBuyItems[itemIndex]);
        toBuyItems.splice(itemIndex, 1);
    };
}

WeightLossFilterService.$inject = ["$q", "$timeout"];
function WeightLossFilterService($q, $timeout) {
    var service = this;

    service.checkName = function (name) {
        var deferred = $q.defer();

        var result = {
            message: "",
        };

        $timeout(function () {
            if (name.toLowerCase().indexOf("milk") === -1) {
                deferred.resolve(result);
            } else {
                result.message = "Don't buy milk!";
                deferred.reject(result);
            }
        }, 2000);

        return deferred.promise;
    };

    service.checkQuantity = function (quantity) {
        var deferred = $q.defer();
        var MAX_BOXES = 6;
        var result = {
            message: "",
        };

        $timeout(function () {
            // Check for too many boxes
            if (quantity < MAX_BOXES) {
                deferred.resolve(result);
            } else {
                result.message = "That's too much";
                deferred.reject(result);
            }
        }, 1000);

        return deferred.promise;
    };
}

ShoppingListService.$inject = ["$q", "WeightLossFilterService"];
function ShoppingListService($q, WeightLossFilterService) {
    var service = this;

    // List of shopping items
    var items = [];

    // service.addItem = function (name, quantity) {
    //     var promise = WeightLossFilterService.checkName(name);

    //     promise.then(function (response) {
    //         var nextPromise = WeightLossFilterService.checkQuantity(quantity);

    //         nextPromise.then(function (result) {
    //             var item = {
    //                 name: name,
    //                 quantity: quantity
    //             };
    //             items.push(item);
    //         }, function (errorResponse) {
    //             console.log(errorResponse.message);
    //         });
    //     }, function (errorResponse) {
    //         console.log(errorResponse.message);
    //     });
    // };

    // service.addItem = function (name, quantity) {
    //     var promise = WeightLossFilterService.checkName(name);

    //     promise
    //         .then(function (response) {
    //             return WeightLossFilterService.checkQuantity(quantity);
    //         })
    //         .then(function (response) {
    //             var item = {
    //                 name: name,
    //                 quantity: quantity
    //             };
    //             items.push(item);
    //         })
    //         .catch(function (errorResponse) {
    //             console.log(errorResponse.message);
    //         });
    // };

    service.addItem = function (name, quantity) {
        var namePromise = WeightLossFilterService.checkName(name);
        var quantityPromise = WeightLossFilterService.checkQuantity(quantity);

        $q.all([namePromise, quantityPromise])
            .then(function (response) {
                var item = {
                    name: name,
                    quantity: quantity,
                };
                items.push(item);
            })
            .catch(function (errorResponse) {
                console.log(errorResponse.message);
            });
    };

    service.removeItem = function (itemIndex) {
        items.splice(itemIndex, 1);
    };

    service.getItems = function () {
        return items;
    };
}

MenuCategoriesService.$inject = ["$http", "ApiBasePath"];
function MenuCategoriesService($http, ApiBasePath) {
    var service = this;

    service.getMenuCategories = function () {
        var response = $http({
            method: "GET",
            url: ApiBasePath + "/categories.json",
        });

        return response;
    };

    service.getMenuForCategory = function (shortName) {
        var response = $http({
            method: "GET",
            url: ApiBasePath + "/menu_items.json",
            params: {
                category: shortName,
            },
        });

        return response;
    };
}

MenuSearchService.$inject = ["$http", "ApiBasePath"];
function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
        return $http({
            method: "GET",
            url: ApiBasePath + "/menu_items.json",
        })
            .then(function (response) {
                // process result and only keep items that match
                var foundItems = [];
                var menuItems = response["data"]["menu_items"];
                menuItems.forEach((element) => {
                    if (searchTerm !== "") {
                        if (element["description"].toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                            foundItems.push(element["description"]);
                            console.log("Added");
                        }
                    } else {
                        console.log("EEmpty String ")
                        return foundItems;
                    }
                });

                // return processed items
                return foundItems;
            })
            .catch(function (error) {
                throw new Error(error.message);
            });
    };
}
