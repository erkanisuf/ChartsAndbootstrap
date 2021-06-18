import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
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
        data: [{ x: "New Confirmed", y: this.state.NewConfirmed }],
        backgroundColor: ["blue"],
      },
      {
        label: "New Deaths",
        data: [{ x: "New Deaths", y: this.state.NewDeaths }],
        backgroundColor: ["red"],
      },
      {
        label: "New Recovered",
        data: [{ x: "New Recovered", y: this.state.NewRecovered }],
        backgroundColor: ["green"],
      },
    ];
    return { datasets: dataset };
  }

  render() {
    if (!this.state) {
      return <p>load</p>;
    }
    return (
      <div>
        <button onClick={this.testvam.bind(this)}>QQ</button>
        name {this.state.name},{this.props.test}
        <div style={{ height: "200px", width: "300px" }}>
          <Bar
            data={this.createDataSet.bind(this)}
            width={150}
            height={150}
            getElementsAtEvent={(e) => console.log(e)}
          />
        </div>
      </div>
    );
  }
}
