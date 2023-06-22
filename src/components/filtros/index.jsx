import { Flex, Input, Button } from "@chakra-ui/react";
import handleExportPDF from "../../functions/exportPDF";
import ReactToPrint from "react-to-print";
import { useState } from "react";
import ModalComponent from "../exportModal";
import ServicesApi from "../../services/services";
import {
  IDCAPARELATORIO,
  IDGRAFICOSREVISAOCARTEIRA,
  IDREVISAOCARTEIRA,
} from "../../constants/idForHTML";

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
      setLoading(false);
      setIsOpen(true);
      // setIsOk(true);
    } catch (error) {
      setIsOk(false);
      console.log("error", error);
    }
  }

  return (
    <Flex w={"100%"} justifyContent={"space-evenly"}>
      <Input
        bgColor={"blue.900"}
        color={"white"}
        type="month"
        textColor={"white"}
        maxWidth="200px"
        onChange={(e) => {
          setIsOk(false);
          setFiltroData(e.target.value);
        }}
      />
      <Button
        type="button"
        bgColor={"blue.900"}
        color={"white"}
        isLoading={loading}
        onClick={() => {
          solicitarRelatorio();
          setIsOpen(true);
          // handleExportPDF("myScreen");
        }}
      >
        Filtrar
      </Button>

      {/* {isOk && (
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
      )} */}
      {isOk && (
        <Button
          type="button"
          bgColor={"blue.900"}
          color={"white"}
          isLoading={loading}
          onClick={() => {
            handleExportPDF([IDCAPARELATORIO]);
          }}
        >
          Exportar
        </Button>
      )}

      <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} setIsOk={setIsOk} />
    </Flex>
  );
}
