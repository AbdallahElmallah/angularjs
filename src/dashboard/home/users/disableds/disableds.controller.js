dashboard.controller("DisabledsController", DisabledsController)

DisabledsController.$inject = ["users"]
function DisabledsController(users) {
    var ctrl = this;
    ctrl.disabledsList = users.data;

}