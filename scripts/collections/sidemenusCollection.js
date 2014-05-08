define(["jquery", "underscore", "Backbone"],

  function($, _, Backbone) {

	var SidemenuModel = Backbone.Model.extend({
		defaults: {
		  // name: "Harry Potter"
		}
	});
	
    // Creates a new Backbone Collection class object
	var SidemenusCollection = Backbone.Collection.extend({
	
		url: 'http://dominik-lohmann.de:5000/sidemenu/?{"navoffline":"true","$sort":"seq"}',
		model: SidemenuModel

	});

    // Returns the Model class
    return SidemenusCollection;

  }

);