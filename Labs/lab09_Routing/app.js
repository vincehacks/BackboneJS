$(function() {

    var LicensePlate = Backbone.Model.extend({});

    // Create a router that has 2 route definitions
    var Router = Backbone.Router.extend({
      routes: {
       "store": "viewStore",
       "cart": "viewCart",
      },
      viewStore: function () {
        console.log("STORE");
        appView = new appView({collection : plateList});
      },
      viewCart: function() {
        console.log("CART");
        appView = appView({collection: cartList});
      }
    }

    // Create a new router and make sure the history is set!
    var router = new Router();
    Backbone.history.start();

    var LicensePlateView = Backbone.View.extend({
        tagName:  "div",
        attributes: {class: 'col-md-4', style: 'margin-top: 40px'},
        initialize: function () {
            this.render();
        },
        render: function () {
            var source = $('#plate-template').html();
            var template = Handlebars.compile(source);
            var html = template(this.model.toJSON());
            this.$el.html(html);
            return this;
        }
    });

    var LicensePlateList = Backbone.Collection.extend({
        model: LicensePlate,
        url: '/data'
    });

    // This one is the exact same as LicensePlateList, so just extened it to
    // overwrite the url!
    var CartList = LicensePlateList.extend({
        url: '/cartContents'
    });

    // Create both a plateList and cartList
    var plateList = new LicensePlateList();
    var cartList = new CartList();

    var AppView = Backbone.View.extend({

        el: "#container",

        initialize: function () {
            this.listenTo(plateList, "add", this.addPlate);
            plateList.fetch();
        },
        addPlate: function(plate) {
            let model = new LicensePlateView({model: plate});
            this.$el.append(model.render().el);
        }

    });

    var app = new AppView();

});