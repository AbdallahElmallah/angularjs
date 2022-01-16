dashboard.service("AddUsersService", AddUsersService);

AddUsersService.$inject = ["$http", "AddUsersAPI"];
function AddUsersService($http, AddUsersAPI) {
    var service = this;

    service.addUsers = function (data) {
        return $http({
            url: AddUsersAPI,
            method: "POST",
            data: data
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };
}
