app2.component("shoppingListComponent", {
    templateUrl: "/directivesPages/shoppingList.html",
    controller: ShoppingListComponentController,
    bindings: {
        items: "<",
        myTitle: "@title",
        onRemove: "&",

    },
});

ShoppingListComponentController.$inject = ["$scope", "$element"];
function ShoppingListComponentController($scope, $element) {
    var $ctrl = this;

    $ctrl.cookiesInList = function () {
        for (var i = 0; i < $ctrl.items.length; i++) {
            var name = $ctrl.items[i].name;
            if (name.toLowerCase().indexOf("cookie") !== -1) {
                return true;
            }
        }

        return false;
    };

    $ctrl.remove = function (myIndex) {
        $ctrl.onRemove({ index: myIndex });
    };

    $ctrl.$onInit = function () {
        console.log("We are in $onInit()");
    };

    $ctrl.$onChanges = function (changeObj) {
        //console.log("Changes: ", changeObj);
    };

    $ctrl.$postLink = function () {
        $scope.$watch("$ctrl.cookiesInList()", function (newValue, oldValue) {
            console.log($element);
            if (newValue === true) {
                // Show warning
                var warningElem = $element.find("div.error");
                warningElem.slideDown(900);
            } else {
                // Hide warning
                var warningElem = $element.find("div.error");
                warningElem.slideUp(900);
            }
        });
    };
}
