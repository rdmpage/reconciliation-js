
var ReconcilationAPI = require('./reconcile.js');

var reconcile = new ReconcilationAPI();


var request = require('request');
//
// This defines three routes that our API is going to use.
//
var routes = function(app) {
//
// This route processes GET requests, by using the `get()` method in express, and we're looking for them on
// the root of the application (in this case that's https://rest-api.glitch.me/), since we've
// specified `"/"`.  For any GET request received at "/", we're sending some HTML back and logging the
// request to the console. The HTML you see in the browser is what `res.send()` is sending back.
//


  //---------------------------------------------------
  // handle a GET request
  app.get("/", function(req, res) {
    
    console.log("Received GET: "+JSON.stringify(req.body));
    
    var callback_parameter = '';
    
    if (req.query.callback) {
      callback_parameter = req.query.callback;
    }
    
    if (req.query.queries) {
      //var result = reconcile.Query(JSON.parse(req.query.queries), res);
      reconcile.reconcile(JSON.parse(req.query.queries), res, callback_parameter);
      //return res.send(result);
    } else {
      var metadata = reconcile.metadata(callback_parameter);
      
      if (callback_parameter != '') {
        metadata = callback_parameter + '(' + JSON.stringify(metadata) + ')';
      } else {
        metadata = JSON.stringify(metadata);
      }
      return res.send(metadata);
    }
 
   
  });    
  
  //---------------------------------------------------
  // handle a POST request
  app.post("/", function(req, res) {
    
    console.log("Received POST: "+JSON.stringify(req.body));
    
    if (1) {    
      
      var q = req.body;
      
      if (q.queries) {
        q = JSON.parse(q.queries);
      }

      
      console.log("q="+JSON.stringify(q, null, 2));
      
      
      reconcile.reconcile(q, res, '');
      //return res.send(req.body);
    } else {
      var metadata = reconcile.metadata('');
      
      return res.send(metadata);
    }
 
   
  });      
};
 
module.exports = routes;