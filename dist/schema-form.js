/*!
 * angular-json-schema-form
 * https://github.com/mohsen1/angular-json-schema-form
 * Version: 0.0.7 - 2015-02-21T08:39:30.828Z
 * License: MIT
 */


'use strict';

/*
 * schema-form directive
 *
 * Usage:
 *
 * Pass `schema-form` attribute to a <form> element with your JSON Schema object
 * as value to it.
 *
 * Example:
 * ```
 * <form schema-form="mySchema">
 *    <button type="submit">Submit</button>
 * </form>
 * ```
*/
angular.module('mohsen1.schema-form', [])

/*
 * Main directive
*/
.directive('schemaForm', function(SchemaForm) {

  return {
    restrict: 'A',
    replcae: false,
    require: '?ngModel',
    scope: {
      'schema': '=schemaForm'
    },
    link: function(scope, element, attributes, ngModel) {
      var formEl = window.document.createElement('div');
      var options = angular.extend(SchemaForm.options, {schema: scope.schema});
      var jsonEditor = null;

      ngModel.$render = function() {
        jsonEditor = new JSONEditor(formEl, options);
        element.prepend(formEl);
        jsonEditor.setValue(ngModel.$modelValue);

        jsonEditor.on('change', function() {
          scope.$evalAsync(function()   {
            ngModel.$setViewValue(jsonEditor.getValue());
          });
        });
      };

      scope.$watch(attributes.schemaForm, function() {
        window.console.log(arguments);
      });
    }
  };
})

/*
 * Provides configurations for schema form
 *
 * Example:
 * MyApp.config(function(SchemaFormProvider) {
 *   SchemaFormProvider.setOptions(myOptions);
 * });
 *
 * See options here: https://github.com/jdorn/json-editor#options
 *
*/
.provider('SchemaForm', function() {
  var options = JSONEditor.defaults.options;

  this.$get = function() {
    return {
      options: options
    };
  };

  this.setOptions = function(newOptions) {
    if (!angular.isObject(newOptions)) {
      throw new Error('options should be an object.');
    }

    angular.extend(options, newOptions);
  };

  this.getOptions = function() {
    return options;
  };
});
