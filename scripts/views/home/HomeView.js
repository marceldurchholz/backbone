/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'text!views/home/HomeView.html'],
    function ($, _, Backbone, HomeViewTemplate) {
        var HomeView = Backbone.View.extend({

            events:{
                'click #btnNextView':'btnNextView_clickHandler'
            },

            render:function () {
                this.$el.html(_.template(HomeViewTemplate));
                return this;
            }

        });
        return HomeView;
    });