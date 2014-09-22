
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

//Testing out interactions
/*$("#grid rect").click(function(event){
	console.log("in click event")
	console.log(this)
	console.log(event);
})*/

//initialize the visualization
$(document).ready(function(){
	var grid = new Grid; 

	//Setup svg
	setupSVG(grid);

	//Call function to setup grid
	createGrid(grid);

	//Get first item

})



