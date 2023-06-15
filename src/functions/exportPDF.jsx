import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { arrayCabecalho } from "../components/viewPDF/data/cabecalho";
import { arrayListObjects } from "../components/viewPDF/data/dataTable";
import { rowList } from "../components/viewPDF/data/rowList";
import { Flex } from "@chakra-ui/react";
import TableComponent from "../components/viewPDF/components/TableComponent";
import React from "react";

export default function handleExportPDF(id) {
  const input = document.getElementById(id);

  // const input = (
  //   <Flex w={"100%"}>
  //     <TableComponent
  //       headerList={arrayCabecalho}
  //       data={arrayListObjects}
  //       rowList={rowList}
  //       loading={false}
  //     />
  //   </Flex>
  // );

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
    pdf.save(`relatorio-dinamico.pdf`);
  });
}
