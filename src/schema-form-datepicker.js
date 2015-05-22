angular.module('schemaForm-datepicker', ['schemaForm', 'mgcrea.ngStrap']).config(
['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
  function(schemaFormProvider,  schemaFormDecoratorsProvider, sfPathProvider) {
    var stripNullType = function(type) {
       if (Array.isArray(type) && type.length == 2) {
         if (type[0] === 'null')
           return type[1];
         if (type[1] === 'null')
           return type[0];
       }
       return type;
     }    
      
    var picker = function(name, schema, options) {
    if ((stripNullType(schema.type) === 'string' || schema.type === 'number') && schema.format == 'datepicker') {
      var f = schemaFormProvider.stdFormObj(name, schema, options);
      f.key  = options.path;
      f.type = 'datepicker';
      options.lookup[sfPathProvider.stringify(options.path)] = f;
      return f;
    }
  };

    schemaFormProvider.defaults.string.unshift(picker);

  //Add to the bootstrap directive
    schemaFormDecoratorsProvider.addMapping('bootstrapDecorator', 'datepicker',
    'directives/decorators/bootstrap/strap/datepicker.html');
    schemaFormDecoratorsProvider.createDirective('datepicker',
    'directives/decorators/bootstrap/strap/datepicker.html');
  }]);
