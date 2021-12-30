app.provider('ShoppingListService', ShoppingListServiceProvider);

function ShoppingListService(maxItems) {
    var service = this;

    // List of shopping items
    var items = [];

    service.addItem = function (itemName, quantity) {
        if ((maxItems === undefined) ||
            (maxItems !== undefined) && (items.length < maxItems)) {
            var item = {
                name: itemName,
                quantity: quantity
            };
            items.push(item);
        }
        else {
            throw new Error("Max items (" + maxItems + ") reached.");
        }
    };

    service.removeItem = function (itemIndex) {
        items.splice(itemIndex, 1);
    };

    service.getItems = function () {
        return items;
    };
}


function ShoppingListServiceProvider() {
    var provider = this;

    provider.defaults = {
        maxItems: 3
    };

    provider.$get = function () {
        var shoppingList = new ShoppingListService(provider.defaults.maxItems);

        return shoppingList;
    };
}