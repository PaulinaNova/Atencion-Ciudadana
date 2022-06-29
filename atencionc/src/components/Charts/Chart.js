import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const Chart = (props) => {
  const { canceladas, seguimiento, concluidas } = props;
  const data = {
    labels: ["Conluidas", "Canceladas", "Seguimiento"],
    datasets: [
      {
        label: "Solicitudes hechas a atención ciudadana en 2021",
        data: [concluidas, canceladas, seguimiento],
        backgroundColor: ["Blue", "Yellow", "Orange"],
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Pie Chart",
    },
  };
  return <Pie data={data} options={options} />;
};

export default Chart;
