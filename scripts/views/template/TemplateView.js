/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'text!views/template/TemplateView.html'],
    function ($, _, Backbone, TemplateViewTemplate) {
        var TemplateView = Backbone.View.extend({

			events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			initialize:function() {
				_this = this;
				$(this.el).undelegate('a', 'click');
			},
			putTemplateContent: function() {
				var output = _.template(_this.options.dynContent,{
					page_vars: _this.options
				}, {variable:'page_vars'});
				$(this.el).html(output);
				
			},
            render:function () {
				var page_vars = _this.options;
                this.$el.html(_.template(TemplateViewTemplate));
                return this;
				/*
				_this.options.dynContent = _this.options.model.get('dynContent');
				_this.options.templateUrl = _this.options.model.get('templateUrl');
				
				if (_this.options.dynContent && _this.options.dynContent!='') contentExists = true;
				else contentExists = false;
				if (_this.options.templateUrl && _this.options.templateUrl!='') fileExists = true;
				else fileExists = false;
				if (contentExists==false && fileExists==false) {
					_this.options.templateUrl = 'text!views/dynamic/DynamicView.html';
					fileExists=true;
				}
				
				if (fileExists==false) {
					var output = _.template(_this.options.dynContent,{
						page_vars: _this.options
					}, {variable:'page_vars'});
					$(this.el).html(output);
				}
				else {
					require([_this.options.templateUrl], function(wrapperContent) {
						var _wrapperContent = wrapperContent;
						var dynContent = _.template(_wrapperContent,{
							page_vars: _this.options,
							myvar: 'foo'
						});
						var finalContent = _.template(dynContent,{
							page_vars: _this.options,
							myvar: 'foo'
						});
						$(_this.el).html(finalContent);
					});
				}
				return _this;
				*/
            }

        });
        return TemplateView;
    });