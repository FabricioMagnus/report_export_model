import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
ChartJS.register(...registerables);

function LineChart() {
  return (
    <Box width="80%" height="70%">
      <Text fontWeight={"bold"}>Transções Totais</Text>
      <Line
        options={{
          responsive: true,
          maintainAspectRatio: true,
          // Define o tamanho do gráfico
          // height: "400px",
          // width: "600px",
        }}
        data={{
          labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ],
          datasets: [
            {
              label: "Número de Transações Mensais",
              data: [
                5462, 2878, 5434, 9856, 8745, 4267, 8988, 5450, 8960, 4840,
                5178, 8945,
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
export default LineChart;
