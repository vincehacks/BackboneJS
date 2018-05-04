# BackboneJS

Created by Vince Chang </br>

Instructor: Alain (Al)  </br>
Email: al@interstate21.com </br>

[Day 1](https://goo.gl/rGJiWv)

[Day 2](https://goo.gl/vkEiye)

[Github](https://github.com/alcfeoh/di-backbone-js)


# Day 1


#### Introduction to Backbone
- In the past, all of the front-end code (HTML, JS, CSS) was generated from the
back-end
- User interactions with the webpage often required a full-page refresh
- With Backbone, the front-end code is now independent from the back-end: It's
a ***Single Page Application***
- The web server becomes a web-service that outputs JSON data, not dynamic
HTML or CSS


#### Ajax
- Then came into play AJAX and jQuery around 2005
- Instead of refreshing the webpage, Ajax would just rebuild parts that needed
to be updated, as oppose to rebuilding the whole page
- Ajax will would just return XML, but nowadays they use JSON because it's
lighter
- The main idea was to load content asynchronously in the background to
refresh portions of the webpage


#### What is Backbone?
- Backbone.JS is a framework that brings the MVC pattern to JavaScript 
- It is very lightweight (7.6kb) and requires few dependencies (only hard dependency is underscore.js)
- Official website: http://backbonejs.org


#### Why Backbone?
- Backbone.JS is unopiniated: There are different ways to solve any problem
- Its learning curve is very low (can do it in two days!)
- It does not require a lot of set-up (unlike Angular for instance)


#### What are Backbone Models?
- ***Models represent the data of your application***
- In Backbone, a model is a set of keys and values, an internal table of data
attributes
- Models handle syncing data with a persistence layer (usually a REST API)


#### Simple Model (Step 1)
- We create the definition of our model using `Backbone.Model.extend`
- Models can have several attributes or functions http://backbonejs.org/#Model
```
// Here we define the structure of our DATA MODEL
var Todo = Backbone.Model.extend({
  
  // Default values when a new instance is created
  defaults: {
     title: '',
     completed: false
 }
});
```


#### Instance of a Model (Step 2)
- Once our Model definition is done, we can create an instance of it
- The constructor function can be used to pass the value of the data model
- Simple getters/setters can then be used to read/write the model
```
// Create object with attributes
var todo = new Todo({title: 'Learn Backbone', completed: false});

todo.get('title');      // "Learn Backbone"
todo.get('completed');  // false
todo.get('created_at'); // undefined

// Setting a value
todo.set('created_at', Date());
todo.get('created_at'); // "Wed Sep 12 2012 12:51:17 GMT-0400 (EDT)"
```


#### Controller Methods
- We can add our own methods to any Model definition
- These methods play the role of the ***Controller*** in the MVC pattern
```
var Todo = Backbone.Model.extend({
   defaults: {
       title: '',
       completed: false
   },
   // Our own model method
   completeTodo: function(){
       this.set('completed', true);
   }
});
```


### Backbone Views


#### What are Backbone Views?
- ***Views are atomic chunks of user interface***
- Purpose is to connect to a model and render it!
- Views listen to the model "change" events, and react or re-render themselves
appropriately


#### Basic View
- A view needs to be hooked to an HTML element (el) so that Backbone knows
where to render it.
- We use `Backbone.View.extend` to create the view definition
- `initialize` is the first function called when a view gets instantiated
```
var DocumentRow = Backbone.View.extend({
   // HTML tag this view is going to generate
   tagName: "li",
   
   // CSS class applied to the view tag
   className: "document-row",
  
   // Where the view will be rendered
   el: "#container",

   // Init function for the view (like a constructor, as soon as it is
   // rendered, this happens!)
   // listen to the model, will rerender if there are changes to the model
   initialize: function() {
       this.listenTo(this.model, "change",this.render);
   },

   render: function() {
       // Do some DOM manipulation 
       // to render things here
   }
});
```


#### $el
- `$el` is a jQuery object that references the element where the view should be
rendered (in our case, #container)
```
var DocumentRow = Backbone.View.extend({
   // HTML tag this view is going to generate
   tagName: "li",
   
    // Where the view will be rendered
el: "#container",

   // ...

   render: function() {
       // A jQuery object to render things
       this.$el.html("View rendering text");
   }
});
```


#### Instantiating a View
- Once a view is defined, we can create an instance of it and pass a model to
its constructor function
- Other view attributes, such as el, can be passed to the constructor function
as well
```
var row = new DocumentRow({
   model: doc,
   // Now the view is dynamic based
   // on the model ID
   el: "document-row-" + doc.id
});
```


#### Templates
- Most views are complex and require the use of a HTML template
- Such templates can be defined in our HTML using a `script` tag
- We’re using the `underscore` library to load the template and render it
```
// HTML template
<script type="text/template" id="item">
   <div class="view">
       <input class="toggle" type="checkbox">
       <label><%- title %></label>
   </div>
</script>

var TodoView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#item').html()),

  render: function(){
    // We render using our template
    this.$el.html(this.template(this.model.toJSON()));
  }
});
```


#### Underscore.js
- Underscore provides over 100 functions: map, filter, invoke, function
binding, javascript templating, creating quick indexes, deep equality testing,
and so on.
- Official website: http://underscorejs.org


### Backbone Collections


#### What are Backbone Collections?
- ***Collections*** help deal with a group of related models
- Provide helper functions for performing aggregations or computations against
a list of models


#### Collection
- Collections are based on a specific model
- They can sync with a REST backend when a URL is passed to them
```
var TodoList =
 Backbone.Collection.extend({
   
   model: Todo,
   
   // Collections can sync with REST WS
   url: "/todos"

});

// Instance of the Collection
var todoList = new TodoList();
```


#### App View
- The main application view uses a collection to iterate through models and
render them
- This is a common pattern in Backbone applications
```
var AppView = Backbone.View.extend({
  el: '#todoapp',
  //...
  addOne: function(todo){
     // Append every todo to the list
     var view = new TodoView({model: todo});
     this.$el.append(view.render().el);
  },
  render: function(){
     // Iterate through the collection
     todoList.each(this.addOne, this);
  }
});

var appView = AppView();
```


### Backbone with Handlebars
- Handlebars is a simple templating library that you can use instead of
Underscore.js
- Backbone is open to any templating engine
- Official website: http://handlebarsjs.com/
- All we have to do to use Handlebars is use its templating feature in the
render function
```
var SearchView = Backbone.View.extend({
   initialize: function(){
       this.render();
   },

   render: function(){

     // Compile the template with Handlebars
     var src = $('#template').html();
     var template = Handlebars.compile(src);

     // Pass the data model to get the HTML
     var html = template(this.model.toJSON());

     // Load the HTML into the Backbone "$el"
     this.$el.html(html);
   }
});
```


# Day 2


### Backbone Fetch


#### Fetch and REST
- Backbone is pre-configured to sync with a RESTful API
- Both models and collections can use that feature to interact with the server
- A collection expects an array from the server while a model expects an object
```
var Books = Backbone.Collection.extend({
   url: '/books'
});

GET  /books/ .... collection.fetch();
POST /books/ .... collection.create();
GET  /books/1 ... model.fetch();
PUT  /books/1 ... model.save();
DEL  /books/1 ... model.destroy();
```


#### Backbone.sync
- ***Backbone.sync*** is the function that Backbone calls every time it
attempts to read or save a model to the server
- Whenever a sync starts, a "request" event is emitted. If the request is
successful you'll get a "sync" event, and an "error" event if not
- **request** (model_or_collection, response, xhr, options) - when a model or
collections has started a request to the server
- **sync** (model_or_collection, response, options) - when a model or
collection has been successfully synced with the server
- **error** (model_or_collection, response, options) - when a model's or
collection's request to the server has failed


#### Events
- Events is a module that can be mixed into any object, giving the object the
ability to bind and trigger custom named events.
- Events can be registered on a view as illustrated here
- All DOM events are supported. As you can see here, events can be bound to any
HTML element of the view. Here we bind to specific CSS classes.
- A view can also listen to model updates so that it can refresh its template
accordingly.
- This is achieved with the listenTo function, passing the model as a first
parameter, then the event name, then a callback function.
```
var object = {};

_.extend(object, Backbone.Events);

object.on("alert", function(msg) {
   alert("Triggered " + msg);
});

object.trigger("alert", "an event");
```


### Backbone Routing


#### How to use URLs to Keep Track of the State of an app
- In a browser, URLs can be bookmarked or shared
- This means that front-end code should be able to restore a specific state
based on the browser URL
- The **Backbone Router** allows this by pairing routes to actions
- For instance, `/store` would load a `StoreView` on the screen, and `/cart`
would load a `CartView`


#### Router
- Routes can be defined as triggers that would call a function.
- For instance, navigating to `/help` would call the help function
- Parameters can also be added to the route path and used in the triggered
function
```
var Router = Backbone.Router.extend({

   routes: {
     "help": "help",   
     "search/:query": "search",
     "search/:query/:page": "search"  
   },

   help: function () {
       //...
   },

   search: function (query, page) {
       //...
   }
```


#### Browser History
- During page load, after your application has finished creating all of its
routers, be sure to call `Backbone.history.start()` to route the initial URL.
- That way, users will be able to use the back / forward buttons of the browser
to navigate back and forth in history


#### Events and Navigation
- Event listeners can be registered anywhere to listen to route changes
- The router can also be used to navigate programmatically using the navigate
method
```
router.on("route:help", function(page) {
 //...
});


// Updates browser URL 
// and triggers the route function
router.navigate("help/troubleshooting",
 {trigger: true});

//Or ...
// Updates browser URL,
// triggers route function AND
// replaces current route in browser history
router.navigate("help/troubleshooting",
 {trigger: true, replace: true});
 ```


### Marionette Architecture


#### How to Build Backbone Applications?
- Backbone is unopiniated, which is good but also leaves the door open to too
many options
- As we saw during our previous labs, we often get to a point where we don't
know how to architect things
- For instance, what to do in a router function? How to do it? Backbone does
not attempt to answer those questions
- The same goes for views: The render function does not do anything, we have to
decide how to render the view.


#### Enter Marionette
- That's where Marionette comes into play. Unlike Backbone, it is opinionated
and decides how things should be done.
- Marionette uses Backbone 
- It can be seen as an additional layer on top of Backbone, which gets
manipulated like a puppet, hence the name


#### Problems that Marionette Tries to Solve
- How to render Views?
- How to manage relationships between objects?
- How to make Views communicate?
- How to structure our application?
- How to prevent memory leaks?


#### Structure Application
- Provides a single entry point to render our application
```
var App = Marionette.Application.extend({
   region: '#root-element',

   onStart: function() {
       this.showView(new RootView());
   }
});

var myApp = new App();
myApp.start();
```


#### Rendering: View
- Views use underscore by default
- No need to implement the render() function anymore!
```
var MyView = Marionette.View.extend({
  	tagName: 'h1',
   	template: '#template'
});

var myView = new MyView();
myView.render();
```

#### Communication: Radio
- Radio is an event manager where we can send and listen to events
- This allows views to communicate
```
var inboxChan = Backbone.Radio.channel('inbox');

var ContactView = Marionette.View.extend({

   template: '#contact-template',

   initialize: function() {
     this.listenTo(inboxChan, 'show:email',
 this.showContact);
     this.listenTo(inboxChan, 'show:inbox',
 this.showAd);
},
showContact: function(emailObject) {
       //…
},
showAd: function() {
       //…
}
```


#### View
- Views use underscore by default
- No need to implement the render() function anymore!
```
var MyView = Marionette.View.extend({
   	template: '#template'
});

var myView = new MyView();
myView.render();
```


#### Collection View
- Automatic rendering of a collection of models applied to child views.
- No need to provide any render or initialize method!
```
var TodoListView = Marionette.CollectionView.extend({
   childView: TodoView,
collection: todoCollection,
});
```


#### Regions
- Regions are areas that you can define to render specific views.
- Makes it easy to architect your application and swap views in some areas when
needed
```
var RootView = Marionette.View.extend({

   regions: {
       header: '#navbar',
       footer: 'footer'
   },

   initialize: function() {
       this.getRegion('header')
.show(new HeaderView());
       this.getRegion('footer')
.show(new FooterView());
   }
});
```


#### View Lifecycle
- All of these events are triggered during the view lifecycle.
- You can implement a handler for each of them, for instance: `onDetach()`
would be called when the `detach` event happens


### Testing Backbone


#### Jasmine
- Jasmine is Behavior Driven Development framework for testing Javascript
applications
- Official website: https://jasmine.github.io/
```
describe("A suite is just a function",
  function() {
   var a;

   it("and so is a spec", function() {
       a = true;
       expect(a).toBe(true);
   });
});
```


#### Jasmine BeforeEach
- `BeforeEach` initializes the context of each test
- Then each test is an `it()` function that runs an action and expects a result
with the expect function and assertions
```
describe("Player", function() {
 var player;
 var song;

 beforeEach(function() {
   player = new Player();
   song = new Song();
 });

 it("should be able to play a Song", function() {
   player.play(song);
   expect(player.currentlyPlayingSong)
.toEqual(song);
 });
```


#### Jasmine Spies
- Spies are an easy way to mock specific pieces of code for testing purposes.
- For instance, this example replaces the `fetch()` function with a fake one
that sets testing data to the model so we can test without making HTTP requests
```
spyOn(todoCollection, "fetch")
.and.callFake(function() {
//Set fake data for testing
   			todoCollection.model = [...];
});
```