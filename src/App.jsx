import { useRef } from "react";
import "./App.css";
import { Flex } from "@chakra-ui/react";
import Filtros from "./components/filtros";
import TableComponent from "./components/viewPDF/components/TableComponent";
import { arrayCabecalho } from "./components/viewPDF/data/cabecalho";
import { arrayListObjects } from "./components/viewPDF/data/dataTable";
import { rowList } from "./components/viewPDF/data/rowList";
import BarChart from "./components/graficos/barChart";
import LineChart from "./components/graficos/lineChart";
import PieChart from "./components/graficos/pieChart";
import {
  IDGRAFICOSREVISAOCARTEIRA,
  IDREVISAOCARTEIRA,
} from "./constants/idForHTML";

function App() {
  const componentRef = useRef();

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
        <Filtros componentRef={componentRef} />
      </Flex>
      <Flex
        h={"fit-content"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Flex
          bgColor={"#fff"}
          my={3}
          mx={"auto"}
          px={6}
          borderRadius={"lg"}
          shadow={"lg"}
          w={"98%"}
          height={"fit-content"}
        >
          <div ref={componentRef}>
            <div id={IDREVISAOCARTEIRA}>
              <TableComponent
                headerList={arrayCabecalho}
                data={arrayListObjects}
                rowList={rowList}
                loading={false}
              />
            </div>
            <div>
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
                  <PieChart dataChart={arrayListObjects} />
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
                  <BarChart dataChart={arrayListObjects} />
                </Flex>
              </Flex>
            </div>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
