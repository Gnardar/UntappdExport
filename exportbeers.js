//--Convert data to CSV
function arrayToCSV(objArray) {
     const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
     let str = `${Object.keys(array[0]).map(value => `"${value}"`).join(",")}` + '\r\n';

     return array.reduce((str, next) => {
         str += `${Object.values(next).map(value => `"${value}"`).join(",")}` + '\r\n';
         return str;
        }, str);
 }
 
//--Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
 
//--Load all the beers
function load_beers() {
	clickybtn = (document.querySelector('.button'))
	beer_count = (document.querySelectorAll('.beer-details')).length;
	total_beers = document.querySelector('.stats').children[1].textContent.match(/\d+/)[0];
	clickybtn.click();
	if (beer_count == total_beers) {
		console.log("All done! Move on to the next step!")
	}
	else {
		console.log("found " + beer_count +	" / " + total_beers + ".. Keep running load_beers()")
	};
}

//--Exports Beer List
function export_beers() {
	var beers = document.querySelectorAll('.beer-item');
	var output=[];
	for (var i=0; i<beers.length; i++){
		if((((beers[i].children[1].children[3].textContent).match(/[^ol]\w{3,4} Rating \((\d|\d\.\d+)\)/)))){
			var tmp_my_rate = (((beers[i].children[1].children[3].textContent).match(/[^ol]\w{3,4} Rating \((\d|\d\.\d+)\)/))[1]);
		} else{
			var tmp_my_rate = "";	
		};
		if((((beers[i].children[1].children[3].textContent).match(/\w{6} Rating \((\d|\d\.\d+)\)/)))){
			var tmp_global_rate = (((beers[i].children[1].children[3].textContent).match(/\w{6} Rating \((\d|\d\.\d+)\)/))[1]);
		}else{
			var tmp_global_rate = "";	
		};
		var temp_beer = {
			brewery_name: beers[i].children[1].children[1].textContent,
			beer_name: beers[i].children[1].children[0].textContent,
			beer_style: beers[i].children[1].children[2].textContent,
			my_rating: tmp_my_rate,
			global_rating: tmp_global_rate,
			abv: beers[i].children[2].children[0].innerText,
			ibu: beers[i].children[2].children[1].innerText,
			first_checkin: (beers[i].children[2].children[2].innerText).match(/\d+\/\d+\/\d+/)[0],
			recent_checkin: (beers[i].children[2].children[3].innerText).match(/\d+\/\d+\/\d+/)[0],
			total_checkin: (beers[i].children[2].children[4].innerText).match(/\d+/)[0]
		};
		output.push(temp_beer);
	};
	csvContent = arrayToCSV(output);

	download(csvContent, "beerlist.csv", "text/csv");
	console.log("Found " + output.length + " beers.. Enjoy!");
}


//--Run this until it states it is complete
load_beers();
//--Run this to export Beer Data
export_beers();
	
	
	
	
	
	
	
	
