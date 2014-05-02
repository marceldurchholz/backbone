define(['underscore', 'Backbone', 'text!views/next/NextView.html'],
    function (_, Backbone, NextViewTemplate) {

        var NextView = Backbone.View.extend({

            events:{
                'click #btnBack':'btnBack_clickHandler'
            },

            render:function () {
                this.$el.html(_.template(NextViewTemplate));
                return this;
            },

            btnBack_clickHandler:function (event) {
                $.mobile.jqmNavigator.popView();
            }

        });

        return NextView;
    });