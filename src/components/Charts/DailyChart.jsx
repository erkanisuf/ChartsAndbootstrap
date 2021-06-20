import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { externalTooltipHandler } from "./ExternalTooltip";
export default class DailyChart extends Component {
  constructor(test) {
    super();
    this.state = { NewConfirmed: 0 };
  }

  testvam() {
    console.log(this.state);
  }

  componentDidMount() {
    fetch(`https://api.covid19api.com/summary`)
      .then((res) => res.json())
      .then((res) => this.setState(res.Global))
      .catch((err) => console.log(err));
  }

  createDataSet() {
    const dataset = [
      {
        label: "New Confirmed",
        data: [
          {
            x: "New Confirmed",
            y: this.state.NewConfirmed,
            moreinfo: { custom: "Cusotm field firs titm" },
          },
        ],
        backgroundColor: ["blue"],
      },
      {
        label: "New Deaths",
        data: [
          {
            x: "New Deaths",
            y: this.state.NewDeaths,
            moreinfo: { custom: "Cusotm field for this too seconditm" },
          },
        ],
        backgroundColor: ["red"],
      },
      {
        label: "New Recovered",
        data: [
          {
            x: "New Recovered",
            y: this.state.NewRecovered,
            moreinfo: { custom: "Cusotm three item" },
          },
        ],
        backgroundColor: ["green"],
      },
    ];
    return { datasets: dataset };
  }

  render() {
    const options = {
      scales: { x: { stacked: true }, y: { stacked: true } },
      plugins: {
        tooltip: {
          external: (custom) => externalTooltipHandler(custom),
          enabled: false,
          mode: "point",
          callbacks: {
            label: (e) => e.dataset.data[0].y,
          },
        },
      },
    };
    if (!this.state) {
      return <p>load</p>;
    }
    return (
      <>
        <Bar
          data={this.createDataSet.bind(this)}
          width={150}
          height={130}
          options={options}
          getElementsAtEvent={(e) => console.log(e)}
        />
      </>
    );
  }
}
