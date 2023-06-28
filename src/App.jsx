import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Flex, Img } from "@chakra-ui/react";
import Filtros from "./components/filtros";
import TableComponent from "./components/viewPDF/components/TableComponent";
import { arrayCabecalho } from "./components/viewPDF/data/cabecalho";
import { rowList } from "./components/viewPDF/data/rowList";
import { IDREVISAOCARTEIRA } from "./constants/idForHTML";
import Capa from "./pages/capa";
import ServicesApi from "./services/services";
import SwipperBuilder from "./components/swipper";
import GraficosVisaoGeralCarteira from "./pages/graficosVisaoGeralCarteira";
import Sumario from "./pages/sumario";
import { useParams } from "react-router-dom";

function App() {
  const componentRef = useRef();

  const [loading, setLoading] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [viewRelatório, setViewRelatório] = useState(false);
  const [filtroData, setFiltroData] = useState("");

  const [dataCliente, setDataCliente] = useState([]);

  const [dataCarteira, setDataCarteira] = useState([]);
  const [arrayIdsRevisaoCarteira, setArrayIdsRevisaoCarteira] = useState([]);

  const [dataGrafico, setDataGrafico] = useState([]);
  const [dataGraficoTipos, setDataGraficoTipos] = useState([]);

  const idClienteDeTeste = 129;

  const { id } = useParams();
  const idClienteParametro = id ? Number(id) : idClienteDeTeste;

  async function getRelatorio() {
    try {
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

      const response2 = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteParametro,
        "cliente",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataCliente(response2);

      const response3 = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteParametro,
        "contagemlegislacao",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataGrafico(response3);

      const response4 = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteParametro,
        "contagemtipo",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataGraficoTipos(response4);

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
