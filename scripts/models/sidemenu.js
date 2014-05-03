// Filename: models/project
define([
  '_',
  'Backbone'
], function(_, Backbone){
  var sidemenuModel = Backbone.Model.extend({
    defaults: {
      name: "Harry Potter"
    }
  });
  // Return the model for the module
  return sidemenuModel;
});