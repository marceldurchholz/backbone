define(['underscore', 'Backbone', 'collections/sidemenusCollection', 'text!views/test/TestView.html', 'views/test/TestNestedView'],
    function (_, Backbone, sidemenusCollection, TestViewTemplate, TestNestedView) {

        var TestView = Backbone.View.extend({

			el: "#sidr-left",
			template: _.template(TestViewTemplate),
			tagName: 'ul',
			className: 'nav nav-list lists-nav',
			collection: new sidemenusCollection(),
			// model: new Backbone.Model.extend({defaults: {userfriendly: "No Menu Yet"}}),
            events:{
                'click a':'a_clickHandler'
            },
            a_clickHandler:function (event) {
				event.preventDefault();
				$.sidr('close', 'sidr-left');
				return(false);
            },
			doit: function() {
				alert('do_something');
			},
			sidemenusAll:function() {
				console.log('sidemenusAll');
			},
			initialize:function() {
				$(this.el).undelegate('a', 'click');
				this.collection.fetch();
				this.collection.on("add", this.sidemenusAll, this);
				this.collection.on("remove", this.sidemenusAll, this);
				this.collection.on("reset", this.render, this);
			},
			fetch:function(a,b) {
                this.render();
                // this.render();
			},
            render:function () {
				console.log('rendering TestViewSecond');
				
				/*
				// das hier später "vorlagern" 
				var sidemenusHtmlContent = _.template(TestViewTemplate, {
					sidemenus: this.collection
				},{variable: 'data'});
				$('#sidr-left').append(sidemenusHtmlContent);
				*/
				
				var $el = $(this.el);

				this.collection.each(function(list) {
					var item, sidebarItem;
					item = new TestNestedView({ model: list });
					$el.append(item.render().el);
				});
				
				// this.nestedView = new TestNestedView({model:this.collection}).render();

				// this.nestedView = new TestNestedView({model:this.collection}).render();
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