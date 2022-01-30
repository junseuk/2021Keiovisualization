// Dimensions of sunburst.
let width = 750;
let height = 600;
let radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
let b = {
  w: 150, h: 25, s: 5, t: 10
};

// Mapping of step names to colors.
let colors = {
  "Rock": "#09E5DB",
  "Pop": "#EFC94C",
  "Dance": "#E27A3F",
  "Ballad": "#0BB000",
  "Hip Hop": "#FF0000",
  "Alternative": "#0741F5",
  "Jazz": "#B637AF",
  "Justhis": "#D52828",
  "Geeks": "#D52828",
  "Kim Ximya":"#D52828",
  "DPR Live": "#D52828",
  "Giriboy": "#D52828",
  "Kanye West": "#D52828",
  "Code Kunst": "#D52828",
  "E Sens": "#D52828",
  "Skizzy Mar": "#D52828",
  "Passport To Stockholm":"#2F55CD",
  "Nothing But Thieves":"#2F55CD",
  "John Mayer":"#2F55CD",
  "Sick Puppies": "#2F55CD",
  "My Chemical Romanc":"#2F55CD",
  "Houses":"#2F55CD",
  "Coldplay":"#2F55CD",
  "Muse":"#2F55CD",
  "Thirty Seconds To Mars": "#2F55CD",
  "IUs": "#009605",
  "James Arthur": "#009605",
  "Yoon Jong Shin":"#009605",
  "Jung Seung Hwan":"#009605",
  "Skizzy Mars":"#9C8D1F",
  "Rihanna":"#9C8D1F",
  "Troye Sivan":"#9C8D1F",
  "Oh Wonder":"#9C8D1F",
  "Justin Bieber":"#9C8D1F",
  "Ady Suleiman":"#9C8D1F",
  "Gnash":"#9C8D1F",
  "My Chemical Romance": "#1DA19B",
  "One Ok Rock":"#1DA19B",
  "Alabama Shakes": "#1DA19B",
  "IU":"#BF6800",
  "Lee Konitz": "#731176",
  "Various Artists": "#731176",
  "Oh Wonders":"#831A15",
  "America":"#04256F",
  "Better Days":"#04256F",
  "Broken Machine":"#04256F",
  "Continuum":"#04256F",
  "Dressed Up As Lift":"#04256F",
  "Number Three":"#04256F",
  "A Quiet Darkness":"#04256F",
  "XandY":"#04256F",
  "The 2nd Law":"#04256F",
  "Real":"#046F08",
  "Night Letter":"#046F08",
  "Say You Won't Let Go":"#046F08",
  "行步 2011 尹鍾信":"#046F08",
  "行步 2012 尹鍾信":"#046F08",
  "行步 2013 尹鍾信":"#046F08",
  "行步 2014 尹鍾信":"#046F08",
  "行步 2015 尹鍾信":"#046F08",
  "行步 2017 尹鍾信":"#046F08",
  "Voice":"#046F08",
  "Chat Shire":"#6F3504",
  "Crumple":"#6F0404",
  "Flight":"#6F0404",
  "American Dream":"#6F0404",
  "Ye":"#6F0404",
  "Coming To You Live":"#6F0404",
  "Her":"#6F0404",
  "Moonshine":"#6F0404",
  "Graduation":"#6F0404",
  "Fireworks":"#6F0404",
  "4 The Youth":"#6F0404",
  "Alone Together":"#6F6D04",
  "Anti":"#6F6D04",
  "Blue Neighbourhood":"#6F6D04",
  "Heart Hope":"#6F6D04",
  "Oh Wonders":"#6F6D04",
  "Purpose":"#6F6D04",
  "Running Away":"#6F6D04",
  "This is My EP":"#6F6D04",
  "Us":"#6F6D04",
  "The Black Parade":"#046F5F",
  "Danger Days:The True Lives Of The Fabulous Killjoys":"#046F5F",
  "Gimme All Your Love":"#046F5F",
  "Niche Syndrome":"#046F5F",
  "Brazilian Serenade":"#3E046F",
  "This Is Venus Jazz 80 Gold Discs":"#3E046F",
};

// Total size of all segments; we set this later, after loading the data.
let totalSize = 0; 

let vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

let partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });

let arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

