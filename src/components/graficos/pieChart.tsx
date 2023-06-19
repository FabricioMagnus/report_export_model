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

  const labelsChart =
    dataChart &&
    dataChart.reduce((acumulador, objeto) => {
      const { nome, grupo } = objeto;
      if (!acumulador[grupo]) {
        acumulador[grupo] = nome;
      }
      return acumulador;
    }, {});

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
    labels: Object.keys(labelsChart),
    datasets: [
      {
        data: contagensArray.map((item) => item.contagem),
        backgroundColor: contagensArray.map(() => gerarCorAleatoria()),
      },
    ],
  };

  return (
    <Box p={1} h={"100%"} w={"57%"}>
      <Text fontWeight={"bold"}>DISTRIBUIÇÃO</Text>

      <Pie
        data={data}
        options={{ plugins: { legend: { position: "right" } } }}
      />
    </Box>
  );
}
export default PieChart;
