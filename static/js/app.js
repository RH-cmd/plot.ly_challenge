function buildDataset(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;

      // Filter the data for the object with sample number want
      var resultArray = metadata.filter(objext => object.id == sample);
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