let text = "Alternative-Thirty Seconds To Mars-America,12\n\
Alternative-Passport To Stockholm-Better Days,1\n\
Alternative-Nothing But Thieves-Broken Machine,15\n\
Alternative-John Mayer-Continuum,1\n\
Alternative-Sick Puppies-Dressed Up As Lift,2\n\
Alternative-My Chemical Romanc-Number Three,2\n\
Alternative-Houses-A Quiet Darkness,1\n\
Alternative-Coldplay-XandY,1\n\
Alternative-Muse-The 2nd Law,1\n\
Ballad-IUs-Real,1\n\
Ballad-IUs-Night Letter,1\n\
Ballad-James Arthur-Say You Won't Let Go,1\n\
Ballad-Yoon Jong Shin-行步 2011 尹鍾信,3\n\
Ballad-Yoon Jong Shin-行步 2012 尹鍾信,1\n\
Ballad-Yoon Jong Shin-行步 2013 尹鍾信,6\n\
Ballad-Yoon Jong Shin-行步 2014 尹鍾信,1\n\
Ballad-Yoon Jong Shin-行步 2015 尹鍾信,3\n\
Ballad-Yoon Jong Shin-行步 2017 尹鍾信,5\n\
Ballad-Jung Seung Hwan-Voice,6\n\
Dance-IU-Chat Shire,2\n\
Hip Hop-Code Kunst-Crumple,1\n\
Hip Hop-E Sens-Flight,1\n\
Hip Hop-Skizzy Mar-American Dream,1\n\
Hip Hop-Kanye West-Ye,7\n\
Hip Hop-DPR Live-Coming To You Live,7\n\
Hip Hop-DPR Live-Her,5\n\
Hip Hop-Kim Ximya-Moonshine,11\n\
Hip Hop-Giriboy-Graduation,10\n\
Hip Hop-Geeks-Fireworks,16\n\
Hip Hop-Justhis-4 The Youth,22\n\
Pop-Skizzy Mars-Alone Together,1\n\
Pop-Rihanna-Anti,1\n\
Pop-Troye Sivan-Blue Neighbourhood,4\n\
Pop-Oh Wonder-Heart Hope,1\n\
Pop-Oh Wonder-Oh Wonders,2\n\
Pop-Justin Bieber-Purpose,1\n\
Pop-Ady Suleiman-Running Away,1\n\
Pop-Ady Suleiman-This is My EP,1\n\
Pop-Gnash-Us,1\n\
Rock-My Chemical Romance-The Black Parade,2\n\
Rock-My Chemical Romance-Danger Days:The True Lives Of The Fabulous Killjoys,4\n\
Rock-Alabama Shakes-Gimme All Your Love,1\n\
Rock-One Ok Rock-Niche Syndrome,1\n\
Jazz-Lee Konitz-Brazilian Serenade,1\n\
Jazz-Various Artists-This Is Venus Jazz 80 Gold Discs,1\n\
";

let csv = d3.csv.parseRows(text);
let json = buildHierarchy(csv);
createVisualization(json);


// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Basic setup of page elements.
  initializeBreadcrumbTrail();
  drawLegend();
  d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  let nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  let path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return colors[d.name]; })
      .style("opacity", 1)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
};

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {

  let percentage = d.value;
  let percentageString = percentage + " songs";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }

  d3.select("#percentage")
      .text(percentage);

  d3.select("#explanation")
      .style("visibility", "");

  let sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray, percentageString);

  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });

  d3.select("#explanation")
      .transition()
      .duration(1000)
      .style("visibility", "hidden");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  let path = [];
  let current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  let trail = d3.select("#sequence")
    .append("svg:svg")
    .attr("width", width)
    .attr("height", 50)
    .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  let points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  let g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  let entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return colors[d.name]; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}

function drawLegend() {

  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  let li = {
    w: 75, h: 30, s: 3, r: 3
  };

  let legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", d3.keys(colors).length * (li.h + li.s));

  let g = legend.selectAll("g")
      .data(d3.entries(colors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
          });

  g.append("svg:rect")
    .attr("rx", li.r)
    .attr("ry", li.r)
    .attr("width", li.w)
    .attr("height", li.h)
    .style("fill", function(d) { return d.value; });

  g.append("svg:text")
    .attr("x", li.w / 2)
    .attr("y", li.h / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", "middle")
    .text(function(d) { return d.key; });
}

function toggleLegend() {
  let legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}

// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how 
// often that sequence occurred.
function buildHierarchy(csv) {
  let root = {"name": "root", "children": []};
  for (let i = 0; i < csv.length; i++) {
    let sequence = csv[i][0];
    let size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    let parts = sequence.split("-");
    let currentNode = root;
    for (let j = 0; j < parts.length; j++) {
      let children = currentNode["children"];
      let nodeName = parts[j];
      let childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
        let foundChild = false;
        for (let k = 0; k < children.length; k++) {
          if (children[k]["name"] == nodeName) {
            childNode = children[k];
            foundChild = true;
            break;
          }
        }
        // If we don't already have a child node for this branch, create it.
        if (!foundChild) {
          childNode = {"name": nodeName, "children": []};
          children.push(childNode);
        }
        currentNode = childNode;
      } else {
        // Reached the end of the sequence; create a leaf node.
        childNode = {"name": nodeName, "size": size};
        children.push(childNode);
      }
    }
  }
  return root;
};

// Copyright (c) 2022 by Bri Sorensen (https://codepen.io/brisor/pen/Gznyr)
// Fork of an original work d3 sunburst partition example (https://codepen.io/tiago4orion/pen/nFEBk
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

