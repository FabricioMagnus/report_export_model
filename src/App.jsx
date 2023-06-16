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
        <div id="myScreen" ref={componentRef}>
          <TableComponent
            headerList={arrayCabecalho}
            data={arrayListObjects}
            rowList={rowList}
            loading={false}
          />
        </div>
        <div id="myScreen2" ref={componentRef}>
          <TableComponent
            headerList={arrayCabecalho}
            data={arrayListObjects}
            rowList={rowList}
            loading={false}
          />
        </div>
      </Flex>
    </Flex>
  );
}

export default App;
