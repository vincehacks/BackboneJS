// Created by Vince Chang
$(function() {
  // Collection Data
  const items =[
    {
      "page-title": "Women's Dresses",
      "product-image": "https://slimages.macysassets.com/is/image/MCY/products/5/optimized/3903385_fpx.tif?op_sharpen=1&wid=1230&hei=1500&fit=fit,1&$filterxlrg$",
      "product-description": "Sure to make the best-dressed list! A delicate lace bodice, alluring keyhole detail and high slit make this Nightway halter gown a show-stopping piece.",
      "product-title": "Nightway Lace Halter Gown",
      "price":"$109"
    },
    {
      "page-title": "Women's Dresses",
      "product-image": "https://slimages.macysassets.com/is/image/MCY/products/3/optimized/9956073_fpx.tif?op_sharpen=1&wid=1230&hei=1500&fit=fit,1&$filterxlrg$",
      "product-description": "Updated with beauty of ruffled sleeves, this timeless Vince Camuto sheath dress works for all occasions.",
      "product-title": "Ruffle-Sleeve Sheath Dress",
      "price":"$138"
    }
  ];

  // Create a Backbone Model
  const ProductModel = Backbone.Model.extend({});

  // Create a Backbone Collection that holds different models === (items)
  const ProductCollection = Backbone.Collection.extend({
    model: ProductModel
  });

  // Create a new instance of that collection
  const productCollection = new ProductCollection(items);

  // Create a Backbone View to go with the Model
  // const ProductView = Backbone.View.extend({
  //   tagName: "div",
  //
  //   // This will happen automatically
  //   initialize() {
  //     this.render();
  //   },
  //   events:{
  //     "click #next-transaction" : "showShipping",
  //     "click #finish-transaction" : "showCheckout"
  //   },
  //   // Do this when NEXT button is clicked
  //   showShipping() {
  //     // Show Shipping form & hide the rest
  //     $('.shipping-info').attr("hidden", false);
  //
  //     // Grab the user's choices one at a time and append to recipt1
  //     let userChoices = ($("#choices").serializeArray());
  //     userChoices.forEach((e) => {
  //       $("#recipt1").append(`${e.name}: ${e.value}<br/>`);
  //     });
  //   },
  //   // Do this when FINISHED button is clicked
  //   showCheckout() {
  //     // Show checkout info & hide previous two sections
  //     $('.checkout').attr("hidden", false);
  //     $('.product-info').attr("hidden", true);
  //     $('.shipping-info').attr("hidden", true);
  //
  //     // Grab the user's shipping info one at a time and append to recipt2
  //     let shipInfo = ($(".shipping-info").serializeArray());
  //     shipInfo.forEach((e) => {
  //       $("#recipt2").append(`${e.name}: ${e.value}<br/>`);
  //     });
  //   },
  //   render(){
  //     // Using jquery and handlebars to recognize the template I placed in
  //     // my index.html file and dumps it into the div
  //     const source = $('#product-template').html();
  //     const template = Handlebars.compile(source);
  //     const html = template(this.model.toJSON());
  //     this.$el.html(html);
  //     return this;
  //   }
  // });

  // Create a new View that will call the individual view for each product
  // const MainView = Backbone.View.extend({
  //   // This is where to append the different items
  //   el: ".big-container",
  //
  //   render() {
  //     // Iterate through the collection and call ProductView to display items
  //     // For each item, append the new view to the "big-container div"
  //     this.collection.each((item) => {
  //       let view = new ProductView({model:item});
  //       this.$el.append(view.render().el);
  //     });
  //     return this;
  //   }
  // });
  //
  // // Create a new instance of the mainView and watch the magic happen!
  // const mainView = new MainView({
  //   collection: productCollection
  // });
  //
  // // Call the mainView's render()
  // mainView.render();




/******************************************************************************/


  // ProductView
  const ProductView = Backbone.View.extend({
    el: "#productView",
    initialize(){
      this.render();
    },
    render(){
      const source = $('#productViewTemplate').html();
      const template = Handlebars.compile(source);
      const html = template(this.model.toJSON());
      this.$el.html(html);
      // Why don't we return anything anymore? `return this`
    }
  });





  // ShippingView
  const ShippingView = Backbone.View.extend({
    el: "#shippingView",
    initialize(){
      this.render();
      this.showShipping();
    },
    events:{
      "click #finishButton" : "initializeCheckout"
    },
    render(){
      const source = $('#shippingViewTemplate').html();
      const template = Handlebars.compile(source);
      const html = template(this.model.toJSON());
      this.$el.html(html);
      // Why don't we return anything anymore? `return this`
    },
    // Do this when NEXT button is clicked
    showShipping() {
      // Show Shipping form & hide the rest
      $('.shipping-info').attr("hidden", false);

      // Grab the user's choices one at a time and append to recipt1
      let userChoices = ($("#choices").serializeArray());
      userChoices.forEach((e) => {
        $("#recipt1").append(`${e.name}: ${e.value}<br/>`);
      });
    },
    initializeCheckout(){
      const checkoutView = new CheckoutView();
    }
  });





  // CheckoutView
  const CheckoutView = Backbone.View.extend({
    el: "#checkoutView",
    initialize(){
      this.render();
      this.showCheckout();
    },
    render(){
      const source = $('#checkoutViewTemplate').html();
      const template = Handlebars.compile(source);
      const html = template(this.model.toJSON());
      this.$el.html(html);
      // Why don't we return anything anymore? `return this`
    },
    // Do this when FINISHED button is clicked
    showCheckout() {
      // Show checkout info & hide previous two sections
      $('.checkout').attr("hidden", false);
      $('.product-info').attr("hidden", true);
      $('.shipping-info').attr("hidden", true);

      // Grab the user's shipping info one at a time and append to recipt2
      let shipInfo = ($(".shipping-info").serializeArray());
      shipInfo.forEach((e) => {
        $("#recipt2").append(`${e.name}: ${e.value}<br/>`);
      });
    }
  });



  // Creating a main layout container that renders everything
  const MainView = Backbone.View.extend({
    el: "#mainViewTemplate",
    // Happens automatically once the instance is created
    intialize(){
      this.render();
      this.initializeCollection(); // ??????????????
      this.renderProductView();
      //this.listenTo("",callthisfunction)
    },
    events:{
      "click #nextButton" : "initializeShippingView"
    },
    render(){
      // Render the mainContainerTemplate
      const source = $('#mainContainerTemplate').html();
      const template = Handlebars.compile(source);
      const html = template(this.model.toJSON());
      this.$el.html(html);
      return this;
    },
    intializeCollection(){
      // Iterate through the collection and call ProductView to display items
      // For each item, append the new view to the "big-container div"
      this.collection.each((item) => {
        let view = new ProductView({model:item});
        this.$el.append(view.render().el);
        // this.renderProductView({model:item});
      });
      return this;
    },
    renderProductView(){
      const productView = new ProductView();
    },
    initializeShippingView(){
      const shippingView = new ShippingView();
    }
  });

  // Create an instance of the mainContainer that starts the whole project
  const mainView = new MainView(collection: productCollection);

});