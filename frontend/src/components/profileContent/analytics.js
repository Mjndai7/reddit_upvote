import React from "react";
import Chart from 'chart.js/auto';
import { Bar} from "react-chartjs-2";
import { Axis, Scale, Grid, Legend } from "react-chartjs-2";

const AnalyticsGraph = ({ data }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: "Cost and Upvotes vs. Date",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Cost ($)",
        },
      },
    },
  };

  const datasets = [
    {
      label: "Cost",
      data: data.map((item) => ({ x: item.date, y: item.cost })),
      borderColor: "#E34234",
      borderWidth: 2,
    },
    {
      label: "Upvotes",
      data: data.map((item) => ({ x: item.date, y: item.upvotes })),
      borderColor: "#7F8183",
      borderWidth: 2,
    },
  ];

  const chartData = {
    datasets: datasets,
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
    <Bar data={chartData} options={options} />
  </div>
  );
};

export default AnalyticsGraph;