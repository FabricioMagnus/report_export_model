import { Flex, Input, Button } from "@chakra-ui/react";
import handleExportPDF from "../../functions/exportPDF";
import ReactToPrint from "react-to-print";
import { useState } from "react";
import ModalComponent from "../exportModal";
import { generateReportPdf } from "../reportPDF/functions/reportsPDF";
import ServicesApi from "../../services/services";

export default function Filtros({
  componentRef,
  loading,
  setLoading,
  isOk,
  setIsOk,
  filtroData,
  setFiltroData,
}) {
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

  async function solicitarRelatorio() {
    const dataForApi = filtroData + "-01";
    try {
      setLoading(true);
      const response = await ServicesApi.solicitarRelatorio(dataForApi, 129);
      console.log("response", response);
      setLoading(false);
      setIsOk(true);
    } catch (error) {
      setIsOk(false);
      console.log("error", error);
    }
  }

  console.log("filtroData", filtroData);

  return (
    <Flex w={"100%"} justifyContent={"space-evenly"}>
      <Input
        bgColor={"blue.900"}
        color={"white"}
        type="month"
        textColor={"white"}
        maxWidth="200px"
        onChange={(e) => setFiltroData(e.target.value)}
      />
      <Button
        type="button"
        bgColor={"blue.900"}
        color={"white"}
        isLoading={loading}
        onClick={() => {
          solicitarRelatorio();
          // handleExportPDF("myScreen");
        }}
      >
        Filtrar
      </Button>

      {isOk && (
        <ReactToPrint
          trigger={() => (
            <Button
              bgColor={"blue.900"}
              color={"white"}
              type="reset"
              isLoading={loading}
            >
              Imprimir
            </Button>
          )}
          content={() => componentRef.current}
        />
      )}
      {isOk && (
        <Button
          type="button"
          bgColor={"blue.900"}
          color={"white"}
          isLoading={loading}
          onClick={() => {
            setIsOpen(true);
            // handleExportPDF("myScreen");
          }}
        >
          Exportar
        </Button>
      )}
      {/* <Button
        type="button"
        bgColor={"blue.900"}
        color={"white"}
        isLoading={loadingPDF}
        onClick={() => {
          downloadSummarizedPdfReport();
        }}
      >
        Exportar com fofinhos
      </Button> */}

      <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </Flex>
  );
}
