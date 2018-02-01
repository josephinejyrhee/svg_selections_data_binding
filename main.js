// set width, height, margin
var width = 960,
	height = 500,
	// easier/more convenient to store margin variables
	margin = {top: 20, right: 20, bottom: 30, left: 40};

var svg = d3.select('body').append('svg')
	.attr('width', width)
	.attr('height', height + 100);

// reduce our width and height after setting svg width and height
// this changes width and height to account for margins
width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1),
	yScale = d3.scaleLinear().rangeRound([height, 0]);

// create a formatter function for labels at the top of the bars
var formatter = d3.format('.1%');

// create an svg group element and translate its position from origin on top left
var g = svg.append('g')
	// translate(30, 20)
	// string inside string
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// argument dataset is local to main function
// function will set up and draw our chart
// argument 'dataset' located in data.js
// 'dataset' is an array of objects
// each object includes 'letter' and 'frequency'
function main(dataset) {
	console.log(dataset);

	xScale.domain(dataset.map(function(d) {
		return d.letter;
	}));

	yScale.domain([
		0, 
		d3.max(dataset, function(d) { 
			return d.frequency; 
		})]);

	// create x-axis w/ ticks
	g.append('g')
		.attr('class', 'axis axis--x')
		.attr('transform', 'translate(0, ' + height + ')')
		.call(d3.axisBottom(xScale))
		.append('text')
    		.attr('text-anchor', 'end')
    		.attr('x', width/2)
    		.attr('y', 35)
    		.style('font-size', '15px')
    		.text('Letters');
		
	// create y-axis w/ ticks
	g.append('g')
		.attr('class', 'axis axis--y')
		.call(
			// .ticks(10, '%') changes proportions to decimals
			d3.axisLeft(yScale).ticks(10, '%')
		)
		// create y-axis label
		.append('text')
			// rotates y-axis label counter-clockwise 90 degrees
			.attr('transform', 'rotate(-90)')
			.attr('y', 6)
			.attr('dy', '0.71em')
			.attr('text-anchor', 'end')
			.style('font-size', '15px')
			.text('Frequency');

	// create svg rectangle elements for each data point
	// create bar plot
	g.selectAll('.bar')
		.data(dataset)
		.enter().append('rect')
		.attr('class', 'bar')
		// d = data
		// xScale are the letters
		.attr('x', function(d) {
			return xScale(d.letter);
		})
		// yScale are the frequency of letters
		.attr('y', function(d) {
			return yScale(d.frequency);
		})
		.attr('width', xScale.bandwidth())
		.attr('height', function(d) {
			return height - yScale(d.frequency);
		});

	// create labels for each axis
	g.selectAll('.bar-label')
		.data(dataset)
		.enter().append('text')
		.text(function(d) {
			return formatter(d.frequency);
		})
		.attr('transform', 'translate(0,' + (-2) + ')')
		.attr('class', 'bar-label')
		.attr('x', function(d) {
			return xScale(d.letter);
		})
		.attr('y', function(d) {
			return yScale(d.frequency);
		});
	


}
//
main(data);