define(['underscore', 'Backbone', 'text!views/template/VideosView.html'],
    function (_, Backbone, VideosViewTemplate) {

        var VideosView = Backbone.View.extend({

			template: _.template(VideosViewTemplate),
			
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
				this.$el.off('click','.showVideoDetailsLink').on('click','.showVideoDetailsLink',function(event){
					event.preventDefault();
				});
				
				_this.$el.off( "swipeleft", ".swipetodeletetd").on( "swipeleft", ".swipetodeletetd", function( e ) {
					e.preventDefault();
					var _thisEl = $(this);
					var dbtype = $(this).attr('data-dbtype');
					if (dbtype=="card") {
						var cardsetid = $(this).attr('data-cardsetid');
						doConfirm('Möchten Sie dieses Lernset wirklich löschen?', 'Wirklich löschen?', function (clickevent) { 
							if (clickevent=="1") {
								_this.deleteCardset(_thisEl,cardsetid);
							}
						}, "Ja,Nein");
					}
					if (dbtype=="video") {
						var videoid = $(this).attr('data-videoid');
						doConfirm('Möchten Sie dieses Video wirklich löschen?', 'Wirklich löschen?', function (clickevent) { 
							if (clickevent=="1") {
								_this.deleteVideo(_thisEl,videoid);
							}
						}, "Ja,Nein");
					}
				});
			},
			deleteVideo: function(_thisEl,videoid) {
				showModal();
				dpd.videos.put(videoid, {"deleted":true}, function(result, err) {
					if(err) return console.log(err);
					_thisEl.remove();
					hideModal();
				});
			},
			
			render: function() {
				this.bindEvents();
				var _this = this;
				_this.$el.html(_.template(videoPage, {
					data: _this.streamData
				},{variable: 'videos'}));
				$("#videosListView").listview({
				  autodividers: true,
				  autodividersSelector: function ( li ) {
					var rowTopic = li.data( "topic" );
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

        return VideosView;
    });