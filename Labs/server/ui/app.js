$(function() {

  var LicensePlate = Backbone.Model.extend({});

  // Creating a new CartItem MODEL
  var CartItem = Backbone.Model.extend({
    url: '/cart'
  });

  var LicensePlateView = Backbone.View.extend({
    tagName:  "div",
    attributes: {class: 'col-md-4', style: 'margin-top: 40px'},
    // Create a new cart event
    events: {
      "click #buttonClick" : "newCartItem",
    },
    newCartItem: function() {
      var newCart = new CartItem(this.model.attributes);
      newCart.save();
    },
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

  var plateList = new LicensePlateList();

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