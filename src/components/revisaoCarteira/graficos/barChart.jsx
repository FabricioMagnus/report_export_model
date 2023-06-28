import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IDGRAFICOSREVISAOCARTEIRA } from "../../../constants/idForHTML";
ChartJS.register(...registerables);

function BarChart({ dataChart }) {
  const labels = Object.keys(dataChart);

  const dataNumbers = Object.values(dataChart);

  const options = {
    indexAxis: "y",
    plugins: {
      legend: {
        position: "right",
        display: false,
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataNumbers,
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
          "rgba(75, 192, 192, 0.4)",
          "rgba(153, 102, 255, 0.4)",
          "rgba(255, 159, 64, 0.4)",
          "rgba(255, 99, 132, 0.4)",
          "rgba(54, 162, 235, 0.4)",
          "rgba(255, 206, 86, 0.4)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box p={1} h={"80%"} w={"90%"}>
      <Box>
        <Text fontWeight={"bold"} color={"#123E6B"} fontSize={"24px"}>
          DISTRIBUIÇÃO
        </Text>
        <Text color={"#006FB7"} fontSize={"20px"} mb={3}>
          Por tipo de ativo (enquadramento ou legislação)
        </Text>
      </Box>
      <Flex w={"100%"} h={"100%"}>
        <Bar options={options} data={data} id={IDGRAFICOSREVISAOCARTEIRA} />
      </Flex>
    </Box>
  );
}
export default BarChart;
