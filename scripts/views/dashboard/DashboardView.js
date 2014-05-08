define(['underscore', 'Backbone', 'text!views/dashboard/DashboardView.html'],
    function (_, Backbone, DashboardViewTemplate) {

        var DashboardView = Backbone.View.extend({

			template: _.template(DashboardViewTemplate),
			
            events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				window.myrouter.checkLink(event);
            },
			initialize: function() {
				this.fetch();
			},
			fetch: function() {
				console.log('fetching');
			},
            render:function () {
				console.log('rendering');
				this.$el.html(this.template(this.options));
				return this;
            }

            /*
			btnBack_clickHandler:function (event) {
				event.preventDefault();
                $.mobile.jqmNavigator.popView();
				return(false);
            }
			*/

        });

        return DashboardView;
    });