$(function() {

  var HelloWorld = Backbone.Model.extend({
    defaults: {
      message: "Marionette World"
    },
    // In this lab, we do not call helloWorld
    helloWorld: function() {
      alert("Hello "+ this.get('message') +"!");
    }
  });

  // Creating a new Marionette View
  var HelloWorldView = Marionette.View.extend({
    template: '#hello-template'
  });

  // Create your marionette app here
  var App = Marionette.Application.extend({
    // This is where to put the code...in the body
    region: 'body',
    // Calls the Marionette View with a new HelloWorld obj that defaults the
    // Message to the browser
    onStart: function() {
      this.showView(new HelloWorldView({model: new HelloWorld()}));
    }
  });

  // Create a new instance of the Marionette application
  var myApp = new App();
  myApp.start();
});