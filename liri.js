require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
// var Spotify = require('node-spotify-api');
moment().format();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify)
// const spotifyID =spotify.credentials.id;
// const spotifySecret = spotify.credentials.secret;


//--------------------------------------------------------------
var command = process.argv[2];
var input = process.argv[3];
var movieQueryUrl = "";
var concertQueryUrl = "";
var spotifyQueryUrl = "";
var displayMovie = result => {
    console.log(result.Title);
    console.log(result.Year);
    console.log(result.imdbRating);
    console.log(result.Ratings[1].Source + " " + result.Ratings[1].Value);
    console.log(result.Country);
    console.log(result.Language);
    console.log(result.Plot);
    console.log(result.Actors);

}

var displayConcert = result => {
    console.log(result);

    for (var i = 0; i < result.length; i++) {
        console.log(result[i].venue.name);
        console.log(result[i].venue.country);
        console.log(result[i].venue.region);
        console.log(result[i].venue.city);
        console.log(moment(result[i].datetime).format("MM/DD/YYYY"));
        console.log("______________________")
    }

}

var displaySong = results => {
    console.log(results);
}
var apiCall = queryUrl => {
    axios.get(queryUrl).then(
        function (response) {
            
            switch(command){
                case "movie-this":
                displayMovie(response.data);
                break;
                case "concert-this":
                displayConcert(response.data);
                break;
                case "spotify-this-song":
                displaySong(response);
                break;
                case "do-what-it-says":
                break;
            }
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

var spotifyCall = () =>{
    var Spotify = require('node-spotify-api');
    var keys = require("./keys.js");
    var spotify = new Spotify(keys.spotify);
    spotify
  .search({ type: 'track', query: input })
  .then(function(response) {
    console.log(response.tracks);
  })
  .catch(function(err) {
    console.log(err);
  });
}


switch (command) {
    case "concert-this":
        concertQueryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
        apiCall(concertQueryUrl);
        return;

    case "spotify-this-song":
            // spotifyQueryUrl = "https://api.spotify.com/v1/search?q="+input+"&type=track&market=US&limit=10&offset=5";
            spotifyCall();
        return;

    case "movie-this":
        // if (input1==="Undefined"){
        //     console.log(input1)
        //     movieQueryUrl = "https://www.omdbapi.com/?t=MrNobody&apikey=2ccc910c";
        //     console.log(movieQueryUrl)
        //     apiCall(movieQueryUrl);
        // }else{
        movieQueryUrl = "https://www.omdbapi.com/?t=" + input + "&apikey=2ccc910c";
        apiCall(movieQueryUrl);
        return;
    // }
    case "do-what-it-says":
        return;

    default:
        return;
}

