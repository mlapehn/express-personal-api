// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

// Top 10 movies
var movies = [
  {
    _id: 1,
    title: "Top Gun",
    director: "Tony Scott",
    year: "1986",
  },
    {
    _id: 2,
    title: "",
    director: "",
    year: "",
  },
    {
    _id: 3,
    title: "",
    director: "",
    year: "",
  },
    {
    _id: 4,
    title: "",
    director: "",
    year: "",
  },
    {
    _id: 5,
    title: "",
    director: "",
    year: "",
  },
    {
    _id: 6,
    title: "",
    director: "",
    year: "",
  },
    {
    _id: 7,
    title: "",
    director: "",
    year: "",
  },
    {
    _id: 8,
    title: "",
    director: "",
    year: "",
  },
    {
    _id: 9,
    title: "",
    director: "",
    year: "",
  },
    {
    _id: 10,
    title: "",
    director: "",
    year: "",
  },
];


//Remove
db.Movie.remove({}, function(err, movies) {
	if (err) {
		console.log(err);
	} else {
		console.log('removed movies');
  		
  		//Create
  		db.Movie.create(movies, function(err, movies){
  			if (err) {
  				return console.log(err);
  			}
  			console.log("Created: ", + movies.length + " movies");
			process.exit();
		});
	}
});