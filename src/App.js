import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Chart.defaults.plugins.tooltip = false;
function App() {
  const colors = [
    "green",
    "black",
    "red",
    "orange",
    "blue",
    "yellow",
    "violet",
  ];
  const data = {
    labels: ["2019", "2020", "2021"],
    datasets: [
      {
        label: "BMW",
        data: [1, 2, 3, 4, 5, 5],
        borderColor: "red",
        backgroundColor: colors,
      },
      {
        label: "Merco",
        data: [2, 4, 5, 6],
        borderColor: "blue",
        backgroundColor: colors,
      },
      {
        label: "Audi",
        data: [4, 5, 6, 7],
        borderColor: "blue",
        backgroundColor: colors,
      },
    ],
  };

  const dataTwo = {
    labels: ["2023", "2024", "2025"],
    datasets: [
      {
        label: "BMWz",
        data: [1, 2, 3, 4, 5, 5],
        borderColor: "red",
        backgroundColor: colors,
      },
      {
        label: "Mercoz",
        data: [1, 2, 5, 6],
        borderColor: "blue",
        backgroundColor: colors,
      },
      {
        label: "Audiz",
        data: [1, 2, 3, 7, 1],
        borderColor: "blue",
        backgroundColor: colors,
      },
    ],
  };
  const [dataState, setDataState] = useState(data);
  const options = {
    responsive: true,
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

  const CustomTooltop = (context) => {
    console.log(context);
    // Tooltip Element
    let tooltipEl = document.getElementById("chartjs-tooltip");

    // Create element on first render
    if (!tooltipEl) {
      tooltipEl = document.createElement("div");
      tooltipEl.id = "chartjs-tooltip";
      tooltipEl.innerHTML = "<table></table>";

      document.body.appendChild(tooltipEl);
    }

    // Hide if no tooltip
    let tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = 0;

      return;
    }

    // Set caret Position
    tooltipEl.classList.remove("above", "below", "no-transform");
    if (tooltipModel.yAlign) {
      tooltipEl.classList.add(tooltipModel.yAlign);
    } else {
      tooltipEl.classList.add("no-transform");
    }

    function getBody(bodyItem) {
      return bodyItem.lines;
    }

    // Set Text
    if (tooltipModel.body) {
      let titleLines = tooltipModel.title || [];
      let bodyLines = tooltipModel.body.map(getBody);

      let innerHtml = "<thead>";

      titleLines.forEach(function (title) {
        innerHtml += "<tr><th>" + title + "</th></tr>";
      });
      innerHtml += "</thead><tbody>";

      bodyLines.forEach(function (body, i) {
        let colors = tooltipModel.labelColors[i];
        let style = "background:" + colors.backgroundColor;
        style += "; border-color:" + colors.borderColor;
        style += "; border-width: 2px";
        let span = '<span style="' + style + '"></span>';
        innerHtml += "<tr><td>" + span + body + "</td></tr>";
      });
      innerHtml += "</tbody>";

      let tableRoot = tooltipEl.querySelector("table");
      tableRoot.innerHTML = innerHtml;
    }

    let position = context.chart.canvas.getBoundingClientRect();

    // Display, position, and set styles for font
    tooltipEl.classList.add("customtooltip");
    tooltipEl.style.opacity = 1;
    tooltipEl.style.position = "absolute";
    // tooltipEl.style.backgroundColor =
    //   context.tooltip.dataPoints[0].dataset.borderColor;
    tooltipEl.style.padding = "15px";
    tooltipEl.style.cursor = "Pointer";
    tooltipEl.style.left =
      position.left + window.pageXOffset + tooltipModel.caretX + "px";
    tooltipEl.style.top =
      position.top + window.pageYOffset + tooltipModel.caretY + "px";

    tooltipEl.style.padding =
      tooltipModel.padding + "px " + tooltipModel.padding + "px";
    tooltipEl.style.pointerEvents = "none";
  };

  return (
    <div className="App" style={{ height: "200px", width: "50%" }}>
      <button onClick={() => setDataState(dataTwo)}>change</button>
      <Line data={dataState} width={150} height={150} options={options} />
    </div>
  );
}

export default App;
