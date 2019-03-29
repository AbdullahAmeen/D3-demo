// Module 7 - Creating Buble Chart


// Begine function to hold both container, the Inner Rectengle and finally create a buble chart
window.onload = function(){

	createSVG();
	// Begine Function Creating SVG
	function createSVG(){

		var w = 1329, h = 800; // Width and Height of the main SVG

		//Use d3 selection library to get the body element from the DOM
		var container = d3.select("body")
			.append("svg") //put the new svg in the body
			.attr("width", w) //assign the width
			.attr("height", h) //assign the height
			.attr("class", "container") //always assign a class (as the block name) for styling and future selection
			.style("background-color", "rgba(0,0,0,0.2)"); //only put a semicolon at the end of the block!

		// Creating another svg or a rectengle inside of main SVG
		var innerRect = container.append("rect")
			.datum(550) //a single value is a DATUM
			.attr("width", function(d){ 
				return d * 2.09;
			})
			.attr("height", function(d){ //rectangle height
				return d*1.2; 
			})
			.attr("class", "innerRect") //class name
			.attr("x", 90) //position from left on the x (horizontal) axis
			.attr("y", 70) //position from top on the y (vertical) axis
			.style("fill", "#99e6e6"); //fill color

		// Begine Data Object that we want o make a buble chart from it.
		var countyPop = [
	        { 
	            county: 'Milwaukee',
	            population: 956586
	        },
	        {
	            county: 'Dane',
	            population: 522837
	        },
	        {
	            county: 'Waukesha',
	            population: 396731
	        },
	        {
	            county: 'Brown',
	            population: 258004
	        },
			{
	            county: 'Racine',
	            population: 195140
	        }
	    ];
		// End Data Object that we want o make a buble chart from it.
		
		
		//scale for circles center x coordinate
		var x = d3.scaleLinear() //create the scale
			.range([200, 850]) //output min and max
			.domain([0, 3]); //input min and max

		//find the minimum value of the array
		var minPop = d3.min(countyPop, function(d){
			return d.population;
		});

		//find the maximum value of the array
		var maxPop = d3.max(countyPop, function(d){
			return d.population;
		});

		//scale for circles center y coordinate
		var y = d3.scaleLinear()
			.range([670, 155]) 
			.domain([0, 960000]); // Limit for the vertical axis to show the population numbers

		//color scale generator	
		var color = d3.scaleLinear()
			.range([
				"#feebe2",
				"#ae017e"
			])
			.domain([
				minPop, 
				maxPop
			]);

		var circles = container.selectAll(".circles") //create an empty selection
			
			.data(countyPop) //here we feed in an array
			.enter() //one of the great mysteries of the universe
			.append("circle") //Now you can inspect the HTML-there's some circles:-)
			.attr("class", "circles")
			.attr("id", function(d){
				return d.county;
			})
			
			.attr("r", function(d){ //circle radius
				var area = d.population * 0.014;
				return Math.sqrt(area/Math.PI);
			})
			
			.attr("cx", function(d, i){ //center x coordinate
				return x(i);
			})
			.attr("cy", function(d){ //center y coordinate
				return y(d.population);
			})
			.style("fill", function(d, i){ //add a fill based on the color scale generator
				return color(d.population);
			})
			.style("stroke", "#0b0a0a"); //black circle stroke

		//create y axis generator
		var yAxis = d3.axisLeft(y);

		//create axis g element and add axis
		var axis = container.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(85, -10)")
			.call(yAxis);

		//create a text element and add the title
		var title = container.append("text")
			.attr("class", "title")
			.attr("text-anchor", "middle")
			.attr("x", 610)
			.attr("y", 40)
			.text("The Most Populated Counties in Wisconsin as of December 2018");
			

		//create circle labels
		var labels = container.selectAll(".labels")
			.data(countyPop)
			.enter()
			.append("text")
			.attr("class", "labels")
			.attr("text-anchor", "left")
			.attr("y", function(d){
				//vertical position centered on each circle
				return y(d.population) - 2;
			});

		//first line of label
		var nameLine = labels.append("tspan")
			.attr("class", "nameLine")
			.attr("x", function(d,i){
				return x(i) + Math.sqrt(d.population * 0.015 / Math.PI) + 5;
			})
			.text(function(d){
				return d.county;
			});

		//create format generator
		var format = d3.format(",");

		//second line of label
		var popLine = labels.append("tspan")
			.attr("class", "popLine")
			.attr("x", function(d,i){
				return x(i) + Math.sqrt(d.population * 0.015 / Math.PI) + 5;
			})
			.attr("dy", "21") //vertical offset
			.text(function(d){
				return "Population: " + format(d.population); //use format generator to format numbers
			});
	};
	// End Function Creating SVG
};
// End function to hold both container, the Inner Rectengle and finally create a buble chart