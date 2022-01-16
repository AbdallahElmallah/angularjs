dashboard.controller("AddRelativesController", AddRelativesController)

AddRelativesController.$inject = ["AddUsersService"];
function AddRelativesController(AddUsersService) {
    var ctrl = this;



    ctrl.addUser = function () {
        var data = {
            userType: 2,
            firstName: ctrl.firstName,
            familyName: ctrl.familyName,
            mobile: ctrl.mobile,
            password: ctrl.password,
            identificationNumber: ctrl.identificationNumber,
            residencyNumber: ctrl.residencyNumber,
            qrCode: ctrl.qrCode,
            relativeRelation: ctrl.relativeRelation
        };
        AddUsersService.addUsers(data)
            .then(function (response) {
                console.log(response);
                if (response.status === 419)
                    ctrl.success = response.statusText + ", " + response.data.message;
                else if (response.status === 200)
                    ctrl.success = "Added successfully"

                ctrl.failed = false;

                ctrl.firstName = "";
                ctrl.familyName = "";
                ctrl.mobile = "";
                ctrl.password = "";
                ctrl.identificationNumber = "";
                ctrl.residencyNumber = "";
                ctrl.qrCode = "";
                ctrl.relativeRelation = "";

            })
            .catch(function (error) {
                console.log(error);
                ctrl.success = false;
                ctrl.failed = response.statusText;
            });
    };
}