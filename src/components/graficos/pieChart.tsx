import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";

function PieChart({ dataChart }) {
  const labels = Object.keys(dataChart);

  const dataNumbers = Object.values(dataChart);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataNumbers,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  return (
    <Box p={1} h={"100%"} w={"90%"}>
      <Text fontWeight={"bold"} color={"#123E6B"} fontSize={"24px"}>
        DISTRIBUIÇÃO
      </Text>
      <Text color={"#006FB7"} fontSize={"20px"} mb={-3}>
        Por segmento
      </Text>
      <Pie
        data={data}
        options={{ plugins: { legend: { position: "right" } } }}
      />
    </Box>
  );
}
export default PieChart;
