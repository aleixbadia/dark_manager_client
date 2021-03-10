import React from "react";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
    });
  }
  
  function getFeeds() {
    let feeds = [];
  
    feeds.push({
      title: 'Visits',
      data: getRandomDateArray(150)
    });
  
    feeds.push({
      title: 'Categories',
      data: getRandomArray(20)
    });
  
    feeds.push({
      title: 'Categories',
      data: getRandomArray(10)
    });
  
    feeds.push({
      title: 'Data 4',
      data: getRandomArray(6)
    });
  
    return feeds;
  }
  render() {
    return <canvas ref={this.chartRef} />;
  }
}

export default BarChart;
