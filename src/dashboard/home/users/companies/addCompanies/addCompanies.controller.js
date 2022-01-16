dashboard.controller("AddCompaniesController", AddCompaniesController);

AddCompaniesController.$inject = ["AddUsersService"];
function AddCompaniesController(AddUsersService) {
    var ctrl = this;

    ctrl.addUser = function () {
        var data = {
            userType: 3,
            companyName: ctrl.companyName,
            companyAddress: ctrl.companyAddress,
            mobile: ctrl.mobile,
            birthdate: ctrl.birthdate,
            password: ctrl.password,
            commercialRegistrationNo: ctrl.commercialRegistrationNo,
            subscriptionContractValue: ctrl.subscriptionContractValue,
            addAttachment: ctrl.addAttachment,
        };
        AddUsersService.addUsers(data)
            .then(function (response) {
                console.log(response);
                if (response.status === 419)
                    ctrl.success = response.statusText + ", " + response.data.message;
                else if (response.status === 200)
                    ctrl.success = "Added successfully"

                ctrl.failed = false;


                ctrl.companyName = "";
                ctrl.companyAddress = "";
                ctrl.mobile = "";
                ctrl.birthdate = "";
                ctrl.password = "";
                ctrl.commercialRegistrationNo = "";
                ctrl.subscriptionContractValue = "";
                ctrl.addAttachment = "";
            })
            .catch(function (error) {
                console.log(error);
                ctrl.success = false;
                ctrl.failed = response.statusText;
            });
    };
}
