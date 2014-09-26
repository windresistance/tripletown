
//Sets up properties for the grid
var Grid = function(){
	
	return {
	rows: 10,
	columns: 10,
	width: 60,
	height: 60,
	spacing: 10,
	margin: {
		top: 50,
		right: 0,
		bottom: 50,
		left: 50
	}
	};	
}


//SUSIE IS MAKING CHANGES TO TEST OUT GIT

//Scales the SVG based on the number of columns and rows
var setupSVG = function(grid){
	var w = grid.columns*grid.width + (grid.columns -1)*grid.spacing + 100 + grid.margin.left + grid.margin.right;
	var h = grid.rows*grid.height + (grid.rows - 1)*grid.spacing + grid.margin.top + grid.margin.bottom;

	$("svg#game").attr("width", w);
	$("svg#game").attr("height", h);
}

//Adds squares to svg to create a grid;
var createGrid = function(grid){

	var gridEl = $("#grid")

	var gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g"); 

	gridGroup.setAttribute("id", "grid");
	gridGroup.setAttribute("transform", "translate(" + grid.margin.left + ", " + grid.margin.top + ")")

	document.getElementById("game").appendChild(gridGroup)

	for (var i =0; i < grid.rows; i++){
		for (var j=0; j < grid.columns; j++){

			//finding the x and y coordinates
			var x = j*(grid.width + grid.spacing);
			var y = i*(grid.height + grid.spacing);
			
			var new_rect = createSVGEl("rect");

			var attrs = {"x":x, "y":y , "height": grid.width, "width": grid.width, "class":"square" , "column": j, "row": i}

			for (var k in attrs){
				new_rect.setAttribute(k, attrs[k]);
			}

			addToSVG("game", new_rect)

		}
	}
}

var createItemPanel = function(grid){

	var x = grid.columns*grid.width + (grid.columns -1)*grid.spacing + 30;

	var y = 0;

	var panelGroup = createSVGEl("g");

	panelGroup.setAttribute("id", "panel");
	panelGroup.setAttribute("transform", "translate(" + (x + grid.margin.left) + ", " + (y + grid.margin.top) + ")")

	addToSVG("game", panelGroup)


}

var createSVGEl = function(type){
	return document.createElementNS("http://www.w3.org/2000/svg", type)
}

var addToSVG = function(id, element){
	document.getElementById(id).appendChild(element);
}

//initialize the visualization
$(document).ready(function(){
	var grid = new Grid; 
	
	//Setup svg
	setupSVG(grid);
	
	//Call function to setup grid
	createGrid(grid);

	createItemPanel(grid);
	
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

// NICK ADDED THIS HAHAHA!!!
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
