/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'text!views/template/TemplateView.html', 'text!views/dynamic/blankView.html', 'text!views/home/HomeView.html'],
    function ($, _, Backbone, standardTemplate, blanktemplate, hometemplate) {
        var TemplateView = Backbone.View.extend({

			template: standardTemplate,
			blanktemplate: blanktemplate,
			hometemplate: hometemplate,
			
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
						// var _mytemplateContent = _.template('text!views/home/HomeView.html');
						// alert(homeTemplateContent);
						// alert(templateContent);
						// _this.$el.html(_.template(homeTemplateContent,{page_vars:_this.options}));
						var bla = _.template(templateContent,{page_vars:_this.options});
						_this.$el.html(_.template(bla,{page_vars:_this.options}));
					});
					// alert(mytemplate);
					// var bla = _.template(hometemplate,{page_vars:_this.options});
					// this.$el.html(_.template(bla,{page_vars:_this.options}));
					// alert(_this.options.templateUrl);
				}
				else {
					this.$el.html(_.template(standardTemplate,{page_vars:_this.options}));
				}
				this.trigger("create");
				return this;
				
				if (_this.options.dynContent && _this.options.dynContent!='') { }
				else _this.options.dynContent = '';
				if (!_this.options.templateUrl || _this.options.templateUrl=='') {
					_this.options.templateUrl = 'text!views/template/TemplateView.html';
					fileExists = false;
				}
				else fileExists = true;

				// if (_this.options.templateUrl)
				/*
				if (contentExists==false && fileExists==false) {
					_this.options.templateUrl = 'text!views/template/TemplateView.html';
					fileExists=true;
				}
				*/
				// console.log(fileExists);
				
				require([_this.options.templateUrl], function(wrapperContent) {
					_this.options.wrapperContent = wrapperContent;
					alert(wrapperContent);
					alert(_this.options.wrapperContent);
					// var page_vars = _this.options
					
					alert(_.template(_this.options.wrapperContent,{pageObject: _this.options}, {variable:'pageObject'}));
				});
				return(false);
				
				_this = this;
				if (fileExists==false) {
					alert(_this.options.dynContent);
					require([_this.options.templateUrl], function(wrapperContent) {
						var output = _.template(_this.options.dynContent,{
							pageObject: _this.options
						}, {variable:'pageObject'});
						$(_this.el).html(output);
						return _this;
					});
				}
				
				
				

			}

        });
        return TemplateView;
    });