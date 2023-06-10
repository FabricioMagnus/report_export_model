import { Flex, Input, Button } from "@chakra-ui/react";

export default function Filtros() {
  return (
    <Flex w={"100vw"} justifyContent={"space-evenly"}>
      <Input type="date" maxWidth="200px" />
      <Button type="submit">Filtrar</Button>
      <Button type="reset">Imprimir</Button>
      <Button type="button">Exportar</Button>
    </Flex>
  );
}
