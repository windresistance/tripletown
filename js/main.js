
//Sets up properties for the grid
var Grid = function(){
	
	return {
	rows: 10,
	columns: 10,
	width: 60,
	height: 60,
	spacing: 10
	};	
}


//SUSIE IS MAKING CHANGES TO TEST OUT GIT

//Scales the SVG based on the number of columns and rows
var setupSVG = function(grid){
	var w = grid.columns*grid.width + (grid.columns -1)*grid.spacing;
	var h = grid.rows*grid.height + (grid.rows - 1)*grid.spacing;

	$("svg#grid").attr("width", w);
	$("svg#grid").attr("height", h);
}

//Adds squares to svg to create a grid;
var createGrid = function(grid){

	var gridEl = $("#grid")

	for (var i =0; i < grid.rows; i++){
		for (var j=0; j < grid.columns; j++){

			//finding the x and y coordinates
			var x = j*(grid.width + grid.spacing);
			var y = i*(grid.height + grid.spacing);

			var new_rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

			var attrs = {"x":x, "y":y , "height": grid.width, "width": grid.width, "class":"square" , "column": j, "row": i}

			for (var k in attrs){
				new_rect.setAttribute(k, attrs[k]);
			}

			document.getElementById("grid").appendChild(new_rect)

		}
	}
}

//initialize the visualization
$(document).ready(function(){
	var grid = new Grid; 

	//Setup svg
	setupSVG(grid);

	//Call function to setup grid
	createGrid(grid);

	//Get first item
	$('#nextItem').html(getItem());
	
	
	$('rect').click(function(event){
		$('#nextItem').html(getItem());
		console.log(
			this.getAttribute('row'),
			this.getAttribute('column')
			// event.currentTarget.attributes.row.value, 
			// event.currentTarget.attributes.column.value
		);
	})
})

function getItem() {
	var item = '';
	var rand = Math.round(Math.random() * 100);
	
	if (rand >= 0 && rand <= 70) {
		item = "grass";
	} else if (rand > 70 && rand <= 94) {
		item = "bush";
	} else if (rand > 94 && rand <= 99) {
		item = "tree";
	} else if (rand > 99 && rand <= 100) {
		item = "hut";
	}
	
	return item;
}
