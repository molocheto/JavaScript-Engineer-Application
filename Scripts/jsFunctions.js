//Function that loads a given number of random stories and additional data about them and their authors
//from 3 different JSON files and appends the HTML in the given DIV ID.
//The stories are ascendingly sorted by story score
function showRandomStoriesInfo(numStories, divID, topStoriesJSON_URL, itemsJSON_URL, usersJSON_URL) {
    var showData = $('#' + divID); //div where the resulting HTML will be appended

    showData.html('<img src="Images/loading.gif"> Loading...');
    //jQuery function to easily get and parse the required JSON file (topStories first)
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: topStoriesJSON_URL,
        async: false,      
        success: function (data) {
            //var numStories = 10; //Number of stories to show
            var storiesIDs = []; //Array with the IDs of the stories
            var storiesInfo = []; //Two dimensional matrix that stores all required info for all stories 
            var randNumbers = []; //Array that stores random numbers
            
            //Reduce number of stories to get if the data in the JSON file has less elements than the number of 
            //stories we want to show
            if (data.length < numStories) {
                numStories = data.length;
            }

            //Get a list of random numbers according to the number of stories in the JSON file
            while (randNumbers.length < numStories) {
                var randomNumber = Math.floor((Math.random() * data.length) + 1);
                if (randNumbers.indexOf(randomNumber) > -1) continue;
                randNumbers[randNumbers.length] = randomNumber;
            }            

            //Use the previous random numbers to get the IDs of the stories (using the random number as index)
            //and getting additional info of the story from another JSON file using each story ID
            for (i = 0; i < numStories; i++) {
                storiesIDs[i] = data[randNumbers[i] - 1]; //for each random index, store the corresponding ID
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: itemsJSON_URL + storiesIDs[i] + '.json',
                    async: false,      
                    success: function (data) { //Stores the additional stories info in the matrix                   
                        storiesInfo[i] = [];
                        storiesInfo[i][0] = data["title"];
                        storiesInfo[i][1] = data["url"];
                        storiesInfo[i][2] = data["time"];
                        storiesInfo[i][3] = data["score"];
                        storiesInfo[i][4] = data["by"];
                    }
                });
                
                //Gets the karma score for the author from a third JSON file using the user ID previously obtained
                $.ajax({
                    type: 'GET',
                    dataType: 'json',
                    url: usersJSON_URL + storiesInfo[i][4] + '.json',
                    async: false,     
                    success: function (data) { //Stores the karma score in the matrix

                        storiesInfo[i][5] = data["karma"];

                    }
                });
            }

            showData.empty(); //Clears the DIV container

            storiesInfo.sort(sortWithFourthColFunction); //Sorts the matrix using the sorting function created below

            var HTMLCode = '<dl>'; //Stores the HTML to be shown in the DIV container     

            //Definition Lists are used to show the list of stories and its info in an easy-to-read manner
            for (i = 0; i < numStories; i++) {
                HTMLCode += '<dt>' + storiesInfo[i][0] + String.fromCharCode(13) + '</dt>';
                
                //Configure the URL as a link so that when clicked it opens the page on another tab
                HTMLCode += '       <dd><b>Story URL:</b> <a href="' + storiesInfo[i][1] + '"  target="_blank">' + 
                            storiesInfo[i][1] + '</a></dd>' + String.fromCharCode(13);

                //The timestamp is converted from UNIX timestamp to readable date format
                var formattedTime = UNIXtimestampToDate(storiesInfo[i][2]); 

                HTMLCode += '       <dd><b>Story timestamp:</b> ' + formattedTime + '</dd>' + String.fromCharCode(13);
                HTMLCode += '       <dd><b>Story score:</b> ' + storiesInfo[i][3] + '</dd>' + String.fromCharCode(13);
                HTMLCode += '       <dd><b>Author id:</b> ' + storiesInfo[i][4] + '</dd>' + String.fromCharCode(13);
                HTMLCode += '       <dd><b>Author karma score:</b> ' + storiesInfo[i][5] + '</dd>' + String.fromCharCode(13);

                HTMLCode += '</br></br>' + String.fromCharCode(13) + String.fromCharCode(13);
            }
            
            HTMLCode += '</dl>';
            
            showData.append(HTMLCode); //Finally append the generated HTML to the DIV Container
        }
    });
};

//Sorting funtion that compares the fourth column of the matrix to sort the "rows" accordingly in ascending order
function sortWithFourthColFunction(a, b) {
    a = a[3]
    b = b[3]
    return (a === b) ? 0 : (a < b) ? -1 : 1
}

//Function to convert a UNIX timestamp value to an English date format
function UNIXtimestampToDate(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var result = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return result;
}

