import {route_colors,route_numbers,route_names,start_stops,end_stops,no_of_stops} from  '/assets/js/Find_my_train_modules/constants.js';

export function draw_train_tracks(ctx, dist_bet_stops) {


    //ctx.fillStyle = "#f2f2f2";
    //ctx.fillRect(0, 0, 1200, 1400);
	

	
	for (var i=0 ; i < route_numbers.length; i++){
	    
	    ctx.strokeStyle=route_colors[i];
	    ctx.fillStyle=route_colors[i];
	    
	    //Name start stops
	    ctx.font = "20px Arial";
	    ctx.fillText(start_stops[i][1], 47 + (2*i)*100 +15,50);
	    if (start_stops[i][0]==2){
		ctx.fillText(start_stops[i][2], 47 + (2*i)*100 +15,70);}

	    //Draw stations segments

	    for (var j=0; j<2; j++){
		ctx.beginPath();
		ctx.lineWidth = 30;
		ctx.lineCap = 'round';
		ctx.moveTo(50 + (2*i+j)*100, 110);
		ctx.lineTo(50 +  (2*i+j)*100, 110+(no_of_stops[i]-1)*(dist_bet_stops));
		ctx.stroke();
		ctx.closePath();


		//Draw tracks 
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.lineCap = 'butt';
		if (j==0){var l=1;}
		else{var l=-1;}
		ctx.moveTo(50 + 30*(l) + (2*i+j)*100, 110-10);
		ctx.lineTo(50 + 30*(l)+ (2*i+j)*100, 110+(no_of_stops[i]-1)*(dist_bet_stops)+10);
		ctx.stroke();
		ctx.closePath();
		   
		
		//Draw stops
		for (var k=0; k < no_of_stops[i]; k++){
		    ctx.beginPath();
		    ctx.lineWidth = 10;
		    ctx.fillStyle='white';
		    ctx.arc(50+  (2*i+j)*100, 110 + k*dist_bet_stops, 10, 0, Math.PI * 2, true);
		    
		    ctx.fill();
		   

		}
               
	        //Draw direction arrows	
		if (l==1){

		    arrowhead(ctx, 50 + (2*i+j)*100, 110+(no_of_stops[i]-1)*(dist_bet_stops)+5,-8,6,route_colors[i]);
		
		    arrowhead(ctx, 50 + (2*i+j)*100, 110+5,-8,6,route_colors[i]);
		}
		else{
		    arrowhead(ctx, 50 + (2*i+j)*100,110+(no_of_stops[i]-1)*(dist_bet_stops)-5,8,6,route_colors[i]);
		    arrowhead(ctx, 50 + (2*i+j)*100,110-5,8,6,route_colors[i]);
		}
	    }

	   


	    //Name end stops
	    ctx.fillStyle=route_colors[i];
	    ctx.font = "20px Arial";
	    if (end_stops[i][0]==2){
		    ctx.fillText(end_stops[i][1], 47 + (2*i)*100 +15,140+(no_of_stops[i]-1)*(dist_bet_stops)+20);}
	    ctx.fillText(end_stops[i][2], 47 + (2*i)*100 +15,160+(no_of_stops[i]-1)*(dist_bet_stops)+20);

	}


	
    }


// A utility function to draw triangular arrow heads

function arrowhead(ctx, arrow_head_x, arrow_head_y,
		     height, half_base, color) {
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.moveTo(arrow_head_x, arrow_head_y);
  ctx.lineTo(arrow_head_x - half_base, arrow_head_y + height);
  ctx.lineTo(arrow_head_x + half_base, arrow_head_y + height);
  ctx.fill();
}

// A utility function to draw rounded rectangles


function roundedRect(ctx, x, y, width, height, radius,color) {
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.closePath();
  ctx.fill();
}


export function engine_icon(x,y,engine_name)
{
    //train icon
 

    var train_main = new fabric.Rect({
	width: 20,
	height: 25,
	left: x,
	top: y,
	fill: 'black',
	rx: 4,
	ry: 4,
	hasControls : false,
	hasBorders : false,
	selectable : false,
	evented : true,
	name : `${engine_name}_main`,
	lockMovementX : true,
	lockMovementY : true,
	lockScalingY : true,
	lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true,


    });

    var train_part = new fabric.Rect({
	width: 20,
	height: 11,
	left: x,
	top: y+7,
	fill: 'rgb(217, 217, 217)',
	hasControls : false,
	hasBorders : false,
	selectable : false,
	evented : true,
	name :  `${engine_name}_part`,
	lockMovementX : true,
	lockMovementY : true,
	lockScalingY : true,
	lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true
	


    });

 
  //train headlight
    var train_headlight = new fabric.Circle({
	radius:2,
	fill: 'yellow',
	left: x+7.5,
	top:y+2.5,
	hasControls : false,
	hasBorders : false,
	selectable : false,
	evented : true,
	name :  `${engine_name}_headlight`,
	lockMovementX : true,
	lockMovementY : true,
	lockScalingY : true,
	lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true

    });

    


   var engine = new fabric.Group([train_main, train_part, train_headlight],{
  left:x,
  top:y,
    subTargetCheck: true,
    hasControls : false,
    hasBorders : false,
    selectable : false,
    evented : true,
    lockMovementX : true,
    lockMovementY : true,
    lockScalingY : true,
    lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true,
	name :  `${engine_name}`
	
    
   });
    engine.property="engine";

    return engine;

}




export function train_stop(train_index,dir_index,stop_index,rad,stop_name,dist_bet_stops){    
    var stop = new fabric.Circle({
	radius:rad,
	fill: 'rgba(0,0,0,0)',
	left: 39.5+((2*train_index)+dir_index)*100,
	top:99.5+(stop_index*dist_bet_stops),
	hasControls : false,
	hasBorders : false,
	selectable : false,
	evented : true,
	name : stop_name,
	lockMovementX : true,
	lockMovementY : true,
	lockScalingY : true,
	lockUniScaling : true,
	lockRotation : true,
	transparentCorners: true
    });
    stop.property="stop";
    return stop
}


