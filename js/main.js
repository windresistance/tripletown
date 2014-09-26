
//Sets up properties for the grid
var Grid = function(){
	
	return {
		rows: 6,
		columns: 6,
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

//Scales the SVG based on the number of columns and rows
var setupSVG = function(grid){
	var w = grid.columns*grid.width + (grid.columns -1)*grid.spacing + 200 + grid.margin.left + grid.margin.right;
	var h = grid.rows*grid.height + (grid.rows - 1)*grid.spacing + grid.margin.top + grid.margin.bottom;

	$("svg#game").attr("width", w);
	$("svg#game").attr("height", h);
}

//Adds squares to svg to create a grid;
var createGrid = function(grid){

	var gridEl = $("#grid")

	var gridGroup = createSVGEl("g"); 

	var gridAttrs = {
		"id": "grid",
		"transform": "translate(" + grid.margin.left + ", " + grid.margin.top + ")"
	}

	setAttributes(gridGroup, gridAttrs)

	addToSVG("game", gridGroup);

	for (var i =0; i < grid.rows; i++){
		for (var j=0; j < grid.columns; j++){

			//finding the x and y coordinates
			var x = j*(grid.width + grid.spacing);
			var y = i*(grid.height + grid.spacing);
			
			var new_rect = createSVGEl("rect");

			var attrs = {"x":x, "y":y , "height": grid.width, "width": grid.width, "class":"empty" , "column": j, "row": i}

			setAttributes(new_rect, attrs)

			addToSVG("grid", new_rect)

		}
	}
}

var getItem = function() {
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

function randBetween(beg,end) {
	var num;	// declare number to return
	
	// generate random number
	if (typeof(beg) == "number" && typeof(end) == "number") {
		num = Math.random()*(end-beg) + beg;
	} else if (typeof(beg) == "number") {
		num = Math.random()*beg;
	} else {
		num = Math.random();
	}

	return num;
	
}	// end function


var addInitialItems = function(grid){

	var boxes = grid.rows*grid.columns;
	var lowerBound = Math.floor(boxes*.25);
	var upperBound = Math.floor(boxes*.5);

	var randItems = Math.round(randBetween(lowerBound, upperBound));

	//iterate through item numbers to add
	//initial items
	for (var i=0; i < randItems; i++){
		var x = Math.round(randBetween(0, grid.columns));
		var y = Math.round(randBetween(0, grid.rows));

		$("svg rect[column=" + x + "][row=" + y +"]").attr("class", getItem());
	}
}

var createItemPanel = function(grid){

	var x = grid.columns*grid.width + (grid.columns -1)*grid.spacing + 30;

	var y = 0;

	var panelGroup = createSVGEl("g");

	var panelGroupAttrs = {
		"id": "panel",
		"transform": "translate(" + (x + grid.margin.left) + ", " + (y + grid.margin.top) + ")"
	}

	setAttributes(panelGroup, panelGroupAttrs);

	addToSVG("game", panelGroup)


	var panelTitle = createSVGEl("text");

	var panelTitleAttrs = {
		x: 0,
		y: 18
	}

	$(panelTitle).text("Next item");

	setAttributes(panelTitle, panelTitleAttrs)

	addToSVG("panel", panelTitle)

	var newItem = createSVGEl("rect");

	var newItemAttrs = {
		x: 0,
		y: 40,
		"id": "newItem",
		width: grid.width,
		height: grid.height,
		"class": getItem()
	}

	setAttributes(newItem, newItemAttrs);

	addToSVG("panel", newItem)

}

var createSVGEl = function(type){
	return document.createElementNS("http://www.w3.org/2000/svg", type)
}

var addToSVG = function(id, element){
	document.getElementById(id).appendChild(element);
}

var setAttributes = function(element, attrs){
	for (var k in attrs){
		element.setAttribute(k, attrs[k]);
	}
}

//initialize the visualization
$(document).ready(function(){
	var grid = new Grid; 
	
	//Setup svg
	setupSVG(grid);
	
	//Call function to setup grid
	createGrid(grid);

	addInitialItems(grid);

	createItemPanel(grid);
	
	// on click event
	$('rect').click(function(event){
		var col = this.getAttribute('column');
		var row = this.getAttribute('row');
		
		var clickedBox = $("svg rect[column=" + col + "][row=" + row +"]");
		
		if (clickedBox.attr("class") === "empty") {
			
			// place item
			$('rect').animate({borderWidth:"2px"});
			
			clickedBox.attr("class", $('#newItem').attr('class'));
			
			// check neighbors...
			
			
			// get next item
			$('#newItem').attr('class',getItem());
		}
			
		
		
	})
})




