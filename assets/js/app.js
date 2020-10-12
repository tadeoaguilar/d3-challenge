// @TODO: YOUR CODE HERE!
// Step 1: Set up our chart
//= ================================



var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


d3.csv("assets/data/data.csv").then(function(stateData) {
 
    stateData.forEach(element => {
        
        element.age = +element.age;
        element.smokes = +element.smokes;
    });
    console.log(stateData)
  // Add X axis
  var x = d3.scaleLinear()
  
    .domain(d3.extent(stateData, d => d.age))
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));


  // Add Y axis
  var y = d3.scaleLinear()
    .domain(d3.extent(stateData, d => d.smokes))
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(stateData)
    .enter()
    .append("circle")
      
    //.attr("cx", d => x(d.age) )
    //  .attr("cy", d => y(d.smokes))
    
      .attr("r", 5)

      .style("fill", "#69b3a2")
  
      var circlesGroup = svg.selectAll("circle")
      circlesGroup.on("mouseover", function() {
        toolTip.show(d, this)
        d3.select(this)
          .transition()
          .duration(1000)
          .attr("r", 5)
          .attr("fill", "lightblue");
      })
        .on("mouseout", function() {
          d3.select(this)
          
            .transition()
            .duration(1000)
            .attr("r", 10)
            .attr("fill", "red");

            toolTip.hide(d);
        });
  
      svg.selectAll("circle")
        .transition()
        .duration(1000)
        .attr("cx", d => x(d.age) )
        .attr("cy", d => y(d.smokes));
    
     
        
        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Smokes");   
    
        svg.append("text")             
        .attr("transform",
              "translate(" + (width/2) + " ," + 
                             (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Age");

});

