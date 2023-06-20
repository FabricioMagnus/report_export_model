import { Flex, Input, Button } from "@chakra-ui/react";
import handleExportPDF from "../../functions/exportPDF";
import ReactToPrint from "react-to-print";
import { useState } from "react";
import ModalComponent from "../exportModal";
import { generateReportPdf } from "../reportPDF/functions/reportsPDF";

export default function Filtros({ componentRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);

  async function downloadSummarizedPdfReport() {
    setLoadingPDF(true);
    try {
      await generateReportPdf();
      console.log("PDF gerado com sucesso");
    } catch (error) {
      toast.error("Houve um erro ao gerar o pdf: " + error);
    } finally {
      setLoadingPDF(false);
    }
  }

  return (
    <Flex w={"100%"} justifyContent={"space-evenly"}>
      <Input
        bgColor={"blue.900"}
        color={"white"}
        type="date"
        textColor={"white"}
        maxWidth="200px"
      />

      <ReactToPrint
        trigger={() => (
          <Button bgColor={"blue.900"} color={"white"} type="reset">
            Imprimir
          </Button>
        )}
        content={() => componentRef.current}
      />
      <Button
        type="button"
        bgColor={"blue.900"}
        color={"white"}
        onClick={() => {
          setIsOpen(true);
          // handleExportPDF("myScreen");
        }}
      >
        Exportar
      </Button>
      <Button
        type="button"
        bgColor={"blue.900"}
        color={"white"}
        isLoading={loadingPDF}
        onClick={() => {
          downloadSummarizedPdfReport();
        }}
      >
        Exportar com fofinhos
      </Button>

      <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </Flex>
  );
}
