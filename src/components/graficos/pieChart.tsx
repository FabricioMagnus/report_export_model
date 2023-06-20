import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Text } from "@chakra-ui/react";

function PieChart({ dataChart }) {
  function gerarCorAleatoria() {
    const letrasHexadecimais = "0123456789ABCDEF";
    let cor = "#";
    for (let i = 0; i < 6; i++) {
      cor += letrasHexadecimais[Math.floor(Math.random() * 16)];
    }
    return cor;
  }

  const dataForChart =
    dataChart &&
    dataChart.reduce((acumulador, objeto) => {
      const { grupo } = objeto;
      if (!acumulador[grupo]) {
        acumulador[grupo] = 1;
      } else {
        acumulador[grupo]++;
      }
      return acumulador;
    }, {});

  const contagensArray = Object.entries(dataForChart).map(
    ([grupo, contagem]) => {
      return { grupo, contagem };
    }
  );

  const data = {
    labels: contagensArray.map((item) => `${item.grupo} (${item.contagem})`),
    datasets: [
      {
        data: contagensArray.map((item) => item.contagem),
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
