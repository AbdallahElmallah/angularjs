
angular.module('common', []);
let common = angular.module('common');
common.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
    $httpProvider.interceptors.push('loadingHttpInterceptor');

}
