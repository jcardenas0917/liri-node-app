


//Call all the dependencies needed to run this application
require("dotenv").config();
var axios = require("axios");
var moment = require('moment');
moment().format();

//--------------------------------------------------------------
//Set variables for the arguments set by the user
//Set variables for the API calls 
var command = process.argv[2];
//we slice and join the user input so the user does not have to use ""
var input = process.argv.slice(3).join(" ");
var movieQueryUrl = "";
var concertQueryUrl = "";


//Functions-----------------------------------------------------------------------------

//Display Movie function will console log to the movie-this results
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


//Display Concert function will console log to the concert-this results
var displayConcert = result => {

    for (var i = 0; i < result.length; i++) {
        console.log(result[i].venue.name);
        console.log(result[i].venue.country);
        console.log(result[i].venue.region);
        console.log(result[i].venue.city);
        console.log(moment(result[i].venue.datetime).format("MM/DD/YYYY"));
        console.log("______________________")
    }

}

//Display Song function will console log to the spotify-this-song results
var displaySong = results => {
    for (var i = 0; i < results.length; i++) {
        
        console.log(results[i].artists[0].name);
        console.log(results[i].name);
        console.log(results[i].uri);
       
        
        console.log("______________________")
    }
}


//the apiCall function makes a call for the OMDB or Bandsintown API depending on the command set by the user
var apiCall = (queryUrl,data) => {

    axios.get(queryUrl).then(
        function (response) {
            if (command==="movie-this"||data==="movie-this"){
                displayMovie(response.data);
            }else if(command==="concert-this"||data==="concert-this"){
                displayConcert(response.data);
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

//This function makes the call to the spotify API and gets the song's information if the user DOES NOT type a song
//The default is The Sign

var spotifyDefault = () => {
    var Spotify = require('node-spotify-api');
    var keys = require("./keys.js");
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: 'track', query:"The Sign"})
        .then(function (response) {
            displaySong(response.tracks.items);
        })
        .catch(function (err) {
            console.log(err);
        });
}

//This function makes the call to the spotify API and gets the song's information based on the user's input
var spotifyCall = () => {
    var Spotify = require('node-spotify-api');
    var keys = require("./keys.js");
    var spotify = new Spotify(keys.spotify);
    spotify
        .search({ type: 'track', query: input })
        .then(function (response) {
            displaySong(response.tracks.items);
        })
        .catch(function (err) {
            console.log(err);
        });
}

//Condition statements to generate defalut values if the user does not type an input value
    if (command==="movie-this"&&input===undefined){
        concertQueryUrl = "https://www.omdbapi.com/?t=Mr Nobody&apikey=2ccc910c";
        apiCall(concertQueryUrl);
    }else if (command==="movie-this"){
        movieQueryUrl = "https://www.omdbapi.com/?t=" + input + "&apikey=2ccc910c";
        apiCall(movieQueryUrl);
    }else if(command==="spotify-this-song"&&input===undefined){
        spotifyDefault();
    }else if (command==="spotify-this-song"){
        spotifyCall();
    }


//Checks wich command the user set's and calls the appropiate api function.

switch (command) {
    case "concert-this":
        concertQueryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
        apiCall(concertQueryUrl);
        return;
    case "do-what-it-says":
            var fs = require("fs");

            // This block of code will read from the "random.txt" file.
            // The code will store the contents of the reading inside the variable "data"
            fs.readFile("random.txt", "utf8", function(error, data) {
            
              // If the code experiences any errors it will log the error to the console.
              if (error) {
                return console.log(error);
              }
            
            
              // Then split it by commas (to make it more readable)
              var dataArr = data.split(",");
              
              // We will then re-display the content as an array for later use.

              if (dataArr[0]==="spotify-this-song"){
                  input = dataArr[1];
                  spotifyCall()
              }
              else if(dataArr[0]==="concert-this"){
                  input = dataArr[1];
                  
                 concertQueryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
                  apiCall( concertQueryUrl,dataArr[0]);

              }else if(dataArr[0]==="movie-this"){
                input = dataArr[1];
                
                movieQueryUrl = "https://www.omdbapi.com/?t=" + input + "&apikey=2ccc910c";
                apiCall( movieQueryUrl,dataArr[0]);

            }
            });
            
        return;

    default:
        return;
}

