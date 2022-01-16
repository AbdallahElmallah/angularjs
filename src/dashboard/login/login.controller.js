dashboard.controller("LoginController", LoginController);

LoginController.$inject = [
    "$state",
    "$cookies",
    "LoginService",
    "StorageService",
];

function LoginController(LoginService, $cookies, $state, StorageService) {
    var $ctrl = this;
    $ctrl.email = "";
    $ctrl.password = "";

    $ctrl.login = function () {
        // console.log("Logged");
        var promise = LoginService.login($ctrl.email, $ctrl.password);

        promise
            .then(function (response) {
                $cookies.put("id", response["_id"]);
                StorageService.set("id", response["_id"]);
                $ctrl.error = "";

                if (!$state.params || !$state.params.toState) {
                    $state.go("home");
                } else {
                    $state.go($state.params.toState.name, $state.params.toParams);
                }
            })
            .catch(function () {
                $ctrl.error = "Login Failed: Username and/or Password did not match.";
            });
    };
    $ctrl.auth = $cookies.get("id") === StorageService.get("id");
    $ctrl.isAuth = function () {
        return $ctrl.auth;
    };
    $ctrl.logOut = function () {
        // console.log("Cookie is " + $cookies.get("id"));
        $cookies.remove("id");
        $state.go("/");
    };
}
