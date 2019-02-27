require("dotenv").config();
var moment = require('moment');
var fs = require("fs");


var action = process.argv[2];
var input = process.argv[3];


switch (action) {
  case "concert-this":
  bandsInTwon();
  break;

  case "spotify-this-song":
  spotify();
  break;

  case "movie-this":
  movieData();
  break;
  
  case "do-what-it-says":
  fsDoIt();
  break;
  
};

//running bands in town

function bandsInTwon(){
var axios = require("axios");
axios
  .get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
  .then(function(response) {
    
    var venueName = response.data[0].venue.name;
    var venueLocation = response.data[0].venue.city;
    var venueDate = response.data[0].venue.datetime;

    console.log("venue name: " + venueName);
    console.log("venue Location: " + venueLocation);
    console.log("venue Date: " + moment(venueDate).format("L"));
    
})
.catch(function(error) {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    
    console.log("Error", error.message);
  }
  console.log(error.config);
});
};

//Spotify
function spotify() {
  var keys = require("./Keys");

  var Spotify = require('node-spotify-api');

  var spotify = new Spotify(keys.spotify)

  spotify.search({ type: 'track', query: input, limit: 1 }, function(err, data) {
  
      if (err) {
          return console.log('Error occurred: ' + err);
      }
      
     console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
     console.log("The song's name: " + data.tracks.items[0].name);
     console.log("Preview link: " + data.tracks.items[0].preview_url);
     console.log("Album: " + data.tracks.items[0].album.name);        
      });
  };


//Imdb
function movieData(){

  if(input == undefined){

    input = "mr nobody"
  }

  var axios = require("axios");
  axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    
   
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Released);
    console.log("imdb Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating of the movie. : " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  }
  
)};

//Do what it says
function fsDoIt() {

  var fs = require("fs");

  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    } else{

     var dataArray = data.split(",");
     action = dataArray[0];
     input = dataArray[1];
     spotify();
    
    }})};
    

