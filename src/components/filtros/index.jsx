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
  IDSUMARIORELATORIO,
} from "../../constants/idForHTML";
import { useParams } from "react-router-dom";
import { newExportPDF } from "../../functions/newExportPDF";
import { MD5 } from "crypto-js";

export default function Filtros({
  componentRef,
  loading,
  setLoading,
  isOk,
  setIsOk,
  filtroData,
  setFiltroData,
  arrayIds,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);

  const arrayparaExportação = [
    IDCAPARELATORIO,
    IDSUMARIORELATORIO,
    ...arrayIds,
    IDGRAFICOSREVISAOCARTEIRA,
  ];

  const idClienteDeTeste = 129;

  const { id } = useParams();
  const idClienteParametro = id ? Number(id) : idClienteDeTeste;

  const [idSignal, setIdSignal] = useState("");

  // console.log("idSinal", idSignal);

  function openModal(id) {
    setIdSignal(id);
    setIsOpen(true);
  }

  async function solicitarRelatorio() {
    const dataForApi = filtroData + "-01";
    const timestamp = Date.now().toString();
    const idSignal = MD5(timestamp).toString();
    try {
      setLoading(true);
      const response = await ServicesApi.solicitarRelatorio(
        dataForApi,
        idClienteParametro,
        idSignal
      );
      setLoading(false);
      openModal(idSignal);
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
          // setIsOpen(true);
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
          isLoading={loadingPDF}
          onClick={() => {
            newExportPDF(arrayparaExportação, setLoadingPDF);
          }}
        >
          Exportar
        </Button>
      )}

      <ModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsOk={setIsOk}
        idRequisicao={idSignal}
      />
    </Flex>
  );
}
