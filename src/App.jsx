import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Flex, Img } from "@chakra-ui/react";
import Filtros from "./components/filtros";
import TableComponent from "./components/viewPDF/components/TableComponent";
import { arrayCabecalho } from "./components/viewPDF/data/cabecalho";
import { arrayListObjects } from "./components/viewPDF/data/dataTable";
import { rowList } from "./components/viewPDF/data/rowList";
import BarChart from "./components/graficos/barChart";
import PieChart from "./components/graficos/pieChart";
import {
  IDCAPARELATORIO,
  IDGRAFICOSREVISAOCARTEIRA,
  IDREVISAOCARTEIRA,
} from "./constants/idForHTML";
import Capa from "./pages/capa";
import { dataClient } from "./components/viewPDF/data/dataClient";
import ServicesApi from "./services/services";
import SwipperBuilder from "./components/swipper";
import GraficosVisaoGeralCarteira from "./pages/graficosVisaoGeralCarteira";
import Sumario from "./pages/sumario";

function App() {
  const componentRef = useRef();

  const [loading, setLoading] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [viewRelatório, setViewRelatório] = useState(false);
  const [filtroData, setFiltroData] = useState("");

  const [dataCliente, setDataCliente] = useState([]);

  const [dataCarteira, setDataCarteira] = useState([]);
  const [arrayIdsRevisaoCarteira, setArrayIdsRevisaoCarteira] = useState([]);

  const idClienteDeTeste = 129;

  // async function getRelatorio() {
  //   try {
  //     const response = await ServicesApi.getJsonByTipo(
  //       filtroData.split("-")[0],
  //       idClienteDeTeste,
  //       "carteira",
  //       filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
  //     );
  //     // console.log("response do get de relatório", response);
  //     setDataCarteira(response);
  //     const response2 = await ServicesApi.getJsonByTipo(
  //       filtroData.split("-")[0],
  //       idClienteDeTeste,
  //       "cliente",
  //       filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
  //     );
  //     setDataCliente(response2);
  //     setArrayIdsRevisaoCarteira();
  //     setViewRelatório(true);
  //   } catch (error) {
  //     setViewRelatório(false);
  //     console.log("error", error);
  //   }
  // }

  async function getRelatorio() {
    try {
      const response = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteDeTeste,
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
        idClienteDeTeste,
        "cliente",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      setDataCliente(response2);

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
      w={"99vw"}
      h={"fit-content"}
      flexDirection={"column"}
      bgColor={"#e5e5e5"}
      justifyContent={"space-evenly"}
    >
      <Flex
        h={"11vh"}
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
        <Flex w={"100%"} h={"89vh"} bgColor={"#fff"} p={5}>
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
                      const chunkIndex = Math.floor(index / 15);
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
