# liri-node-app

Liri.js NodeJS App
This application calls the spotify API using the spotify-this-song command and shows the name of the song a user types, artist, and spotify ID link.
This application calls the OMDB to using the movie-this command to show the movie's information.
This application calls the bandsintown API using the concert-this command to show the name venue and date.  The date is formated using moment.js

I used a switch case to check each command and call the proper api calls.
I also used the fs library to read the text from random and create a do-what-it-says command.  This pulls the text and console logs the answer just like the other 3 commands. 

Challenges I found were using the spotify API documentation to make the calls and displaying the default responses if the uses leaves the input blank.

