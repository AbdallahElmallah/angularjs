dashboard.controller("CompaniesController", CompaniesController)

CompaniesController.$inject = ["users"]
function CompaniesController(users) {
    var ctrl = this;
    ctrl.companiesList = users.data;

}