define(['underscore', 'Backbone', 'text!views/test/TestView.html', 'views/test/TestNestedView', 'text!views/test/TestNestedView.html'],
    function (_, Backbone, TestViewTemplate, TestNestedView, TestNestedViewTemplate) {

        var TestView = Backbone.View.extend({

            events:{
                'click #btnBack':'btnBack_clickHandler'
            },
			
			initialize:function() {
				this.fetch();
			},
			fetch:function(){
				this.render();
			},
            render:function () {
                
				this.$el.html(_.template(TestViewTemplate));
				this.nestedView = new TestNestedView({}).render();
				console.log(this.nestedView.$el.html());
				this.$el.append(this.nestedView.$el.html());
				
				// this.$el.html('blafoopeng');
				// this._template = _.template(sidemenusList, {});
				// $('#sidebarListViewDiv').html(this._template);
				// $('#sidebarListViewDiv').html(this._.template(sidemenusList, {}));
                return this;
            },

            btnBack_clickHandler:function (event) {
                $.mobile.jqmNavigator.popView();
            }

        });

        return TestView;
    });