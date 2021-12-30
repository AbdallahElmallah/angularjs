
app.service("ShoppingListService", ShoppingListService);

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
