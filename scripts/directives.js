app2.directive('shoppingList', ShoppingListDirective);

function ShoppingListDirective() {
    var ddo = {

        templateUrl: '/directivesPages/shoppingList.html',
        scope: {
            items: '<',
            removedItem: '@',
            title: '@',
            onRemove: '&',
            onAllRemove: '&'
        },
        controller: ShoppingListDirectiveController,
        controllerAs: 'list',
        bindToController: true,
        link: ShoppingListDirectiveLink,
        transclude: true
    };

    return ddo;
}


function ShoppingListDirectiveLink(scope, element, attrs, controller) {
    console.log("Link scope is: ", scope);
    console.log("Controller instance is: ", controller);
    console.log("Element is: ", element);

    scope.$watch('list.cookiesInList()', function (newValue, oldValue) {
        console.log("Old value: ", oldValue);
        console.log("New value: ", newValue);

        if (newValue === true) {
            displayCookieWarning();
        }
        else {
            removeCookieWarning();
        };

    });


    function displayCookieWarning() {
        // Using Angluar jqLite
        var warningElem = element.find("div");
        console.log(warningElem);
        warningElem.css('display', 'block');

        // If jQuery included before Angluar
        // var warningElem = element.find("div.error");
        // warningElem.slideDown(900);
    }

    function removeCookieWarning() {
        // Using Angluar jqLite
        var warningElem = element.find("div");
        warningElem.css('display', 'none');

        // If jQuery included before Angluar
        // var warningElem = element.find("div.error");
        // warningElem.slideUp(900);

    }

}











function ShoppingListDirectiveController() {
    var list = this;
    list.cookiesInList = function () {
        for (var i = 0; i < list.items.length; i++) {
            var name = list.items[i].name;
            if (name.toLowerCase().indexOf("cookie") !== -1) {
                return true;
            }
        }
        return false;
    };
}





