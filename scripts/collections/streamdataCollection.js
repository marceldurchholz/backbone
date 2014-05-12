define(["jquery", "underscore", "Backbone"],
  function($, _, Backbone) {
	var streamdataModel = Backbone.Model.extend({
		defaults: {
		  urloffline: "nothing",
		  userfriendly: "no text in here"
		}
	});
	var streamdataCollection = Backbone.Collection.extend({
		url: 'http://dominik-lohmann.de:5000/videos/',
		model: streamdataModel,			
		initialize: function() {
			// console.log('initializing sidemenuCollection');
		},
		fetch: function(options) {
			/*
			var _this = this;
			var streamData = new Array();
			_this.streamData = streamData;
			
			window.me.id = "042cb1572ffbea5d";
			
			$.ajax({
				url: "http://dominik-lohmann.de:5000/users/"+window.me.id,
				async: false
			}).done(function(me) {
				// alert(me.id);
				window.me = me;
				if (window.me.interests == undefined) window.me.interests = new Array();
			});
			
			var requestUrl = "http://dominik-lohmann.de:5000/videos?active=true&deleted=false";
			if (window.system.master!=true) requestUrl = requestUrl + "&uploader="+window.system.aoid;
			$.ajax({
				url: requestUrl,
				async: false
			}).done(function(videoData) {
				// console.log(videoData);
				_this.uploaderArray = new Array();
				_.each(videoData, function(value, index, list) {
					var exists = $.inArray( value.topic, window.me.interests );
					if (window.me.interests.length==0) exists=1;
					if (value.usergroups == undefined) value.usergroups = new Array();
					if (window.me.usergroups == undefined) window.me.usergroups = new Array();
					if (value.usergroups.length>0) {
						exists=0;
						$.each( value.usergroups, function( key, role ) {
							$.each( window.me.usergroups, function( keyme, valueme ) {
								if (role==valueme) {
									exists=1;
									return(false);
								}
							});
						});
					}

					if (value.uploader == window.me.id) exists=1;
					if (exists>0) {
						value.ccat = 'video';
						value.icon = 'images/icon-multimedia-60.png';
						value.href = '#videos/details/view/'+value.id;
						
						var uploader = value.uploader;
						if (_this.uploaderArray[uploader]==undefined) {
							$.ajax({
								url: 'http://dominik-lohmann.de:5000/users/?id='+uploader,
								async: false,
								success: function(data, textStatus, XMLHttpRequest) {
									value.uploaderdata = data;
									_this.uploaderArray[data.id]==data;
								},
								error:function (xhr, ajaxOptions, thrownError) {
									// console.log(xhr.responseText);
								}
							});
						}
						else {
							value.uploaderdata = _this.uploaderArray[uploader];
						}
						
						if ((window.system.master==true && value.public==true) || window.system.master==false) { 
							_this.streamData.push(value);
						}
					}
					
				});
			});
			
			var requestUrl = "http://dominik-lohmann.de:5000/cards?active=true&deleted=false";
			if (window.system.master!=true) requestUrl = requestUrl + "&uploader="+window.system.aoid;
			$.ajax({
				url: requestUrl,
				async: false
			}).done(function(cardData) {
				// console.log(cardData);
				_.each(cardData, function(value, index, list) {
					var exists = $.inArray( value.topic, window.me.interests );
					if (window.me.interests.length==0) exists=1;
					
					if (value.usergroups == undefined) value.usergroups = new Array();
					if (window.me.usergroups == undefined) window.me.usergroups = new Array();
					if (value.usergroups.length>0) {
						exists=0;
						$.each( value.usergroups, function( key, role ) {
							$.each( window.me.usergroups, function( keyme, valueme ) {
								if (role==valueme) {
									exists=1;
									return(false);
								}
							});
						});
					}
					
					if (value.uploader == window.me.id) exists=1;
					
					if (exists>0) {
						value.ccat = 'card';
						value.icon = 'images/icon-cards-60.png';
						value.href = '#cards/details/view/'+value.id;
						
						var uploader = value.uploader;
						if (_this.uploaderArray[uploader]==undefined) {
							$.ajax({
								url: 'http://dominik-lohmann.de:5000/users/?id='+uploader,
								async: false,
								success: function(data, textStatus, XMLHttpRequest) {
									value.uploaderdata = data;
									_this.uploaderArray[data.id]==data;
								},
								error:function (xhr, ajaxOptions, thrownError) {
									// console.log(xhr.responseText);
								}
							});
						}
						else {
							value.uploaderdata = _this.uploaderArray[uploader];
						}

						
						if ((window.system.master==true && value.public==true) || window.system.master==false) { 
							_this.streamData.push(value);
						}
					}
				});
			});
			if (_this.streamData.length==0) {
				var value = new Object();
				value.ccat = 'plan';
				value.icon = 'images/avatar.jpg';
				value.href = '#myprofile';
				value.title = 'Noch keine Inhalte!';
				value.topic = 'Bitte Interessen auswählen...';
				value.description = ' Klicken Sie hier um auf Ihre Profileinstellungen zu gelangen...';
				value.uploaderdata = new Array();
				_this.streamData.push(value);
			}
			// Sort multidimensional arrays with oobjects by value 
			// http://www.javascriptkit.com/javatutors/arraysort2.shtml
			_this.streamData.sort(function(a, b){
				return b.cdate-a.cdate
			});
			// _this.options.stream_data = _this.streamData;
			// _this.render();
			alert('triggering');
			this.trigger("reset");
			return(_this.streamData);
			// console.log('fetching SidemenuCollection');
			// var responseObjectSidemenu = Backbone.Collection.prototype.fetch.call(this, options);
			// return responseObjectSidemenu;
			*/
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
			return(this.models);
		}
	});
    return streamdataCollection;
  }
);