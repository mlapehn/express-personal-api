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

 var db = require('./models');

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
      {method: "POST", path: "/api/movies", description: "Top Ten Movies"} // Movies
      //add another catagory
    ]
  })
});

// Profile Endpoint
app.get('/api/profile', function api_profile(req, res) {
  res.json({
    name: "Matthew Lapehn",
    current_city: "Denver, CO",
    gender: "Male",
    height: "",
    weight: "Wouldn't you like to know!",
    parents: [
    {name: "Boni Hypes", relationship: "Mother"},
    {name: "John Lapehn", relationship: "Father"},
    {name: "Bret Hypes", relationship: "Step-Father"},
    {name: "Jeanette Lapehn", relationship: "Step-Mother"}
    ],
    siblings: [
    {name: "Lindey Hypes", relationship: "Step-Sister", side: "Bret"},
    {name: "Brandon Lapehn", relationship: "Brother", side: "Boni & John"},
    {name: "Taylor Hypes", relationship: "Brother", side: "Boni"},
    {name: "Courtney Lapehn", relationship: "Sister", side: "John"},
    {name: "Zach Lapehn", relationship: "Brother", side: "John"}
    ],
  });
});



// Movies
app.get('/api/movies', function api_movies(req, res) {
  db.Movie.find({})
    .exec(function(err, movies) {
      if (err) { 
        return console.log("index error: " + err); 
      }
      res.json(movies);
  });
});

// Grab a movie
app.get('/api/movies/:id', function api_moviesId(req, res) {
  var movieId = req.params.id;
  db.Movie.findOne({_id: movieId}, function(err, foundMovie){
    if (err) {
      return console.log("id error: " + err);
    }
    res.json(foundMovie);
  });
});

// Create a new movie
app.post('/api/movies', function api_movieNew(req, res) {
  var newMovie = new db.Movie({
    _id: req.body.id,
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
  });
  newMovie.save(function(err, newMovie) {
    if (err) {
      return console.log("save error: " + err);
    }
    res.json(newMovie);
  });
});


//Update A Movie
app.put('/api/movies/:name', function api_moviesUdpate(req, res) {
  var movieName = req.params.name;
  var change = req.body;
  db.Movie.findOneAndUpdate({name: movieName}, change, function(err, foundMovie){
      foundMovie.save(function(err, foundMovie) {
        if (err) {
          return console.log("save error: " + err);
        }
        res.json(foundMovie);
      });
    });
});

//Delete a movie
app.delete('/api/movies/:id', function api_moviesDelete(req, res) {
  var movieId = req.params.id;
  db.Movie.findOneAndRemove({_id: movieId}, function(err, deletedMovie) {
    res.json(deletedMovie);
  });
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
