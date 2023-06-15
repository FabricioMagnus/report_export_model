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
    <Flex w={"100vw"} h={"100vh"} flexDirection={"column"}>
      <Flex
        w={"100%"}
        h={"11vh"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Filtros componentRef={componentRef} />
      </Flex>
      <Flex
        w={"100%"}
        h={"81vh"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        {/* <div id="myScreen" ref={componentRef}>
          <Flex w={"100%"}>
            <TableComponent
              headerList={arrayCabecalho}
              data={arrayListObjects}
              rowList={rowList}
              loading={false}
            />
          </Flex>
        </div> */}
      </Flex>
      <Flex w={"100%"} h={"8vh"} bg={"blue"}>
        teste
      </Flex>
    </Flex>
  );
}

export default App;
