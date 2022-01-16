dashboard.component('navBar', {
    templateUrl: 'src/common/fixedNavBar/navBar.html',
    controller: NavBarController

});

NavBarController.$inject = ["LoginService",
    "$cookies",
    "$state",
    "StorageService",]
function NavBarController(LoginService, $cookies, $state, StorageService) {
    var $ctrl = this;
    $ctrl.email = "";
    $ctrl.password = "";

    $ctrl.login = function () {
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


    }
    $ctrl.auth = $cookies.get("id");
    $ctrl.isAuth = function () {
        return $ctrl.auth;
    }
    $ctrl.logOut = function () {
        // console.log("Cookie is " + $cookies.get("id"));
        $cookies.remove("id");
        $state.go("/")

    }
}