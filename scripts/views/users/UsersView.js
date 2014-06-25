define(['underscore', 'Backbone', 'text!views/template/UsersView.html'],
    function (_, Backbone, UsersViewTemplate) {

        var UsersView = Backbone.View.extend({

			template: _.template(UsersViewTemplate),
			
			initialize: function() {
				_this = this;
				var streamData = new Array();
				_this.streamData = streamData;
			},
			
            events:{
                'click a':global_a_clickHandler,
                'click button':global_button_clickHandler,
            },
			
			fetch: function() {	
				_this = this;
			},
			bindEvents: function() {
				var _this = this;
				
				_this.$el.off( "swipeleft", ".swipetodeletetd").on( "swipeleft", ".swipetodeletetd", function( e ) {
					e.preventDefault();
					var _thisEl = $(this);
					var dbtype = $(this).attr('data-dbtype');
					if (dbtype=="user") {
						var userid = $(this).attr('data-userid');
						doConfirm('Möchten Sie diesen User wirklich löschen?', 'Wirklich löschen?', function (clickevent) { 
							if (clickevent=="1") {
								_this.deleteUser(_thisEl,userid);
							}
						}, "Ja,Nein");
					}
				});
			},
			deleteUser: function(_thisEl,userid) {
				showModal();
				dpd.users.put(userid, {"deleted":true}, function(result, err) {
					if(err) return console.log(err);
					_thisEl.remove();
					hideModal();
				});
			},
			
			render: function() {
				this.bindEvents();
				var _this = this;
				// _this.$el.html(_.template(userPage, {
				// 	data: _this.streamData
				// },{variable: 'users'}));
				$("#usersListView").listview({
				  autodividers: true,
				  autodividersSelector: function ( li ) {
					var rowTopic = li.data( "fullname" );
					var out = rowTopic;
					return out;
				  }
				});				
				this.$el.html(this.template(this.options));
				return this;
			}
			
			/*
            render:function () {
				console.log('rendering');
				this.$el.html(this.template(this.options));
				return this;
            }
			*/

        });

        return UsersView;
    });