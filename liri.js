require("dotenv").config();
var axios = require("axios");
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify)
// console.log(spotify)
var command = process.argv[2];
var input = process.argv[3];
var movieQueryUrl = "";
var concertQueryUrl = "";
// const concertQueryUrl;
// const spotifyQueryUrl;
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
        console.log(result[i].datetime);
        console.log("______________________")
    }

}
var apiCall = (queryUrl) => {
    axios.get(queryUrl).then(
        function (response) {
            if (command === "movie-this") {
                displayMovie(response.data);
            } else if (command === "concert-this") {
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


switch (command) {
    case "concert-this":
        concertQueryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
        apiCall(concertQueryUrl);
        return;

    case "spotify-this-song":
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

