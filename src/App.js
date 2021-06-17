import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { createDataSetForCharts } from "./HelperFunctions";
import "chartjs-adapter-moment";
import { CustomTooltop } from "./CustomTooltip";
// Chart.defaults.plugins.tooltip = false;
function App() {
  const [dataState, setDataState] = useState({});
  useEffect(() => {
    fetch(
      "https://api.covid19api.com/world?from=2021-03-01T00:00:00Z&to=2021-04-01T00:00:00Z"
    )
      .then((res) => res.json())
      .then((res) => setDataState(createDataSetForCharts(res)))
      .catch((err) => console.log(err));
    return () => {};
  }, []);
  const options = {
    responsive: true,
    parsing: { yAxisKey: "custom" }, // this with parsing so migh use custom objects
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "MMM Do YY",
          displayFormats: {
            quarter: "MMM Do YY",
          },
        },
        display: true,
        title: {
          display: true,
          text: "Date",
        },
      },
    },

    plugins: {
      legend: {
        onHover: function (e) {
          e.target.style.cursor = "pointer";
        },
      },
      tooltip: {
        external: (context) => {
          CustomTooltop(context);
        },
        enabled: false,
        mode: "point",
        callbacks: {
          title: (item) => {
            return `${item[0].label}`;
          },
        },
      },
    },
  };
  console.log(dataState);
  if (!dataState) {
    return <p>Loading</p>;
  }
  return (
    <div className="App" style={{ height: "200px", width: "50%" }}>
      <Bar
        data={dataState}
        width={150}
        height={150}
        options={options}
        getElementsAtEvent={(e) => console.log(e)}
      />
    </div>
  );
}

export default App;
