dashboard.service("GetUsersByTypeService", GetUsersByTypeService);

GetUsersByTypeService.$inject = ["$http", "UsersByTypeAPI"];
function GetUsersByTypeService($http, UsersByTypeAPI) {
    var service = this;

    service.getUsersByType = function (userType) {
        return $http({
            url: UsersByTypeAPI,
            method: "GET",
            params: {
                type: userType,
            },
        })
            .then(function (response) {
                return response;
            })
            .catch(function (error) {
                return error;
            });
    };
}
