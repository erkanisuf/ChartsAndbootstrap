export const createDataSetForCharts = (data) => {
  let labels = [];
  let newConfirmed = [];
  let newDeaths = [];
  if (data.length) {
    data.map((el) => {
      const confirmed = { x: el.Date, y: el.NewConfirmed };
      const deaths = { x: el.Date, y: el.NewDeaths };
      labels.push(el.Date);
      newConfirmed.push(confirmed);
      newDeaths.push(deaths);
      return;
    });
  }
  const dataset = {
    datasets: [
      {
        label: "New Confirmed",
        data: newConfirmed,
        backgroundColor: ["yellow"],
        borderColor: ["yellow"],
      },
      {
        label: "New Deaths",
        data: newDeaths,
        backgroundColor: ["red"],
        borderColor: ["red"],
      },
    ],
  };
  console.log(dataset);
  return dataset;
};