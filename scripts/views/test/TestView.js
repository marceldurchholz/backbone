define(['underscore', 'Backbone', 'collections/sidemenusCollection', 'text!views/test/TestView.html', 'views/test/TestViewUl'],
    function (_, Backbone, sidemenusCollection, TestViewTemplate, TestViewUl) {

        var TestViewVar = Backbone.View.extend({

			el: "#sidr-left",
			// template: _.template(TestViewTemplate),

			collection: new sidemenusCollection(),
			events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				window.myrouter.gotoRoute($(event.currentTarget).attr('href').substring(1));
				return(false);
            },
			initialize:function() {
				$(this.el).undelegate('a', 'click');
				this.collection.fetch();
				// this.collection.on("add", this.sidemenusAll, this);
				// this.collection.on("remove", this.sidemenusAll, this);
				this.collection.on("reset", this.render, this);
			},
			fetch:function(a,b) {
                // this.render();
			},
            render:function () {
				console.log('rendering TestView');
				var $el = $(this.el);
				var item = new TestViewUl({collection:this.collection}).render().el;
				var sidemenusHtmlContent = _.template(TestViewTemplate, {
					outerHTML: item.outerHTML
				},{variable: 'item'});
				$el.html(sidemenusHtmlContent);
                return this;
            }

        });

        return TestViewVar;
    });