// Created by Vince Chang
(function(){
  /*****************************************************************************
  * Backbone collection that holds information for each dress that is rendered *
  *****************************************************************************/
  const items =[
    {
      "product-title": "Nightway Lace Halter Gown",
      "product-image": "https://tinyurl.com/y9j7b9so",
      "product-description": "Sure to make the best-dressed list! A delicate " +
      "lace bodice, alluring keyhole detail and high slit make this Nightway " +
      " halter gown a show-stopping piece.",
      "price":"$109"
    },
    {
      "product-title": "Ruffle-Sleeve Sheath Dress",
      "product-image": "https://tinyurl.com/yas3aps3",
      "product-description": "Updated with beauty of ruffled sleeves, this " +
      " timeless Vince Camuto sheath dress works for all occasions.",
      "price":"$138"
    }
  ];

  const channel = _.extend({}, Backbone.Events);

  // Created a Backbone Model
  const ProductModel = Backbone.Model.extend({});

  // Created a Backbone Collection that holds different models which are items
  const ProductCollection = Backbone.Collection.extend({
    model: ProductModel
  });

  // Created a new instance of the collection and pass in my items as the model
  const productCollection = new ProductCollection(items);

  /*****************************************************************************
  * Name: ProductView
  * Parameters: Backbone collection
  * Description: Once an instance of ProductView is instantiated, the render()
  * will compile the #productViewTemplate. Each item that is in my passed in
  * collection will be appened to #productView
  * Flow: Called in MainView
  *****************************************************************************/
  const ProductView = Backbone.View.extend({
    el: "#productView",
    initialize(){
      // Using Backbone channel to retrieve item selection from the user
      channel.on('testChannel', this.getCollectionData.bind(this));
      this.render();
    },
    render(){
      const source = $('#productViewTemplate').html();
      // Good place to check if the template was undefined or not
      const template = Handlebars.compile(source);



      // Iterate through collection of dresses and append items to #productView
      this.collection.each((item) => {
        this.$el.append(template(item.toJSON()));
      });
      return this;
    },
    /* getCollectionData() will  */
    getCollectionData(){
      console.log("productView");
       channel.trigger("testdata",this.collection.toJSON());
    }

    });

  /*****************************************************************************
  * Name: ShippingView
  * Parameters: None
  * Description: Once an instance of ShippingView is instantiated, the render()
  * will compile the #shippingViewTemplate, call showShipping(), and also listen
  * for the finishButton to be clicked
  * Flow: called when nextButton is clicked in MainView
  *****************************************************************************/
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
      this.$el.html(template);
    },
    /* showShipping() will hide the nextButton and productView then will record
     * user selected product information into #recept1 */
    showShipping() {
      $('.product-info').attr("hidden", true);
      $('#nextButtonFlag').attr("hidden", true);
      $('.shipping-info').attr("hidden", false);

      // Grab the user's choices one at a time and append to recipt1
      let userChoices = ($(".choices").serializeArray());
      userChoices.forEach((e) => {
        $("#recipt1").append(`${e.name}: ${e.value}<br/>`);
      });
    },
    /* Once the user clicks on the finishButton, this function executes and
     * instantiates a new instance of CheckoutView */
    initializeCheckout(){
      const checkoutView = new CheckoutView();
      // $('#recipt-info').attr("hidden", false);
    }
  });

  /*****************************************************************************
  * Name: CheckoutView
  * Parameters: None
  * Description: Once an instance of CheckoutView is instantiated, the render()
  * will compile the #checkoutViewTemplate and call showCheckout()
  * Flow: called when finshButton is clicked in ShippingView
  *****************************************************************************/
  const CheckoutView = Backbone.View.extend({
    el: "#checkoutView",
    initialize(){
      channel.on("testdata",this.showCheckout,this);
      channel.trigger("testChannel");
      //this.render();
      //this.showCheckout();
      console.log("first");
    },
    render(){


      // This turns on trigger

      console.log(channelTriggered);
    },
    /* showShipping() will hide the shippingView then will record shipping
     * information into #recept2 */
    showCheckout(data) {
      console.log("helooooooooo");
      $('.shipping-info').attr("hidden", true);
      const source = $('#checkoutViewTemplate').html();
      const template = Handlebars.compile(source);
      data.forEach((e)=> {
        this.$el.append(template(e));
      });
      // Grab the user's shipping info one at a time and append to recipt2
     let shipInfo = ($(".shipping-info").serializeArray());
      shipInfo.forEach((e) => {
        $("#recipt2").append(`${e.name}: ${e.value}<br/>`);
      });
    }
  });

  /*****************************************************************************
  * Name: MainView
  * Parameters: None
  * Description: This is the main container for the all 3 views. MainView will
  * know about all the views.
  * Once an instance of MainView is instantiated, the render()
  * will compile the #mainViewTemplate and call renderProductView()
  * The nextButton will also instantiate a new shippingView upon user click
  * Flow: This is the start of the application!
  *****************************************************************************/
    const MainView = Backbone.View.extend({
    el: ".big-container",
    // Happens automatically once the instance is created
    // intialize(){
    //   this.render();
    //   this.renderProductView();
    // },
    events:{
      "click #nextButton" : "initializeShippingView"
    },
    render(){
      const source = $('#mainContainerTemplate').html();
      const template = Handlebars.compile(source);
      this.$el.html(template);
      return this;
    },
    /* renderProductView() will instantiate a new ProductView and show the items
     * a user can purchase from the website */
    renderProductView(){
      const productView = new ProductView({collection: productCollection});
    },
    /* initializeShippingView() will instantiate a new ShppingView once the user
     * clicks on the nextButton */
    initializeShippingView(){
      const shippingView = new ShippingView();
    }
  });

  // Create an instance of the mainContainer that starts the whole project!
  const mainView = new MainView();
  mainView.render();
  mainView.renderProductView();

})();