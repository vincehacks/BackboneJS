$(function() {

  // Collection Data
  var items =[
    {
      "page-title": "Women's Dresses",
      "product-image": "https://slimages.macysassets.com/is/image/MCY/products/5/optimized/3903385_fpx.tif?op_sharpen=1&wid=1230&hei=1500&fit=fit,1&$filterxlrg$",
      "product-description": "Sure to make the best-dressed list! A delicate lace bodice, alluring keyhole detail and high slit make this Nightway halter gown a show-stopping piece.",
      "product-title": "Nightway Lace Halter Gown",
      "price":"$109",
      "size": "small",
      "color": "red",
      "quantity": "1"
    }
  ];

  // Create a Backbone Model
  var ProductModel = Backbone.Model.extend({});

  // Create a Backbone Collection that holds different models === (items)
  var ProductCollection = Backbone.Collection.extend({
    model: ProductModel
  });

  // Create a new instance of that collection
  var productCollection = new ProductCollection(items);

  // Create a Backbone View to go with the Model
  var ProductView = Backbone.View.extend({
    tagName: "div",

    // This will happen automatically
    initialize: function(){
      this.render();
    },
    render: function(){
      // Using jquery and handlebars to recognize the template I placed in
      // my index.html file and dumps it into the div
      var source = $('#product-template').html();
      var template = Handlebars.compile(source);
      var html = template(this.model.toJSON());
      this.$el.html(html);
      return this;
    }
  });


  // Create a new View that will call the individual view for each product
  var MainView = Backbone.View.extend({
    // This is where to append the different items
    el: ".big-container",

    render: function(){
      // Iterate through the collection and call ProductView to display items
      // For each item, append the new view to the "big-container div"
      this.collection.each((item) => {
        let view = new ProductView({model:item});
        this.$el.append(view.render().el);
      });
      return this;
    }
  });

  // Create a new instance of the mainView and watch the magic happen!
  var mainView = new MainView({
    collection: productCollection
  });

  // Call the mainView's render()
  mainView.render();
});