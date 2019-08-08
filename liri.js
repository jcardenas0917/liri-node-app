require("dotenv").config();
var axios = require("axios");
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify)
// console.log(spotify)
var command = process.argv[2];
var input1 = process.argv[3];
var input2 = process.argv[4];
var movieQueryUrl="";
// const concertQueryUrl;
// const spotifyQueryUrl;
var displayMovie = result => {
    console.log(result.data.Title);
    console.log(result.data.Year);
    console.log(result.data.imdbRating);
    console.log(result.data.Ratings[1].Source +" "+result.data.Ratings[1].Value);
    console.log(result.data.Country);
    console.log(result.data.Language);
    console.log(result.data.Plot);
    console.log(result.data.Actors);

}
var apiCall = (queryUrl) => {
    axios.get(queryUrl).then(
        function (response) {
            if (command === "movie-this") {
                displayMovie(response);
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

        return;

    case "spotify-this-song":
        return;

    case "movie-this":
        if (input1==="Undefined"){
            console.log(input1)
            movieQueryUrl = "https://www.omdbapi.com/?t=MrNobody&apikey=2ccc910c";
            console.log(movieQueryUrl)
            apiCall(movieQueryUrl);
        }else{
        movieQueryUrl = "https://www.omdbapi.com/?t=" + input1 + "&apikey=2ccc910c";
        console.log(input1)
        apiCall(movieQueryUrl);
        return;
        }
    case "do-what-it-says":
        return;

    default:
        return;
}

