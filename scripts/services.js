
app.service("ShoppingListService", ShoppingListService);
app2.service("ShoppingListCheckOffService", ShoppingListCheckOffService)
function ShoppingListService() {

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
    }
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
    }
    service.removeItem = function (itemIndex) {
        boughtItems.splice(itemIndex, 1);
    }
    service.removeItems = function () {
        boughtItems.length = 0;
    }
    service.buyItem = function (itemIndex) {
        boughtItems.push(toBuyItems[itemIndex]);
        toBuyItems.splice(itemIndex, 1);
    }

}