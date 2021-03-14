function viewMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      console.log(metadata);

      // Filter the data for the object with sample number we want
      var resultArray = metadata.filter(object => object.id == sample);
      var result = resultArray[0];

      // Use d3 to select the panel with id of `#sample-metadata`
      var panel = d3.select("#sample-metadata");
  
      // Use `.html("") to clear existing metadata
      PANEL.html("");
  
      // Add each key and value pair to the panel
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
      // Gauge Chart
      buildGauge(result.wfreq);
    });
  }


// Create a function to build our bar and bubble charts

  function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
    // Create variables for the elements we want from the dataset
      var samples = data.samples;
      var resultArray = samples.filter(object => object.id == sample);
      var result = resultArray[0];
      var otu_ids = result.otu_ids;
      var otu_labels = result.otu_labels;
      var sample_values = result.sample_values;
  
      // Create the bubble chart
      var bubbleLayout = {
        title: "Belly Button Biodiversity",
        margin: { t: 0 },
        hovermode: "closest",
        xaxis: { title: "OTU ID" },
        margin: { t: 30}
      };
      var bubbleData = [
        {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: "markers",
          marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
          }
        }
      ];
  
      Plotly.newPlot("bubble", bubbleData, bubbleLayout);

   