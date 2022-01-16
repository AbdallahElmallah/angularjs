angular.module("dashboard", [
    "ui.router",
    "ui.router.state.events",
    "ngCookies",
    "common",
]);

var dashboard = angular.module("dashboard");

dashboard.config(config);

config.$inject = ["$urlRouterProvider"];
function config($urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

}

dashboard.run(run);

run.$inject = ["$rootScope", "AuthRedirectorService"];
function run($rootScope, AuthRedirectorService) {
    // Apply auth rules when state changes
    var cancelListener = $rootScope.$on(
        "$stateChangeStart",
        AuthRedirectorService.onStateChangeStart
    );

    $rootScope.$onDestroy = function () {
        cancelListener();
    };
}
