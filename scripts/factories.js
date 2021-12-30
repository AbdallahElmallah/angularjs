app.factory("ShoppingListFactory", ShoppingListFactory);

function ShoppingListService(maxItems) {
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

    service.getItems = function () {
        return items;
    }
}

function ShoppingListFactory() {
    var factory = function (maxItems) {
        return new ShoppingListService(maxItems);
    };
    return factory;
}