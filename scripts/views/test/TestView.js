define(['underscore', 'Backbone', 'text!views/test/TestView.html', 'views/test/TestNestedView', 'text!views/test/TestNestedView.html'],
    function (_, Backbone, TestViewTemplate, TestNestedView, TestNestedViewTemplate) {

        var TestView = Backbone.View.extend({

			el: "#sidr-left",
			
			initialize:function() {
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