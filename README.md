# liri-node-app

Liri.js NodeJS App
This application calls the spotify API using the spotify-this-song command and shows the name of the song a user types, artist, and spotify ID link.
This application calls the OMDB to using the movie-this command to show the movie's information.
This application calls the bandsintown API using the concert-this command to show the name venue and date.  The date is formated using moment.js

I used a switch case to check each command and call the proper api calls.
I also used the fs library to read the text from random and create a do-what-it-says command.  This pulls the text and console logs the answer just like the other 3 commands.

Create a condition statement to check if the user did not input a title and it will display the default for spotigy-me-this and movie-me-this

Challenges I found were using the spotify API documentation to make the calls and displaying the default responses if the uses leaves the input blank.

images/concert-this.JPG
https://github.com/jcardenas0917/liri-node-app/blob/9bbe60e0aa9d2247578ed2bc18bf3e28eb434dc9/images/concert-this.JPG

images/movie-this.JPG
https://github.com/jcardenas0917/liri-node-app/blob/master/images/movie-this.JPG

images/spotify-this-song.JPG
https://github.com/jcardenas0917/liri-node-app/blob/master/images/spotify-this-song.JPG


images/do-what-it-says
https://github.com/jcardenas0917/liri-node-app/blob/master/images/do-what-it-says.JPG
