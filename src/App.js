import { useState, useEffect } from "react";

import "./App.css";
import { Bar } from "react-chartjs-2";

import { createDataSetForCharts } from "./HelperFunctions";
import "chartjs-adapter-date-fns";
import { fi } from "date-fns/locale";
import { CustomTooltop } from "./CustomTooltip";
import DailyChart from "./components/Charts/DailyChart";
import StackedChartGraph from "./components/StackedChartGraph/StackedChartGraph";
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
  const today = new Date();
  const options = {
    responsive: true,
    barThickness: 25,
    // parsing: { xAxisKey: "custom" }, // this with parsing so migh use custom objects
    scales: {
      x: {
        adapters: {
          date: {
            locale: fi,
          },
        },
        stacked: false,

        // max: new Date(),
        // Date Formats https://stackoverflow.com/questions/45546558/chartjs-xaxis-time-formats-dont-change-for-days
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            day: "MMM dd",
          },
        },
        display: true,
        title: {
          display: true,
          text: "Date 2021",
        },
      },
      y: {
        stacked: false,
      },
    },

    plugins: {
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
          <StackedChartGraph />
        </div>
        <div className="col-6">
          <Bar data={dataState} width={150} height={150} options={options} />
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
