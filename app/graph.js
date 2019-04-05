var statusCounter = [
	['completed assignments', 0],
	['past due assignments', 0],
	['to do assignments', 0]
];

var updateStatusCounter = function(obj) {
	for (var key in obj) {
		if (obj[key][0] === 'S') {
			statusCounter[1][1]++;
		} else if (obj[key][0] === 'A') {
			statusCounter[0][1]++;		
		} else if (typeof obj[key] === 'string' && obj[key][0] !== 'A' && obj[key][0] !== 'S') {
			statusCounter[2][1]++;
		}
	}
}


updateStatusCounter(localStorage);

var chart = c3.generate({
    data: {
        columns: statusCounter,

        type : 'donut',
        onclick: function (d, i) { console.log("onclick", d, i); },
        onmouseover: function (d, i) { console.log("onmouseover", d, i); },
        onmouseout: function (d, i) { console.log("onmouseout", d, i); },
        colors: {
        	'completed assignments': '#32CD32',
        	'past due assignments': 'crimson',
        	'to do assignments': 'orange'
        }
    },
    donut: {
    	label: { 
    		format: function(value, ratio, id) {
    			if (value === 1) {
    			return value + ' assignment';
    		} else {
    			return value + ' assignments'
    		}
    		}
        },
        title: "Assignment Status"
    }
});