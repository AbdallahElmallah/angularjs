app2.factory("ShoppingListFactory", ShoppingListFactory);

function ShoppingLimitedListService(maxItems) {
    var service = this;

    var items = [];

    service.addItem = function (itemName, quantity) {
        if (
            maxItems === undefined ||
            (maxItems !== undefined && items.length < maxItems)
        ) {
            var item = {
                name: itemName,
                quantity: quantity,
            };
            items.push(item);
        } else throw new Error("Max items ( " + maxItems + " ) reached.");
    };

    service.removeItem = function (indexItem) {
        items.splice(indexItem, 1);
    }
    service.removeItems = function () {
        if (items.length !== 0) {
            items.length = 0;
        } else throw new Error("List is already empty.");
    }

    service.getItems = function () {
        return items;
    }
}

function ShoppingListFactory() {
    var factory = function (maxItems) {
        return new ShoppingLimitedListService(maxItems);
    };
    return factory;
}