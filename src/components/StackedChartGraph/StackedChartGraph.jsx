import React from "react";
import { labelMonths } from "./Helpers";
import { Bar } from "react-chartjs-2";
const StackedChartGraph = () => {
  const labels = labelMonths({ count: 7 });
  const dataset = {
    labels: labels,
    datasets: [
      {
        type: "bar",
        label: "car",
        data: [
          { x: 10, y: 20, z: 15 },
          { x: 15, y: 22 },
          { x: 20, y: 10 },
        ],
        backgroundColor: ["violet"],
        order: 3,
      },
      {
        label: "house",
        data: [
          { x: 10, y: 25 },
          { x: 15, y: null },
          { x: 20, y: 10 },
        ],
        backgroundColor: ["pink"],
        order: 2,
      },
      {
        label: "food",
        data: [
          { x: 10, y: 11 },
          { x: 15, y: null },
          { x: 20, y: 10 },
        ],
        backgroundColor: ["lightblue"],
        order: 1,
      },
      {
        type: "line",
        label: "Goals",
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 11 },
          { x: 20, y: 10 },
          { x: 10, y: 20 },
          { x: 15, y: 14 },
          { x: 20, y: 10 },
        ],
        backgroundColor: ["lightblue"],
        order: -1,
      },
    ],
  };

  const options = {
    scales: {
      x: { type: "category", stacked: true },
      y: {
        stacked: true,
        max: 100,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: "point",
      },
    },
  };
  return (
    <>
      <Bar data={dataset} width={150} height={130} options={options} />
    </>
  );
};

export default StackedChartGraph;
