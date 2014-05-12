/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'text!views/template/TemplateView.html', 'text!views/template/HomeView.html', 'text!views/template/BlankView.html', 'text!views/template/SupportView.html', 'text!views/template/DashboardView.html'],
    function ($, _, Backbone, standardTemplate, homeTemplate, blankTemplate, supportTemplate, dashboardTemplate) {
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
					pageObject: _this.options
				}, {variable:'pageObject'});
				$(this.el).html(output);
				
			},
            render:function () {
				_this = this;
				var pageObject = _this.options;

				/*
				if (_this.options.dynContent==undefined) _this.options.dynContent='';
				else _this.options.dynContent = _this.options.model.get('dynContent');
				if (_this.options.templateUrl==undefined) _this.options.templateUrl='';
				else _this.options.templateUrl = _this.options.model.get('templateUrl');
				*/
				
				// alert('START');
				// alert('doing templateview.js');
				// alert(_this.options.model.get('templateUrl'));
				
				// var _foundTemplateContent = "";
				// alert('finding template: '+homeTemplate);
				try {
					// alert('1');
					var found = true;
					// alert(_this.options.model.get('templateUrl'));
					// if (_this.options.dynContent==undefined) _this.options.dynContent='';
					_this.options.dynContent = _.template(_this.options.model.get('dynContent'),{page_vars:_this.options});
					require([_this.options.model.get('templateUrl')], function(_foundTemplateContent) {
						var _finalContent = _.template(_foundTemplateContent,{page_vars:_this.options});
						_this.$el.html(_finalContent);
						return _this;
					});
					// alert('3');
				} catch (e) {
					// alert('2');
					var found = false;
					// console.log(e);
					require(['text!views/template/TemplateView.html'], function(_foundTemplateContent) {
						var _finalContent = _.template(_foundTemplateContent,{page_vars:_this.options});
						_this.$el.html(_finalContent);
						return _this;
					});
				} finally {
					// ...
					// alert(found);
				}
				
				// return _this;

				
				
				/*
				// alert(_this.options.templateUrl);
				if (_this.options.templateUrl && _this.options.templateUrl!='') {
					dbWrapperTemplateExists = true;
				}
				else {
					dbWrapperTemplateExists = false;
				}
				
				if (dbWrapperTemplateExists==true) {
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
				*/
				
			}

        });
        return TemplateView;
    });