/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'text!views/template/TemplateView.html', 'text!views/template/VideoDetailsView.html', 'text!views/template/BlueTemplateView.html', 'text!views/template/HomeView.html', 'text!views/template/BlankView.html', 'text!views/template/SupportView.html', 'text!views/template/DashboardView.html', 'text!views/template/VideosView.html'],
    function ($, _, Backbone, standardTemplate, videodetailsTemplate, bluestandardTemplate, homeTemplate, blankTemplate, supportTemplate, dashboardTemplate, videosTemplate) {
        var TemplateView = Backbone.View.extend({

			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize:function() {
				_this = this;
				$(this.el).undelegate('a', 'click');
				
				/* streamdata getter part */
				// _this.bla = "foo";
				_this.streamData = new Array();
				_this.uploaderArray = new Array();
				// window.me.id = "042cb1572ffbea5d";
				$.ajax({
					url: "http://dominik-lohmann.de:5000/users/"+window.me.id,
					async: false
				}).done(function(me) {
					// alert(me.id);
					window.me = me;
					if (window.me.interests == undefined) window.me.interests = new Array();
				});
				
				
				if (_this.options.hash=='learningstream') {
					_this.collectStreamData();
				}
				else if (_this.options.hash=='videos') {
					_this.collectVideosData();
				}
				else if (_this.options.hash=='videodetails') {
					_this.collectVideoDetailsData();
				}
				else {
					// alert(_this.options.hash);
				}
				
				
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
				_this.options.stream_data = _this.streamData;
				// _this.render();

				
			},
			
			collectStreamData: function() {
				_this.collectVideosData();
				_this.collectCardData();			
			},
			
			collectVideoDetailsData: function() {
				var _this = this;
			},
			
			collectVideosData: function() {
				var _this = this;

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
			},

			collectCardData: function() {
				var _this = this;
								
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
			},
			
            render:function () {
				_this = this;
				try {
					var found = true;
					_this.options.dynContent = _.template(_this.options.model.get('dynContent'),{page_vars:_this.options});
					require([_this.options.model.get('templateUrl')], function(_foundTemplateContent) {
						var _finalContent = _.template(_foundTemplateContent,{page_vars:_this.options});
						_this.$el.html(_finalContent);
						return _this;
					});
				} catch (e) {
					var found = false;
					require(['text!views/template/TemplateView.html'], function(_foundTemplateContent) {
						var _finalContent = _.template(_foundTemplateContent,{page_vars:_this.options});
						_this.$el.html(_finalContent);
						return _this;
					});
				} finally {
				}
			}

        });
        return TemplateView;
    });