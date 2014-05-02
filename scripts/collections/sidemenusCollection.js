define(["jquery", "underscore", "Backbone"],

  function($, _, Backbone) {

    // Creates a new Backbone Collection class object
	var SidemenusCollection = Backbone.Collection.extend({
		initialize: function(models, options) {
			this.options = options || {};
		},
		fetch: function(options) {
		},
		sync: function(method, model, options) {
		},
		parse: function(responseSidemenu) {
		}
	});

    // Returns the Model class
    return SidemenusCollection;

  }

);