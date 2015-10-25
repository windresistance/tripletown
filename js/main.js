var items = ["grass", "bush", "tree", "hut", "house", "bighouse", "castle"];

//Sets up properties for the grid
var Grid = function(){
	return {
		rows: 6,
		cols: 6,
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

//Scales the SVG based on the number of cols and rows
var setupSVG = function(grid){
	var w = grid.cols*grid.width + (grid.cols -1)*grid.spacing + 200 + grid.margin.left + grid.margin.right;
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
		for (var j=0; j < grid.cols; j++){

			//finding the x and y coordinates
			var x = j*(grid.width + grid.spacing);
			var y = i*(grid.height + grid.spacing);
			
			var new_rect = createSVGEl("rect");

			var attrs = {"x":x, "y":y , "height": grid.width, "width": grid.width, "class":"empty" , "col": j, "row": i}

			setAttributes(new_rect, attrs)

			addToSVG("grid", new_rect)

		}
	}

	addInitialItems(grid);
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

	var boxes = grid.rows*grid.cols;
	var lowerBound = Math.floor(boxes*.25);
	var upperBound = Math.floor(boxes*.5);

	var randItems = Math.round(randBetween(lowerBound, upperBound));

	//iterate through item numbers to add
	//initial items
	for (var i=0; i < randItems; i++){
		var x = Math.round(randBetween(0, grid.cols));
		var y = Math.round(randBetween(0, grid.rows));

		$("svg rect[col=" + x + "][row=" + y +"]").attr("class", getItem());
	}
}

var createItemPanel = function(grid){

	var x = grid.cols*grid.width + (grid.cols -1)*grid.spacing + 30;

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

var floodFill = function(node, replace_class, matches, checked) {

	var col = parseInt(node.attr('col'));
	var row = parseInt(node.attr('row'));
	var key = row+"-"+col;

	// if node has already been checked, exit
	if (checked.indexOf(key) >= 0) {
		return;
	}

	// push checked node onto checked array
	checked.push(key);

	// if match, push onto matches array, else stop
	if (node.attr('class') == replace_class) {
		matches.push(node);
	} else {
		return;
	}

	floodFill($("svg rect[col=" + col + "][row=" + (row-1) +"]"), replace_class, matches, checked);  // N
	floodFill($("svg rect[col=" + col + "][row=" + (row+1) +"]"), replace_class, matches, checked);  // S
	floodFill($("svg rect[col=" + (col-1) + "][row=" + row +"]"), replace_class, matches, checked);  // E
	floodFill($("svg rect[col=" + (col+1) + "][row=" + row +"]"), replace_class, matches, checked);  // W

	return;
}

var checkGameOver = function() {
	return ($("svg rect.empty").length == 0);
}

var growItem = function(clickedBox, item){
	console.log('growItem','\nclickedBox:',clickedBox,'\nitem:',item);
	var newClass = item.attr('class');
	var matches = [];
	var checked = [];

	item.attr('class', newClass);  // set clicked box to new item

	floodFill($(item), newClass, matches, checked);

	console.log(matches);

	if (matches.length >= 3) {
		matches.forEach(function(match){
			match.attr('class','empty');
		})
		var nextClass = items.indexOf(item.attr('class')) + 1;
		clickedBox.attr('class', items[nextClass]);

		growItem(item, clickedBox, items[nextClass])
	}
}

//initialize the visualization
$(document).ready(function(){
	var grid = new Grid;
	setupSVG(grid);
	createGrid(grid);
	createItemPanel(grid);

	// on click event
	$('rect').click(function(event){
		var newItem = $('#newItem');  // get new item
		var col = parseInt($(this).attr('col'));
		var row = parseInt($(this).attr('row'));
		
		//var clickedBox = $("svg rect[col=" + col + "][row=" + row +"]");
		
		if ($(this).attr("class") === "empty") {
			// check neighbors
			growItem($(this), newItem);
			// var checked = [];

			// $(this).attr('class',newItem.attr('class'));  // set clicked box to new item

			// floodFill($(this), newItem.attr('class'), matches, checked);

			// if (matches.length >= 3) {
			// 	matches.forEach(function(match){
			// 		match.attr('class','empty');
			// 	})
			// 	var newClass = items.indexOf(newItem.attr('class')) + 1;
			// 	clickedBox.attr('class',items[newClass]);
			// }

			// place newItem
			// $('rect').animate({borderWidth:"2px"});
			// clickedBox.attr("class", newItem.attr('class'));

			// get next newItem
			newItem.attr('class',getItem());

			if('is game over?',checkGameOver()) {
				$('#gameOver').text("GAME OVER!");
			}
		}
	})
})




