import { useEffect, useRef, useState } from "react";
import { Flex } from "@chakra-ui/react";
import Filtros from "./components/filtros";
import TableComponent from "./components/viewPDF/components/TableComponent";
import { arrayCabecalho } from "./components/viewPDF/data/cabecalho";
import { rowList } from "./components/viewPDF/data/rowList";
import BarChart from "./components/graficos/barChart";
import PieChart from "./components/graficos/pieChart";
import {
  IDCAPARELATORIO,
  IDGRAFICOSREVISAOCARTEIRA,
  IDREVISAOCARTEIRA,
} from "./constants/idForHTML";
import Capa from "./components/capa";
import Capa from "./pages/capa";
import { dataClient } from "./components/viewPDF/data/dataClient";
import ServicesApi from "./services/services";
import SwipperBuilder from "./components/swipper";
import GraficosVisaoGeralCarteira from "./pages/graficosVisaoGeralCarteira";

function App() {
  const componentRef = useRef();

  const [loading, setLoading] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [viewRelatório, setViewRelatório] = useState(false);
  const [filtroData, setFiltroData] = useState("");

  const [dataCarteira, setDataCarteira] = useState([]);
  const [dataCliente, setDataCliente] = useState([]);

  const idClienteDeTeste = 129;

  async function getRelatorio() {
    try {
      const response = await ServicesApi.getJsonByTipo(
        filtroData.split("-")[0],
        idClienteDeTeste,
        "carteira",
        filtroData.split("-")[1].replace(/^0+(?!10$)/g, "")
      );
      // console.log("response do get de relatório", response);
      setDataCarteira(response);
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
      fontFamily={"roboto"}
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
                ...(dataCarteira &&
                  dataCarteira
                    .reduce((result, item, index) => {
                      const chunkIndex = Math.floor(index / 7);
                      if (!result[chunkIndex]) {
                        result[chunkIndex] = [];
                      }
                      result[chunkIndex].push(item);
                      return result;
                    }, [])
                    .map((group, groupIndex) => (
                      <TableComponent
                        key={groupIndex}
                        headerList={arrayCabecalho}
                        data={group}
                        rowList={rowList}
                        loading={false}
                        nomeCliente={dataCliente && dataCliente.nome}
                      />
                    ))),
                <GraficosVisaoGeralCarteira
                  dataCarteira={dataCarteira && dataCarteira}
                />,
              ]}
            />
          )}
        </Flex>
        {/* {viewRelatório && isOk && (
          <Flex
            bgColor={"#fff"}
            my={3}
            mx={"auto"}
            borderRadius={"lg"}
            shadow={"lg"}
            w={"98%"}
            height={"fit-content"}
          >
            <div ref={componentRef} style={{ padding: "15px", fontFamily: "roboto" }}>
              <div
                id={IDCAPARELATORIO}
                style={{
                  pageBreakInside: "avoid"
                }}
              >
                <Capa
                  data={dataCliente && dataCliente}
                  filtroData={filtroData}
                />
              </div>
              <div
                id={IDREVISAOCARTEIRA}
                style={{
                  pageBreakInside: "avoid"
                }}
              >
                <TableComponent
                  headerList={arrayCabecalho}
                  data={dataCarteira && dataCarteira}
                  rowList={rowList}
                  loading={false}
                  nomeCliente={dataCliente && dataCliente.nome}
                />
              </div>
<<<<<<< HEAD
              <div
                style={{
                  pageBreakInside: "avoid"
                }}
                id={IDGRAFICOSREVISAOCARTEIRA}
              >
                <Flex
                  bgColor={"#fff"}
                  my={3}
                  mx={"auto"}
                  px={6}
                  borderRadius={"lg"}
                  w={"100%"}
                  justifyContent={"space-evenly"}
                  height={"fit-content"}
                >
                  <Flex
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    width={"49.5%"}
                    bgColor={"#fff"}
                    minHeight={"500px"}
                    height={"500px"}
                    mt={"0.5%"}
                    py={5}
                    my={"0.5%"}
                    border={"1px solid #e5e5e5"}
                    borderRadius={"lg"}
                  >
                    <PieChart dataChart={dataCarteira && dataCarteira} />
                  </Flex>
                  <Flex
                    justifyContent={"center"}
                    alignItems={"flex-start"}
                    width={"49.5%"}
                    bgColor={"#fff"}
                    minHeight={"500px"}
                    maxHeight={"500px"}
                    py={5}
                    my={"0.5%"}
                    border={"1px solid #e5e5e5"}
                    borderRadius={"lg"}
                  >
                    <BarChart dataChart={dataCarteira && dataCarteira} />
                  </Flex>
                </Flex>
              </div>
=======
              <GraficosVisaoGeralCarteira
                dataCarteira={dataCarteira && dataCarteira}
              />
>>>>>>> master
            </div>
          </Flex>
        )} */}
      </Flex>
    </Flex>
  );
}

export default App;
//teste
