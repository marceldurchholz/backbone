/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'text!views/template/TemplateView.html'],
    function ($, _, Backbone, standardTemplate) {
        var TemplateView = Backbone.View.extend({

			template: standardTemplate,
			
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
					pageObject: _this.options
				}, {variable:'pageObject'});
				$(this.el).html(output);
				
			},
            render:function () {
				_this = this;
				var pageObject = _this.options;

				_this.options.dynContent = _this.options.model.get('dynContent');
				_this.options.templateUrl = _this.options.model.get('templateUrl');
				
				// alert(_this.options.templateUrl);
				if (_this.options.templateUrl && _this.options.templateUrl!='') {
					fileExists = true;
				}
				else {
					fileExists = false;
				}
				
				if (fileExists==true) {
					// alert('true');
					require([_this.options.templateUrl], function(templateContent) {
						var bla = _.template(templateContent,{page_vars:_this.options});
						var foo = _.template(bla,{page_vars:_this.options});
						_this.$el.html(foo);
					});
				}
				else {
					var bla = _.template(standardTemplate,{page_vars:_this.options});
					var foo = _.template(bla,{page_vars:_this.options});
					_this.$el.html(foo);
				}
				
				return this;
			}

        });
        return TemplateView;
    });