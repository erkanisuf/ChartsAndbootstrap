import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { createDataSetForCharts } from "./HelperFunctions";
import "chartjs-adapter-moment";
import moment from "moment";
import { CustomTooltop } from "./CustomTooltip";
import DailyChart from "./components/Charts/DailyChart";
// Chart.defaults.plugins.tooltip = false;
function App() {
  const [dataState, setDataState] = useState({});
  useEffect(() => {
    fetch(
      "https://api.covid19api.com/world?from=2021-06-10T00:00:00Z&to=2021-06-18T00:00:00Z"
    )
      .then((res) => res.json())
      .then((res) => setDataState(createDataSetForCharts(res)))
      .catch((err) => console.log(err));
    return () => {};
  }, []);
  const options = {
    responsive: true,
    // parsing: { xAxisKey: "custom" }, // this with parsing so migh use custom objects
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "MMM Do",
          displayFormats: {
            hour: "MMM Do HH:mm",
          },
        },
        display: true,
        title: {
          display: true,
          text: "Date 2021",
        },
      },
    },

    plugins: {
      legend: {
        onHover: function (e) {},
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
    <div className="container fluid">
      <div className="row justify-content-center">
        <div className="col-6">
          <Bar
            data={dataState}
            width={150}
            height={150}
            options={options}
            getElementsAtEvent={(e) => console.log(e)}
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <DailyChart test="testclass" />
        </div>
      </div>
    </div>
  );
}

export default App;
