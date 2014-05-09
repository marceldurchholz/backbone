/**
 * Created by Piotr Walczyszyn (outof.me | @pwalczyszyn)
 *
 * User: pwalczys
 * Date: 2/16/12
 * Time: 9:53 AM
 */

define(['jquery', 'underscore', 'Backbone', 'text!views/template/TemplateView.html'],
    function ($, _, Backbone, TemplateViewTemplate) {
        var TemplateView = Backbone.View.extend({

            events:{
                'click #btnNextView':'btnNextView_clickHandler'
            },

            render:function () {
                this.$el.html(_.template(TemplateViewTemplate));
                return this;
            }

        });
        return TemplateView;
    });