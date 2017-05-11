GENERAL DESCRIPTION AND OBJECTIVES
----------------------------------

This small project was developed to be used as an application for a JavaScript Engineer position.

The goal of the project is to utilize the open hacker news API provided by Ycombinator, specifically the 
following three API endpoints:

Topstories: https://hacker-news.firebaseio.com/v0/topstories.json
Story info: https://hacker-news.firebaseio.com/v0/item/[id].json (replace [id] with story id) 
Author info: https://hacker-news.firebaseio.com/v0/user/[id].json (replace [id] with user id)

More information available at: https://github.com/HackerNews/API

The previous JSON files should be used with client side JavaScript to fetch ten stories at random from 
the top stories list. 

Then present these stories on a web page sorted by story score ascendingly. 

The presentation must include:

    Story title

    Story URL

    Story timestamp

    Story score

    Author id

    Author karma score.

The website should not present any data until all is collected. Javascript is required for all API 
communication and data handling.




DEVELOPMENT NOTES
-----------------

The website uses only one single HTML file (Main.html) were the results (stories data) are shown.
It also uses two script files, one is just a library mainly used in order to get and parse the JSON files 
through an AJAX call (jQuery) and the second one (jsFunctions.js) contains most of the functionality of 
the website.

Another file included in the project (styles.css) includes a few simple Style Sheets (CSS) to be used to 
present the data in an easy-to-read manner.

The last file is just a GIF image to be shown in the page while the data is being processed in the 
background.

The website functionality consists mainly of a single JavaScript function that runs when the site is 
loaded/opened. 

The function basically loads 10 random stories and the additional required data about them and their 
authors from the 3 given JSON files (their URL) and appends the HTML generated in the given DIV container.

The function also accepts a fifth parameter that indicates the number of random stories to be shown. 
For the purposes of this project we use 10.

The "ajax" jQuery function is used to easily get and parse the required JSON files. The "jQuery.getJSON()"
function could have also been used here if preferred.

First an array of 10 random numbers are generated and used as indexes to get 10 stories from the first 
JSON file and store its IDS in an array.

Then the array is used to loop through it and get the additional information for each story from the 
second JSON file.

After that is completed, inside the same loop, the author ID is used to get the karma score for that 
author from a third JSON file.
 
"Async" should be set to "false" in the "ajax" function so that we make sure the author ID is obtained 
from the second JSON file before using it to get the karma score using that ID from the third JSON file.

The stories and its data are sorted in a 2D matrix and then this matrix is ascendingly sorted by story 
score using the "sort" function of an Array object in JavaScript and a sorting function that compares the
fourth column of the matrix to sort the "rows" accordingly in ascending order.

The data from the matrix goes through a loop to get HTML formatted and saved in a variable.

Definition Lists are used to show the list of stories and its info in an easy-to-read manner.

Finally the variable with all the HTML in it is appended to the DIV container and shown in the main 
webpage.

Other additional features include converting the UNIX timestamp obtained from one of the JSON files to a 
human-readable date format, and adding a Link tag to the stories URL so that the user can open the link 
on a new tab.




CONTACT INFORMATION
-------------------

Author: Erick Martin del Campo
erickmcc@gmail.com

Project on GitHub: 
https://github.com/molocheto/JavaScript-Engineer-Application


