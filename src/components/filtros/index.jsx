import { Flex, Input, Button } from "@chakra-ui/react";
import handleExportPDF from "../../functions/exportPDF";
import ReactToPrint from "react-to-print";
import { useState } from "react";
import ModalComponent from "../exportModal";

export default function Filtros({ componentRef }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex w={"100vw"} justifyContent={"space-evenly"}>
      <Input type="date" maxWidth="200px" />
      <Button type="submit">Filtrar</Button>
      <ReactToPrint
        trigger={() => <Button type="reset">Imprimir</Button>}
        content={() => componentRef.current}
      />

      <Button
        type="button"
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
