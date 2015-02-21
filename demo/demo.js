'use strict';

angular.module('demo', ['ngSanitize', 'mohsen1.schema-form']);

angular.module('demo')

.controller('TestCtrl', function ($scope) {
  $scope.simpleString = 'Hello world';
})

.config(function(SchemaFormProvider) {
  SchemaFormProvider.setOptions({
    theme: 'bootstrap3'
  });
});
