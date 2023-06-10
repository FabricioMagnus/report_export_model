import { useState } from "react";
import "./App.css";
import { Flex } from "@chakra-ui/react";
import Filtros from "./components/filtros";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TableComponent from "./components/viewPDF/components/TableComponent";
import { Button } from "@chakra-ui/react";
import { arrayCabecalho } from "./components/viewPDF/data/cabecalho";
import { arrayListObjects } from "./components/viewPDF/data/dataTable";
import { rowList } from "./components/viewPDF/data/rowList";

function App() {
  const handleExportPDF = () => {
    const input = document.getElementById("myScreen");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const pdfAspectRatio = imgWidth / imgHeight;
      const pdfWidth = 297; // Largura A4 em mm
      const pdfHeight = pdfWidth / pdfAspectRatio;
      const marginLeft = 10; // Margem esquerda em mm
      const marginTop = 10; // Margem superior em mm
      const marginRight = 10; // Margem direita em mm
      const marginBottom = 10; // Margem inferior em mm

      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(
        imgData,
        "PNG",
        marginLeft,
        marginTop,
        pdfWidth - marginLeft - marginRight,
        pdfHeight - marginTop - marginBottom
      );
      pdf.save("myScreen.pdf");
    });
  };

  const handlePrint = () => {
    window.print(); // Chama a função de impressão do navegador
  };

  return (
    <Flex w={"100vw"} h={"100vh"} flexDirection={"column"}>
      <Flex
        w={"100%"}
        h={"11vh"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Filtros handleExportPDF={handleExportPDF} />
      </Flex>
      <Flex
        w={"100%"}
        h={"81vh"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <div id="myScreen">
          <Flex w={"100%"}>
            <TableComponent
              headerList={arrayCabecalho}
              data={arrayListObjects}
              rowList={rowList}
              loading={false}
            />
          </Flex>
        </div>
      </Flex>
      <Flex w={"100%"} h={"8vh"} bg={"blue"}>
        teste
      </Flex>
    </Flex>
  );
}

export default App;
