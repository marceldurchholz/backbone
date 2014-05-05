define(["jquery", "underscore", "Backbone"],

  function($, _, Backbone) {

	var SidemenuModel = Backbone.Model.extend({
		defaults: {
		  // name: "Harry Potter"
		}
	});
	
    // Creates a new Backbone Collection class object
	var SidemenusCollection = Backbone.Collection.extend({
	
		url: 'http://dominik-lohmann.de:5000/sidemenu/?{"navmobile":"true","$sort":"seq"}',
		model: SidemenuModel,
			
		initialize: function() {
			// nottting...
		},
		fetch: function(options) {
			// console.log('* fetching');
			var responseObjectSidemenu = Backbone.Collection.prototype.fetch.call(this, options);
			return responseObjectSidemenu;
		},

		sync: function(method, model, options) {
			// console.log('* syncing');
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(responseObject,response) {
			// console.log('* parsing');
			// console.log(this);
			// console.log(responseObject);
			// console.log(response);
			
			var _collection = this;
			_collection.models = [];
			for (n = 0; n < responseObject.length; ++n) {
				model = responseObject[n];
				var access = false;
				
				if (checkAppConfigs(model.roles)==true) access = true;
				if (access==false) if (checkRoles(model.roles)==true) access = true;
				
				if (access==false) {
					// _collection.add(model);
					_collection.remove(model);
				}

			}
			
			return(responseObject);
		}

	});

    // Returns the Model class
    return SidemenusCollection;

  }

);