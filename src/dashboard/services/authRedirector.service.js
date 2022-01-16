dashboard.service("AuthRedirectorService", AuthRedirectorService);

AuthRedirectorService.$inject = ["$state", "$cookies", "StorageService"];
function AuthRedirectorService($state, $cookies, StorageService) {
    var service = this;

    /**
     * Processes the logic when a state begins. We ensure that
     * the user is authenticated before letting them proceed
     * to the next page.
     */
    service.onStateChangeStart = function (
        event,
        toState,
        toParams,
        fromState,
        fromParams
    ) {
        // Only redirect if going to home state,
        // unless going directly to login

        if (
            (toState.name === "home" || toState.name.indexOf("home.") === 0) &&
            ($cookies.get("id") !== StorageService.get("id") ||
                $cookies.get("id") == undefined)
        ) {
            event.preventDefault();
            $cookies.remove("id");

            // console.log("redirect to index");
            $state.go("/", {
                toState: toState,
                toParams: toParams,
            });
        }
    };
}
