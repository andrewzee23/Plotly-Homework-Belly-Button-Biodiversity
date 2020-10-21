// read in samples.json.
d3.json("samples.json").then(function createPlotly(data) {
    console.log(data);
    let testid = data.names;
    console.log(testid);

  // Create dropdown menu
  d3.select("#selDataset")
  .selectAll("option")
  .data(testid)
  .enter()
  .append("option")
  .html(function(d) {
    return `<option>${d}</option`;
  });


  // Retrive the selected option and use it to get index
  let dropdownMenu = d3.select("#selDataset");
  let dropdownValue = dropdownMenu.property("value");
  let index = testid.indexOf(dropdownValue);

  // dempgraphic info
  d3.select("#sample-metadata").html("");
  d3.select("#sample-metadata")
    .selectAll("p")
    .data(Object.entries(data.metadata[index]))
    .enter()
    .append("p")
    .html(function(d) {
      return `${d[0]} : ${d[1]}`;
  });


  console.log(Object.entries(data.metadata[index]));

  // creating bar graph using index
  var defaultsampleData = data.samples[index].sample_values
    .slice(0, 10)
    .reverse();
  var defaultotuData = data.samples[index].otu_ids.slice(0, 10).reverse();
  var defaultotuLabels = data.samples[index].otu_labels.slice(0, 10).reverse();
  var defaultyxis = defaultotuData.map(a => "OTU" + a);

  var bardata = [
    {
      x: defaultsampleData,
      y: defaultyxis,
      type: "bar",
      orientation: "h",
      text: defaultotuLabels
    }
  ];

  var barLayout = {
    title: "TOP10 Sample Values",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU ID" }
  };

  Plotly.newPlot("bar", bardata, barLayout);
});
