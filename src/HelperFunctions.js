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
    datasets: [
      {
        label: "New Confirmed",
        data: newConfirmed,
        backgroundColor: ["yellow", "green", "blue"],
        borderColor: ["yellow"],
      },
      {
        label: "New Deaths",
        data: newDeaths,
        backgroundColor: ["yellow", "green", "blue"],
        borderColor: ["red"],
      },
    ],
  };
  console.log(dataset);
  return dataset;
  // return data;
};
