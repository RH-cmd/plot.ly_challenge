function viewMetadata(sample) {
    d3.json("data/samples.json").then((data) => {
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

    //   Create the bar chart
  
    var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var barData = [
      {
        y: yticks,
        x: sample_values.slice(0, 10).reverse(),
        text: otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
      }
    ];

    var barLayout = {
      title: "Top 10 OTUs Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}


//   Create the function for the form panel

function init() {
  // Select the dropdown element 
  var selector = d3.select("#selDataset");
  
  // Populate the select options with the sample names
  d3.json("samples.json").then((data) => {
  // Create a varibles for the sample names
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
  
    // Build the intial plot
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
  }
  
  function optionChanged(newSample) {
  // Switch the data when we select a new sample
  buildCharts(newSample);
  buildMetadata(newSample);
  }
  
  //this will handle the event change when we select a new ID
function optionChanged(id) {
    makePlots(id);
    displayMetadata(id);
}
  // Initialize the dashboard
  init();