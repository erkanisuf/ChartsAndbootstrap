import { labelMonths } from "./components/StackedChartGraph/Helpers";
const labels = labelMonths({ count: 7 });
export const createDataSetForCharts = (data) => {
  let labels = [];
  let newConfirmed = [];
  let newDeaths = [];
  if (data.length) {
    data.map((el) => {
      const confirmed = { x: el.Date, y: el.NewConfirmed, custom: 69 };
      const deaths = { x: el.Date, y: el.NewDeaths, custom: 69 };
      labels.push(el.Date);
      newConfirmed.push(confirmed);
      newDeaths.push(deaths);
      return "";
    });
  }
  const dataset = {
    labels: labels,
    datasets: [
      {
        label: "New Confirmed",
        data: newConfirmed,
        backgroundColor: ["green"],
        borderColor: ["yellow"],
      },
      {
        label: "New Deaths",
        data: newDeaths,
        backgroundColor: ["blue"],
        borderColor: ["red"],
      },
      {
        label: "Goal",
        type: "line",
        data: { x: labels, y: [10000, 20000, 30000, 40000, 50000] },
        backgroundColor: ["orange"],
        borderColor: ["red"],
      },
    ],
  };
  console.log(dataset);
  return dataset;
  // return data;
};
