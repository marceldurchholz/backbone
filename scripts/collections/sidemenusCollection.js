define(["jquery", "underscore", "Backbone"],
  function($, _, Backbone) {
	var SidemenuModel = Backbone.Model.extend({
		defaults: {
		  urloffline: "nothing",
		  userfriendly: "no text in here"
		}
	});
	var SidemenusCollection = Backbone.Collection.extend({
		url: 'http://s15944029.onlinehome-server.info:5000/sidemenu/?{"navmobile":true,"$sort":"seq"}',
		model: SidemenuModel,			
		initialize: function() {
			// console.log('initializing sidemenuCollection');
		},
		fetch: function(options) {
			// console.log('fetching SidemenuCollection');
			var responseObjectSidemenu = Backbone.Collection.prototype.fetch.call(this, options);
			return responseObjectSidemenu;
		},
		sync: function(method, model, options) {
			Backbone.sync.call(model, method, model, options);
		},
		parse: function(response, xhr) {
			for (n = 0; n < response.length; ++n) {
				var model = response[n];
				var access = 0;
				// if (checkAppConfigs(model.roles)==true) access = 1;
				if (access==0) if (checkRoles(model.roles)==true) access = 1;
				// console.log(model.userfriendly+' > '+access);
				if (access==1) if (checkAppConfigs(model.roles)==true) access = 1;
				// console.log(model.roles.toString());
				// console.log(this);
				if (access>0) this.add(new SidemenuModel(model));
				else this.remove(new SidemenuModel(model));
			}
			// console.log(this);
			return(this.models);
		}
	});
    return SidemenusCollection;
  }
);