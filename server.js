// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    Personal_API: true, // DONE
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/mlapehn/express-personal-api/blob/master/README.md", // Update readme
    base_url: "https://fast-inlet-93943.herokuapp.com/", // API url - DONE
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Fast Facts"}, // Facts about me
      {method: "POST", path: "/api/movies", description: "Favorite Movies"} // Movies
    ]
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
