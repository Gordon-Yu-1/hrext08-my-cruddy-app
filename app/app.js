var loadLocalStorage = function () {
	var keys = Object.keys(localStorage);//create an array keys in localStorage
	var htmlString = '';// html string to be added to the local storage
	for (var i = 0; i < keys.length; i++) { // check every key in localStorage
		htmlString += `<tr><td>${keys[i]}</td><td>${localStorage[keys[i]]}</tr></tr>`;
		// adds string in html element format for every key found in the localStorage obj
	}
    // Jquery $('tbody') retrieves tbody element.
    // uses html(htmlString here) to set the child elements of tbody to the current htmlString.
	$('tbody').html(htmlString)
};

var updateStatusLabel = function(message) {
	$('#statusLabel').text('Status: ' + message);
}

// gives a timesstamp to any completed assignment values
var timeStamp = function (obj) {
    for (var key in obj) {
		var stamp = new Date();
		var month = stamp.getMonth();
		var day = stamp.getDate();
		var year = stamp.getFullYear();
		var date = `${month}/${day}/${year}`;
    
        if (obj[key] === 'complete') {
          obj[key] =  `Assignment completed on: ${stamp}`;
		    //changes all the boxed not just the boxes with completed tasks
	    } 
	}
}

// example of today: 04/04/2019
// example of dueDate: 03/20/2019
// create a way of checking if assignemtn is passed due
var ifPastDue = function(obj) {
	for (var key in obj) {
		// access to different parts of a time stamp
	    var stamp = new Date();
		var month = stamp.getMonth();
		var day = stamp.getDate();
		var year = stamp.getFullYear();

		if(obj[key] !== 'A') {

		    var dueMonth = obj[key][0] + obj[key][1];
		    var dueDay = obj[key][3] + obj[key][4];
		    var dueYear = obj[key][6] + obj[key][7] + obj[key][8] + obj[key][9];

		    if (Number(dueYear) < year || Number(dueMonth) < month || Number(dueDay) < day) {
		  		obj[key] = 'STEP YA GAME UP. THIS IS PAST DUE';
		    }
		}
	}
}



      

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function () {
	ifPastDue(localStorage);
	loadLocalStorage();

	$('#btn-create').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			updateStatusLabel('Assignement already exists, please update assignment instead!');
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		}else {
			createEntry(key, value);
			updateStatusLabel('Assignment: ' + key + ' -entered');
		}
        
        timeStamp(localStorage);
        ifPastDue(localStorage);
		loadLocalStorage();
	});

	$('#btn-update').on('click', function(e) {

		var key = $('#key').val();

		var value = $('#value').val();

		var existingValue = localStorage.getItem(key)

            // create a conditional to return complete with a time stamp
			// // console.log(localStorage[key])
			// // localStorage[key] = 'assignment completed: ' + Date();
			// $('#value').css('background-color', 'green' );//this access the value input box
			// // $('#value').text('assignment completed: ');
			// 			// console.log(localStorage[key])



		var keyExists = existingValue !== null;

		if (value === existingValue) {
			updateStatusLabel('Assignment not updated - that assignment already exists')
		} else if (keyExists) {
			updateEntry(key, value);
			updateStatusLabel('Assignment: ' + key + ' -updated');
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			updateStatusLabel('Assignment doesn\'t exist, please use create assignment instead');
		}
        
        ifPastDue(localStorage);
		timeStamp(localStorage);
		loadLocalStorage();		
	});

	$('#btn-delete').on('click', function(e) {
		var key = $('#key').val();
		var value = $('#value').val();
		var keyExists = localStorage.getItem(key) !== null;

		if (keyExists) {
			removeEntry(key);
			updateStatusLabel('Assignment: ' + key + ' -deleted');
		} else if (key === '') {
			updateStatusLabel('invalid input!')
		} else {
			updateStatusLabel('Assignment doesn\'t exist, nothing removed');
		}

	    ifPastDue(localStorage);
        timeStamp(localStorage);
		loadLocalStorage();
	});	



	// 		$(".container2").mapael({
 //    	map : {
 //        	name : "world_countries"
 //    	}
	// });


});








/*



When an input element is given a name, that name becomes a property of the owning 
form element's HTMLFormElement.elements property. That means if you have an input whose name
 is set to guest and another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
var createEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, value) {
	return localStorage.setItem(key, value);
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
	return localStorage.removeItem(key);
}
