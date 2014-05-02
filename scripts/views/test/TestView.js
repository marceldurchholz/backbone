define(['underscore', 'Backbone', 'collections/sidemenusCollection', 'text!views/test/TestView.html', 'views/test/TestNestedView', 'text!views/test/TestNestedView.html'],
    function (_, Backbone, sidemenusCollection, TestViewTemplate, TestNestedView, TestNestedViewTemplate) {

        var TestView = Backbone.View.extend({

			el: "#sidr-left",
            events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				// $.mobile.jqmNavigator.pushView(new TestNestedView);
				$.sidr('close', 'sidr-left');
				// console.log(this.$el);
				return(false);
            },
			
			initialize:function() {
                $(this.el).undelegate('a', 'click');
				this.fetch();
			},
			fetch:function(){
				this.render();
			},
            render:function () {
				// console.log(this.$el.html());
				this.$el.html(_.template(TestViewTemplate));
				this.nestedView = new TestNestedView({}).render();
				// console.log(this.nestedView.$el.html());
				// this.$el.append(this.nestedView.$el.html());
				
				// this.$el.html('blafoopeng');
				// this._template = _.template(sidemenusList, {});
				// $('#sidebarListViewDiv').html(this._template);
				// $('#sidebarListViewDiv').html(this._.template(sidemenusList, {}));
                return this;
            }

        });

        return TestView;
    });