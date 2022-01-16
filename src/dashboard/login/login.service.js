dashboard.service("LoginService", LoginService);
LoginService.$inject = ["$http", "LoginAPI"];
function LoginService($http, LoginAPI) {
    var service = this;

    service.login = function (email, password) {
        return $http({
            url: LoginAPI,
            method: "POST",
            data: {
                email: email,
                password: password,
            },
        }).then(function (response) {
            return response.data;
        });
    };
}
