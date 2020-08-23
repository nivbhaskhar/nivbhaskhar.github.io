import {no_of_stops,stop_coordinates, stop_distances, route_index, dir, dist_bet_stops, stops} from  '/assets/js/Find_my_train_modules/constants.js';

import {engine_icon} from '/assets/js/Find_my_train_modules/static_train_tracks.js';




function plot_current_trains(canvas, plot_data){
    //console.log(JSON.stringify(plot_data));
    for (let vehicle_no = 0; vehicle_no < plot_data.length; vehicle_no ++){
	let vehicle=plot_data[vehicle_no];
	if (vehicle.dir ==1){
	    var l=-1;
	}
	else{
	    var l=1;
	}
	let engine=engine_icon(50+30*l + (2*vehicle.route_index+vehicle.dir)*100-10, 110+((vehicle.nearest_stop+vehicle.d)*(dist_bet_stops)-12.5), `#${vehicle.vehicle_id}`);
	canvas.add(engine);
	engine.on('mouseup', function()
		       {
			   if (vehicle.dir==0){
			       var approaching_stop = stops[vehicle.route_index][vehicle.nearest_stop+1];
			   }
			   else{
			       var approaching_stop = stops[vehicle.route_index][vehicle.nearest_stop];
			   }
			   document.querySelector('#vehicle').innerHTML = `${engine.name} approaching ${approaching_stop}`;
		       });

    }

}


// Element of current_vehicles looks like {"seconds_since_report":9,"predictable":true,"id":"204","longitude":-118.285589,"run_id":"805_1_var0","heading":270,"latitude":34.061904,"route_id":"805"}
// Want element of plot_data to look like  {'route_index':0/1/2/3/4/5, 'dir':0/1, 'nearest_stop': r, 'd': 0<d<1}

export function process_and_plot_current_vehicle_data(canvas,current_vehicles){
    var plot_data = [];
    for (let vehicle_index = 0;vehicle_index <current_vehicles.length; vehicle_index ++){
	let vehicle=current_vehicles[vehicle_index];
	let adj_station_details = find_adjacent_stations([vehicle.latitude, vehicle.longitude],route_index[vehicle.route_id]);

	if (adj_station_details[0]!=null){
	    if ("run_id" in vehicle){ 
		let vehicle_plot_data = {'vehicle_id': vehicle.id,
					 'route_index': route_index[vehicle.route_id],
					 'dir': dir[vehicle.run_id[4]],
					 'nearest_stop': adj_station_details[0],
					 'd': adj_station_details[1]/stop_distances[route_index[vehicle.route_id]][adj_station_details[0]]
					};
		plot_data.push(vehicle_plot_data);
	    }
	}
	
    }


//Draw trains from plot-data
    plot_current_trains(canvas, plot_data);
    
}




function find_adjacent_stations(point,route_index){
    var orthogonal_dist=Math.pow(10, 1000);
    var d=null;
    var prev_adj_station = null;
    for (var pos=0; pos < no_of_stops[route_index]-1; pos ++){
	let start_station = stop_coordinates[route_index][pos];
	let end_station =  stop_coordinates[route_index][pos+1];
	let dist_bet_stations = stop_distances[route_index][pos];
	let orthogonal_projection_details = orthogonal_projection(point,start_station,end_station, dist_bet_stations);

	if (orthogonal_projection_details[0]){
	    if (orthogonal_projection_details[1]<=orthogonal_dist){
		orthogonal_dist=orthogonal_projection_details[1];
		d=orthogonal_projection_details[2];
		prev_adj_station = pos;
	    }    	    
	}

    }
    if (prev_adj_station==null){
	d=Math.pow(10,1000);
	for(var i=0; i<no_of_stops[route_index]-1;i++){
	    let temp_station_x = stop_coordinates[route_index][i][0];
	    let temp_station_y = stop_coordinates[route_index][i][1];
	    let distance = Math.sqrt(Math.pow(temp_station_x-point[0],2) + Math.pow(temp_station_y-point[1],2));
	    if (distance < d){
		d = distance;
		prev_adj_station = i;
	    }
	} 
    }

    return [prev_adj_station, d]

    
    
}


function orthogonal_projection(point, start_station, end_station, dist_bet_stations){
    //Translate by - start_station
    var new_end = [end_station[0]-start_station[0], end_station[1]-start_station[1]];
    var new_point = [point[0]-start_station[0], point[1]-start_station[1]];
    //var unit_vector_along_stations = [new_end[0]/dist_bet_stations, new_end[1]/dist_bet_stations];
    var signed_length_of_projection = (new_point[0]*new_end[0] + new_point[1]*new_end[1])/dist_bet_stations;
    var in_opp_direction = (signed_length_of_projection < 0);
    if (in_opp_direction){
	var is_in_between = false;
    }
    else{
	var is_in_between = (signed_length_of_projection<dist_bet_stations);        

    }
    var new_projection_point = [(signed_length_of_projection*new_end[0]/dist_bet_stations),
			    (signed_length_of_projection*new_end[1]/dist_bet_stations)];
    var orthogonal_distance = Math.sqrt(Math.pow(new_point[0]-new_projection_point[0],2) + Math.pow(new_point[1]-new_projection_point[1],2));
    return [is_in_between, orthogonal_distance, signed_length_of_projection]

}




