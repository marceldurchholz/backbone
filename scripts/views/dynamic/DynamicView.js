define(['underscore', 'Backbone', 'text!views/dynamic/DynamicView.html'], // 
    function (_, Backbone, DynamicViewTemplate) { // 

        var DynamicViewVar = Backbone.View.extend({

			template: _.template(DynamicViewTemplate),
			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize:function() {
				$(this.el).undelegate('a', 'click');
			},
            render:function () {
				var _this = this;
				var filePath = window.location.href.split('/').slice(0, -1).join('/')+'/';
				var fileUrl = filePath+'scripts/views/dynamic/' + this.options.viewName + '.html';
				var templateUrl = 'text!views/dynamic/' + this.options.viewName + '.html';
				var dynContent = '';
				try {
					var fileExists = checkFileExists(fileUrl);
				} catch(e) {
					var fileExists = false;
				}
				
				if (fileExists==true) {
					require([templateUrl], function(dynContent){
						_this.options.dynContent = dynContent;
						_this.$el.html(_this.template({
							page_vars: _this.options
						}, {variable:'page_vars'}));
						_this.$el.trigger("create");
					});
				}
				else {
					var pageObject = _this.options;
					_this.options.dynContent = _this.options.model.get('dynContent');
					_this.$el.html(_this.template({
						page_vars: _this.options
					}, {variable:'page_vars'}));
				}
				
				return this;
            }

        });

        return DynamicViewVar;
    });