dashboard.service("GetService", GetService);

GetService.$inject = ["$http", "UsersAPI"];
function GetService($http, UsersAPI) {
    var service = this;
    service.getUsers = function () {
        return $http({
            url: UsersAPI,
            method: "GET",
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };
}
