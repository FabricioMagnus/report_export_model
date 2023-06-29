import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Flex, Img } from "@chakra-ui/react";

import TableComponent from "./components/revisaoCarteira/components/TableComponent";
import { arrayCabecalho } from "./components/revisaoCarteira/data/cabecalho";
import { rowList } from "./components/revisaoCarteira/data/rowList";
import { IDRETORNODOMES, IDREVISAOCARTEIRA } from "./constants/idForHTML";
import Capa from "./pages/capa";
import ServicesApi from "./services/services";
import GraficosVisaoGeralCarteira from "./pages/graficosVisaoGeralCarteira";
import Sumario from "./pages/sumario";
import { useParams } from "react-router-dom";
import TableComponentRetorno from "./components/retornoMes/components/TableComponentRetorno";
import Filtros from "./defaultComponents/filtros";
import SwipperBuilder from "./defaultComponents/swipper";
import { arrayCabecalhoRetornoMes } from "./components/retornoMes/data/cabecalho";
import { rowListretornoMes } from "./components/retornoMes/data/rowList";

function App() {
  const componentRef = useRef();

  const [loading, setLoading] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [viewRelatório, setViewRelatório] = useState(false);
  const [filtroData, setFiltroData] = useState("");

  const [dataCliente, setDataCliente] = useState([]);

  const [dataCarteira, setDataCarteira] = useState([]);
  const [arrayIdsRevisaoCarteira, setArrayIdsRevisaoCarteira] = useState([]);
  const [arrayIdsRetornoMes, setArrayIdsRetornoMes] = useState([]);

  const [dataGrafico, setDataGrafico] = useState([]);
  const [dataGraficoTipos, setDataGraficoTipos] = useState([]);

  const [dataRetorno, setDataRetorno] = useState([]);
  const [dataRetornoResumo, setDataRetornoResumo] = useState([]);

  const idClienteDeTeste = 129;

  const { id } = useParams();
  const idClienteParametro = id ? Number(id) : idClienteDeTeste;

  async function getRelatorio() {
    try {
      //CHAMADA DE API PARA REVISÃO DA CARTEIRA
      const response = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteParametro,
        "carteira",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataCarteira(response);

      // Criação do array de IDs
      const ids = response.reduce((acc, item, index) => {
        if (index % 10 === 0) {
          const IDREVISAOCARTEIRA = "IDREVISAOCARTEIRA"; // Defina o valor correto para IDREVISAOCARTEIRA
          const id = `${IDREVISAOCARTEIRA}-${Math.floor(index / 10)}`;
          acc.push(id);
        }
        return acc;
      }, []);
      setArrayIdsRevisaoCarteira(ids);
      //CHAMADA DE API PARA DADOS DO CLIENTE
      const response2 = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteParametro,
        "cliente",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataCliente(response2);
      //CHAMADA DE API PARA GRAFICO DE LEGISLAÇÃO DA REVISÃO DA CARTEIRA
      const response3 = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteParametro,
        "contagemlegislacao",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataGrafico(response3);
      //CHAMADA DE API PARA GRAFICO DE TIPOS DA REVISÃO DA CARTEIRA
      const response4 = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteParametro,
        "contagemtipo",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataGraficoTipos(response4);
      //CHAMADA DE API PARA RETORNO DO MÊS
      const response5 = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteParametro,
        "retorno",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataRetorno(response5);
      //CHAMADA DE API PARA RESUMO DO RETORNO DO MÊS
      const response6 = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteParametro,
        "retornoresumo",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataRetornoResumo(response6);

      const idsRetornoMês = response.reduce((acc, item, index) => {
        if (index % 10 === 0) {
          const id = `${IDRETORNODOMES}-${Math.floor(index / 10)}`;
          acc.push(id);
        }
        return acc;
      }, []);
      setArrayIdsRetornoMes(idsRetornoMês);

      setViewRelatório(true);
    } catch (error) {
      setViewRelatório(false);
      console.log("error", error);
    }
  }

  useEffect(() => {
    if (isOk) {
      getRelatorio();
    }
  }, [isOk]);

  return (
    <Flex
      w={"100vw"}
      h={"fit-content"}
      flexDirection={"column"}
      bgColor={"#e5e5e5"}
      justifyContent={"space-evenly"}
    >
      <Flex
        h={"6vh"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        bgColor={"#fff"}
        shadow={"lg"}
        position={"sticky"}
        top={0}
      >
        <Filtros
          componentRef={componentRef}
          loading={loading}
          setLoading={setLoading}
          isOk={isOk}
          setIsOk={setIsOk}
          filtroData={filtroData}
          setFiltroData={setFiltroData}
          arrayIds={arrayIdsRevisaoCarteira}
          arrayIdsRetornoMes={arrayIdsRetornoMes}
        />
      </Flex>
      <Flex
        h={"fit-content"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Flex w={"100%"} h={"94vh"} bgColor={"#fff"} p={3} overflowY={"hidden"}>
          {viewRelatório && isOk && (
            <SwipperBuilder
              components={[
                <Capa
                  data={dataCliente && dataCliente}
                  filtroData={filtroData}
                />,
                <Sumario
                  data={dataCliente && dataCliente}
                  filtroData={filtroData}
                />,
                ...(dataCarteira &&
                  dataCarteira
                    .reduce((result, item, index) => {
                      const chunkIndex = Math.floor(index / 17);
                      if (!result[chunkIndex]) {
                        result[chunkIndex] = [];
                      }
                      result[chunkIndex].push(item);
                      return result;
                    }, [])
                    .map((group, groupIndex) => {
                      return (
                        <TableComponent
                          key={groupIndex}
                          headerList={arrayCabecalho}
                          data={group}
                          rowList={rowList}
                          loading={false}
                          nomeCliente={dataCliente && dataCliente.nome}
                          cnpjCliente={dataCliente && dataCliente.cnpj}
                          id={`${IDREVISAOCARTEIRA}-${groupIndex}`}
                        />
                      );
                    })),
                <GraficosVisaoGeralCarteira
                  dataCarteira={dataCarteira && dataCarteira}
                  nomeCliente={dataCliente && dataCliente.nome}
                  cnpjCliente={dataCliente && dataCliente.cnpj}
                  dataGraficoLegislacao={dataGrafico && dataGrafico}
                  dataGraficoTipos={dataGraficoTipos && dataGraficoTipos}
                />,
                ...(dataRetorno &&
                  dataRetorno
                    .reduce((result, item, index) => {
                      const chunkIndex = Math.floor(index / 17);
                      if (!result[chunkIndex]) {
                        result[chunkIndex] = [];
                      }
                      result[chunkIndex].push(item);
                      return result;
                    }, [])
                    .map((group, groupIndex) => {
                      return (
                        <TableComponentRetorno
                          key={groupIndex}
                          headerList={arrayCabecalhoRetornoMes}
                          data={group}
                          rowList={rowListretornoMes}
                          loading={false}
                          nomeCliente={dataCliente && dataCliente.nome}
                          cnpjCliente={dataCliente && dataCliente.cnpj}
                          id={`${IDRETORNODOMES}-${groupIndex}`}
                        />
                      );
                    })),
              ]}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
//teste
