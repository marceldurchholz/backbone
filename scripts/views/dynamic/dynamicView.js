/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'text!views/dynamic/DynamicView.html'],
    function ($, _, Backbone, DynamicViewTemplate) {

        var DynamicView = Backbone.View.extend({

            render:function () {
                this.$el.html(_.template(DynamicViewTemplate));
                return this;
            }


        });

        return DynamicView;
    });