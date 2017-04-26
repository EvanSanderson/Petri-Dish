(function() {

  // Fake JSON data
  var json = {"teams": {
    "green": 170, "blue": 393, "red": 12, "yellow": 9, "gray": 89, "orange": 192, "black": 32, "white": 170, "pink": 25, "purple": 42, "teal": 12
  }};

	// D3 Bubble Chart

	var diameter = Math.min(document.getElementById('graph').clientWidth, window.innerHeight - document.querySelector('header').clientHeight);

	var svg = d3.select('#graph').append('svg')
					.attr('width', diameter)
					.attr('height', diameter);

	var bubble = d3.layout.pack()
				.size([diameter, diameter])
				.value(function(d) {return d.size;})
         // .sort(function(a, b) {
				// 	return -(a.value - b.value)
				// })
				.padding(7);

  // generate data with calculated layout values
  var nodes = bubble.nodes(processData(json))
						.filter(function(d) { return !d.children; }); // filter out the outer bubble

  var vis = svg.selectAll('circle')
					.data(nodes).enter().append('g')
					.attr("class", "node");

  var duration = 5000;
		var delay = 5;
  var button = document.getElementById('clickme');
  button.addEventListener('click', function(){
  })


	vis.append('text')
	.attr('transform', function(d) {
	return 'translate(' + d.x + ',' + d.y + ')'; })
	.attr('r', function(d) { return d.r; })
	.attr('class', function(d) { return d.className; })
	.text(function(d) { return d.size});

vis.append('circle')
			.attr('transform', function(d) {
    return 'translate(' + d.x + ',' + d.y + ')'; })
			.attr('r', function(d) { return d.r; })
			.attr('class', function(d) { return d.className; })
    .on("click", function(d){
			console.log("loaded!!!!!")
    var x_change = Math.floor(Math.random() * 500) + 1;
    var y_change = Math.floor(Math.random() * 500) + 1;
    d3.select(this)
    .transition().duration(duration).delay(delay)
      .attr("transform", function(d){
				return 'translate(' + (d.x - x_change) + ',' + (d.y - y_change) + ')';
			})
  })


	svg.selectAll('circle')
	.transition()
	.each("start", function() {
		d3.select(this)
		.call(movement, 2000);
	 })


	 function movement(selection, duration) {
		 var x_change = getRandoNumber();
		 var y_change = getRandoNumber();
		 var small_x = getSmallerRandoNumber();
		 var small_y = getSmallerRandoNumber();
		 selection.transition()
		 .duration(duration)
		 .attr("transform", function(d){
			return 'translate(' + (d.x - x_change) + ',' + (d.y - x_change) + ')';
			})
			.attr("r", function(d) { return d.r - small_x })
		 .transition()
		 .attr("transform", function(d){
			return 'translate(' + (d.x - y_change) + ',' + (d.y - y_change) + ')';
		})
		.attr("r", function(d) { return d.r - small_y })
		 console.log("HEYYYYYY")
		 setTimeout(function() { movement(selection,duration); }, (Math.random() + 1) * duration);
	 }

function getRandoNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

function getSmallerRandoNumber() {
	return Math.floor(Math.random() * 20) + 1;
}


  function processData(data) {
    var obj = data.teams;

    var newDataSet = [];

    for(var prop in obj) {
      newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
    }
    return {children: newDataSet};
  }
var circles = document.querySelectorAll('circle');
for(var i = 1; i < circles.length; i++){
	circles[i].innerHTML = "FAAARRRRTTTT";
}
})();
