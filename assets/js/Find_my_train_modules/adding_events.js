import {route_colors,route_numbers,route_names,no_of_stops,dist_bet_stops,start_stops,end_stops, stops} from  '/assets/js/Find_my_train_modules/constants.js';


import {draw_train_tracks,engine_icon,train_stop} from '/assets/js/Find_my_train_modules/static_train_tracks.js';

import {process_and_plot_current_vehicle_data} from '/assets/js/Find_my_train_modules/API_processing.js';

function add_scroll_bars(){
    	var h1= document.getElementById("headerbar_id").offsetHeight;
	var w1 =  document.getElementById("headerbar_id").offsetWidth;
	var h2= document.getElementById("navbar_id").offsetHeight;
	var w2 =  document.getElementById("navbar_id").offsetWidth;
	var w = window.innerWidth;
	var h = window.innerHeight;
	document.getElementById("scrollcontainer_id").style.height = `${(h-h1-h2-5)}px`;
	document.getElementById("scrollcontainer_id").style.width = `${(w-w1-w2-5)}px`;
    
    
}

function not_supported(){
    document.getElementById("scrollcontainer_id").style.width="100%";
    document.getElementById("scrollcontainer_id").style.margin="auto";
    document.getElementById("scrollcontainer_id").innerHTML = "<p style='text-align:center;margin-top: 100px; color: red; width: 100%'> Sorry! Not supported on touch devices. Try it from a desktop/laptop :) </p>" ;
   
   
    

}



document.addEventListener('DOMContentLoaded', function() {

    
    
    window.addEventListener("touchstart", not_supported);
    window.addEventListener("touchend", not_supported);


    //draw static train-tracks
    var ctx = document.getElementById('trains_tracks').getContext('2d');
    draw_train_tracks(ctx,dist_bet_stops);

    //Fabric canvas
    var canvas = new fabric.Canvas('trains',
				   {selection: false,
				    controlsAboveOverlay: true,
				    centeredScaling: true,
				       allowTouchScrolling: true});
    canvas.selection = false;
    canvas.hoverCursor = 'pointer';

    //Add Mouseover event to see stop names
    see_stop_names(canvas);

    
    //Draw current trains on button click
    document.querySelector('#current_trains_cumulative').addEventListener('click', current_trains_cumulative.bind(this, canvas), false);

 

    
});


function display_stop_name(stop_name) {document.querySelector('#stop_details').innerHTML = stop_name;}
function clear_field() {document.querySelector('#stop_details').innerHTML = '';}

function clear_old_trains(canvas){
    var objects = canvas.getObjects();
    for (var i = 0; i < objects.length; i++) {
	if (objects[i].property=="engine"){
	    canvas.remove(objects[i]);
	}
    }

}



function current_trains_cumulative(canvas){

    //Clear display-info
    document.querySelector('#vehicle').innerHTML = "";

    //Clear old trains
    clear_old_trains(canvas);

    

    
    fetch('https://api.metro.net/agencies/lametro-rail/vehicles/')
	.then(
            //Get data. Catch request errors
	    function(response){
		if (!response.ok) {
		    throw new Error(`HTTP error! status: ${response.status}`);
		}	
		else {
		    return response.json();
		}
	    })
        .then(
            //Do initial API data processing
	    function(initial_data){
		var current_vehicles=[];
		for (let index = 0; index < initial_data.items.length; index++)
		{
		    let vehicle = initial_data.items[index];
		    if (vehicle.predictable){
			current_vehicles.push(vehicle);
		    }
		}
		//Catch Error - no vehicles
		if (initial_data.items.length==0){
		    throw new Error("API down. No current predictable vehicles");
		}
		else{return current_vehicles;}
	    })
	.then(process_and_plot_current_vehicle_data.bind(null,canvas))
	.catch(e => {
	    alert('Error! Try again shortly. Details:' + e.message);
	});

    
}

function see_stop_names(canvas){
    for (let i=0 ; i < route_numbers.length ; i++){
	for (let j=0; j<2; j++){
	    for (let k=0; k < no_of_stops[i]; k++){
		let stop = train_stop(i,j,k,10,stops[i][k],dist_bet_stops);
		canvas.add(stop);
		stop.on({'mouseover': display_stop_name.bind(null,stop.name),
			 'mouseup': display_stop_name.bind(null,stop.name),
			 'mouseout':clear_field.bind(null) });
		
	    }
	}
	
    }       

}




