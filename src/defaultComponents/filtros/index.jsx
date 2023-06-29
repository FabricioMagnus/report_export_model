import { Flex, Input, Button, Checkbox, Text } from "@chakra-ui/react";
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
  arrayIdsRetornoMes,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingPDF, setLoadingPDF] = useState(false);

  const arrayparaExportação = [
    IDCAPARELATORIO,
    IDSUMARIORELATORIO,
    ...arrayIds,
    IDGRAFICOSREVISAOCARTEIRA,
    ...arrayIdsRetornoMes,
  ];

  console.log("array para exportação", arrayparaExportação);

  const idClienteDeTeste = 129;

  const { id } = useParams();
  const { secret } = useParams();
  const idClienteParametro = id ? Number(id) : idClienteDeTeste;
  const secretClienteParametro = secret;

  const [idSignal, setIdSignal] = useState("");
  const [filtrozero, setFiltroZero] = useState(false);

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
        idSignal,
        secretClienteParametro,
        filtrozero
      );
      setLoading(false);
      openModal(idSignal);
    } catch (error) {
      setIsOk(false);
      window.alert("Você não tem autorização para gerar o relatório");
      setLoading(false);
      console.log("error ao solicitar relatório", error);
    }
  }

  const handleChange = () => {
    setFiltroZero(!filtrozero);
  };

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
      <Flex w={"300px"} alignItems={"center"}>
        <Checkbox mr={2} isChecked={filtrozero} onChange={handleChange} />
        <Text>Filtrar saldos zerados?</Text>
      </Flex>
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
