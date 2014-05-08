define(['underscore', 'Backbone', 'text!views/dynamic/dynamicView.html', 'text!views/dynamic/blankView.html'], // 
    function (_, Backbone, DynamicViewTemplate, BlankViewTemplate) { // 

        var DynamicViewVar = Backbone.View.extend({

			// dynamicTemplate: _.template(DynamicViewTemplate),
			// blankTemplate: _.template(BlankViewTemplate),
			// el:'#container',
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize:function() {
				_this = this;
				$(this.el).undelegate('a', 'click');
				console.log('initialize DynamicView');
			},
			putTemplateContent: function() {
				console.log('putTemplateContent DynamicView');
				// console.log(_this.options.dynContent);
				console.log(_this.options);
				var output = _.template(_this.options.dynContent,{
					page_vars: _this.options
				}, {variable:'page_vars'});
				$(this.el).html(output);
				
			},
            render:function () {
				console.log('rendering DynamicView');
				// var _this = _this || this;
				var filePath = window.location.href.split('/').slice(0, -1).join('/')+'/';
				var fileUrl = filePath+'scripts/views/'+_this.options.hash+'/' + _this.options.viewName + '.html';
				var templateUrl = 'text!views/'+_this.options.hash+'/' + _this.options.viewName + '.html';
				var dynContent = 'no content yet';
				try {
					var fileExists = checkFileExists(fileUrl);
				} catch(e) {
					var fileExists = false;
				}
				console.log('fileExists is: '+fileExists);
				
				_this.options.dynContent = _this.options.model.get('dynContent');
				
				/*
				var old_fileExists = old_checkFileExists(fileUrl);
				console.log('old_fileExists');
				console.log(old_fileExists);
				*/
				
				// fileExists=false;
				var page_vars = _this.options;
				
				if (fileExists==true) {
					console.log('STATIC CONTENT !!!');
					
					/*
					$.ajax(window.dpd_server+'users/?kdnr='+window.system.kdnr,{
						type:"GET",
						async: false,
					}).done(function(result) {
						console.log('found');
						console.log(result);
					});
					*/

					/*
					var supportFileContent = '<div data-role="header" data-position="fixed"><a id="btnBack" href="#" data-icon="back" data-iconpos="left">Zurück</a><h1>BLANK SUPPORT VIEW <%= window.system.kdnr %></h1><a data-ajax="true" href="#panel_right" data-icon="gear" data-iconpos="notext">Prefs</a></div><div data-role="content"><strong>App-Informationen</strong><br></div>';
					_this.options.supportFileContent = _.template(supportFileContent, {page_vars:_this.options});
					_this.options.dynContent = _this.options.supportFileContent;
					_this.putTemplateContent();
					*/

					console.log('loading wrapper template '+templateUrl+ ' (if existing, in a function)');
					require([templateUrl], function(supportFileContent){
						_this.options.supportFileContent = _.template(supportFileContent, {page_vars:_this.options});
						_this.options.dynContent = _this.options.supportFileContent;
						_this.putTemplateContent();
					});

					
				}
				else {
					_this.options.dynContent = _.template(DynamicViewTemplate, {page_vars:_this.options});
					_this.putTemplateContent();
				}
				// _this.$el.trigger("create");
				return _this;
            }

        });

        return DynamicViewVar;
    });