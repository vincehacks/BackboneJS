$(function() {

  var LicensePlate = Backbone.Model.extend({});

  var LicensePlateView = Marionette.View.extend({
    template: '#plate-template',
    events: {
      "click .btn": "addToCart"
    },
    addToCart: function(){
      console.log("Adding to cart "+ this.model.get('title'));
      var cartItem = new CartItem(this.model.attributes);
      cartItem.save();
    }
  });

  var LicensePlateList = Backbone.Collection.extend({
    model: LicensePlate,
    url: '/data'
  });

  var plateList = new LicensePlateList();

  // Creating a new Marionette View
  var StoreView = Marionette.CollectionView.extend({
    childView: LicensePlateView
  });

  // Creating a Marionette App
  var App = Marionette.Application.extend({
    // This is where to put the code...in the container this is I want to load
    region: '#container',
    // Calls the Marionette View
    onStart: function() {
      this.showView(new StoreView({collection:plateList}));
      plateList.fetch();
    }
  })

  var app = new App();
  app.start();

});