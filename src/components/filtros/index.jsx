import { Flex, Input, Button } from "@chakra-ui/react";
import handleExportPDF from "../../functions/exportPDF";
import ReactToPrint from "react-to-print";
import { useState } from "react";
import ModalComponent from "../exportModal";

export default function Filtros({ componentRef }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex w={"100%"} justifyContent={"space-evenly"}>
      <Input
        bgColor={"blue.900"}
        color={"white"}
        type="date"
        textColor={"white"}
        maxWidth="200px"
      />

      <ReactToPrint
        trigger={() => (
          <Button bgColor={"blue.900"} color={"white"} type="reset">
            Imprimir
          </Button>
        )}
        content={() => componentRef.current}
      />
      <Button
        type="button"
        bgColor={"blue.900"}
        color={"white"}
        onClick={() => {
          setIsOpen(true);
          // handleExportPDF("myScreen");
        }}
      >
        Exportar
      </Button>

      <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </Flex>
  );
}
