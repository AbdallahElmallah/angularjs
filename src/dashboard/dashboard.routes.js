dashboard.config(config);

config.$inject = ["$stateProvider", "$httpProvider", "$locationProvider"];
function config($stateProvider, $httpProvider, $locationProvider) {


    $stateProvider

        .state("/", {
            url: "/",
            // abstract: true,
            templateUrl: "index.html",
            params: {
                toParams: null,
                toState: null,
            },
        })
        /* .state("login", {
                         url: "/login",
                         // templateUrl: 'src/dashboard/login/login.html',
                         template: "<h1>Login Page</h1>",
                         controller: "LoginController",
                         controllerAs: "loginCtrl",
                         // These are params that this state expects to be populated
                         // Allows us to pass via $state.go(path, params)
                         params: {
                             toParams: null,
                             toState: null,
                         },
                     })
             */
        .state("home", {
            url: "/home",
            templateUrl: "src/dashboard/home/home.html",
        })
        .state("home.users", {
            url: "/users",
            template: `
            <a role="button" ui-sref="home.disabled">Disabled</a>
            <a role="button" ui-sref="home.relative">Relative</a>
            <a role="button" ui-sref="home.company">Company</a>

            `,
        })
        .state("home.disableds", {
            url: "/users/disableds",
            templateUrl: "src/dashboard/home/users/disableds/disableds.html",
            controller: "DisabledsController",
            controllerAs: "disableds",
            resolve: {
                users: function (GetUsersByTypeService) {
                    return GetUsersByTypeService.getUsersByType(1)
                        .then(function (response) {
                            // console.log(response);
                            return response;
                        })
                        .catch(function (error) {
                            return error;
                        });
                },
            },
        })
        .state("home.relatives", {
            url: "/users/relatives",
            templateUrl: "src/dashboard/home/users/relatives/relatives.html",
            controller: "RelativesController",
            controllerAs: "relatives",
            resolve: {
                users: function (GetUsersByTypeService) {
                    return GetUsersByTypeService.getUsersByType(2)
                        .then(function (response) {
                            // console.log(response);
                            return response;
                        })
                        .catch(function (error) {
                            return error;
                        });
                },
            },
        })
        .state("home.companies", {
            url: "/users/companies",
            templateUrl: "src/dashboard/home/users/companies/companies.html",
            controller: "CompaniesController",
            controllerAs: "companies",

            resolve: {
                users: function (GetUsersByTypeService) {
                    return GetUsersByTypeService.getUsersByType(3)
                        .then(function (response) {
                            // console.log(response);
                            return response;
                        })
                        .catch(function (error) {
                            return error;
                        });
                },
            },
        })
        .state("home.addDisabled", {
            url: "/addUser/disabled",
            templateUrl:
                "src/dashboard/home/users/disableds/addDisableds/addDisableds.html",
            controller: "AddDisabledsController",
            controllerAs: "addDisabled",
        })
        .state("home.addRelative", {
            url: "/addUser/relative",
            templateUrl:
                "src/dashboard/home/users/relatives/addRelatives/addRelatives.html",
            controller: "AddRelativesController",
            controllerAs: "addRelative",
        })
        .state("home.addCompany", {
            url: "/addUser/company",
            templateUrl:
                "src/dashboard/home/users/companies/addCompanies/addCompanies.html",
            controller: "AddCompaniesController",
            controllerAs: "addCompany",
        });
}
