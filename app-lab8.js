/**
 * Created by Niyas on 12/12/2016.
 */
var angularApp = angular.module('angularApp', []);

//Directives - An instruction to AngularJS to manipulate a piece of the DOM. This could be 'Add a Class', 'Hide this', 'Create this', etc.

angularApp.controller('mainController', ['$scope','$filter','$timeout',function ($scope, $filter, $timeout) {

    // defined the handle as empty. the angularJS' ng-model will do the 2 way binding of updating the below $scope.handle and display it in the html in the place of {{handle}}
	// angularJS basically add 'handle' and  'lowercasehandle' to watcher and digest loop (concept is javascript eventListener - refer Lab7)
    $scope.handle = '';

    $scope.lowercasehandle = function(){
        return $filter('lowercase')($scope.handle);
    };

    // NOTE: the Watcher and Digest Loop is with AngularJS Context. If we have any regular JS meaning outside the AngularJS Context, then it wont work
    $scope.$watch('handle',function(newValue,oldValue){
        console.info('Changed !');
        console.log('Old Value:'+oldValue);
        console.log('New Value:'+newValue);
    });

    // Example: for running vanilla javascript outside the AngularJS Context.
    /*setTimeout(function(){
        // Though agter 3 secongs the console printed with 'Scope Changes', the handle not changed to 'NewTwitterHandle'. This is because the code running outside the AngularJS Contexx.
        // In order to fix, it we need to manually tell the ANgularJS to apply Watch and Digest cycle with $apply
        $scope.handle = "NewTwitterHandle";
        console.log('Scope Change!');
    },3000);*/


    setTimeout(function(){
        // Though agter 3 secongs the console printed with 'Scope Changes', the handle not changed to 'NewTwitterHandle'. This is because the code running outside the AngularJS Contexx.
        // In order to fix, it we need to manually tell the ANgularJS to apply Watch and Digest cycle with $apply
        $scope.$apply(function(){
            $scope.handle = "NewTwitterHandle";
            console.log('Scope Changed using Vanilla Javascript!');
        });
    },3000);

    // We can also user AngularJS service $timeout instead of vanilla javascript, so that it will be within the AngularJS Arch/ context.
    $timeout(function(){
            $scope.handle = "NewTwitterHandleChangedgain";
            console.log('Scope Changed Again using AngularJS Service!');
    },6000);


}]);