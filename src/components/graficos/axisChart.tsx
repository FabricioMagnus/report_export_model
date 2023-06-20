import { Doughnut, Bar, Scatter } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Chart } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
ChartJS.register(...registerables);

function AxisChart() {
  return (
    <Box p={3}>
      <Text fontWeight={"bold"}>Empresas</Text>
      <Scatter
        data={{
          datasets: [
            {
              label: "Atuação",
              data: [
                {
                  x: -10,
                  y: 0,
                },
                {
                  x: 12,
                  y: 9,
                },
                {
                  x: 15,
                  y: 7,
                },
                {
                  x: 11,
                  y: 3,
                },
                {
                  x: 1,
                  y: 10,
                },
                {
                  x: 8,
                  y: 4,
                },
                {
                  x: 0.5,
                  y: 5.5,
                },
              ],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
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
        }}
      />
    </Box>
  );
}
export default AxisChart;
