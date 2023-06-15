import { useState, useRef } from "react";
import "./App.css";
import { Flex } from "@chakra-ui/react";
import Filtros from "./components/filtros";
import TableComponent from "./components/viewPDF/components/TableComponent";
import { Button } from "@chakra-ui/react";
import { arrayCabecalho } from "./components/viewPDF/data/cabecalho";
import { arrayListObjects } from "./components/viewPDF/data/dataTable";
import { rowList } from "./components/viewPDF/data/rowList";

function App() {
  const componentRef = useRef();

  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      flexDirection={"column"}
      bgColor={"#e5e5e5"}
      justifyContent={"space-evenly"}
    >
      <Flex
        w={"100%"}
        h={"11vh"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        bgColor={"#fff"}
        shadow={"lg"}
      >
        <Filtros componentRef={componentRef} />
      </Flex>
      <Flex
        w={"100%"}
        h="calc( 100% - 11vh )"
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <div id="myScreen" ref={componentRef}>
          <TableComponent
            headerList={arrayCabecalho}
            data={arrayListObjects}
            rowList={rowList}
            loading={false}
          />
        </div>
      </Flex>
      {/* <Flex w={"100%"} h={"8vh"} bg={"blue"}>
        teste
      </Flex> */}
    </Flex>
  );
}

export default App;
