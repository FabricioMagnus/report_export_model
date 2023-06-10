import { Flex, Input, Button } from "@chakra-ui/react";
import handleExportPDF from "../../functions/exportPDF";

export default function Filtros() {
  return (
    <Flex w={"100vw"} justifyContent={"space-evenly"}>
      <Input type="date" maxWidth="200px" />
      <Button type="submit">Filtrar</Button>
      <Button type="reset">Imprimir</Button>
      <Button type="button" onClick={() => handleExportPDF("myScreen")}>
        Exportar
      </Button>
    </Flex>
  );
}
