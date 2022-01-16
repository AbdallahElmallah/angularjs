dashboard.controller("RelativesController", RelativesController)

RelativesController.$inject = ["users"]
function RelativesController(users) {
    var ctrl = this;
    ctrl.relativesList = users.data;
}