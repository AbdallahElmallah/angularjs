dashboard.controller("UsersController", UsersController);

UsersController.$inject = ["users"];
function UsersController(users) {
    var $ctrl = this;
    var filterList = function (response, userType) {
        var filterdList = [];
        for (const key in response.data) {
            if (Object.hasOwnProperty.call(response.data, key)) {
                if (response.data[key]["userType"] == userType) {
                    filterdList.push(response.data[key]);
                }
            }
        }
        return filterdList;
    }
    $ctrl.getUsers = function () {
        var promise = GetService.getUsers();
        promise.then(function (response) {
            $ctrl.disabledsList = filterList(users, 1);
            $ctrl.relativesOfDisabledsList = filterList(users, 2);
            $ctrl.companiesList = filterList(users, 3);
            console.log("Companies List Length is " + $ctrl.companiesList.length);
        }).catch(function (error) {
            console.log(error);
        }).finally(function () { });

    };
    // $ctrl.getUsers();

}
