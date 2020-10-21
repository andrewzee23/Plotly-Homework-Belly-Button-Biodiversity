// Use the D3 library to read in samples.json.
d3.json("samples.json").then(function createPlotly(data) {
    console.log(data);
    var testid = data.names;
    console.log(testid);

// Create a dynamic dropdown menu
  d3.select("#selDataset")
  .selectAll("option")
  .data(testid)
  .enter()
  .append("option")
  .html(function(d) {
    return `<option>${d}</option`;
  });
});
