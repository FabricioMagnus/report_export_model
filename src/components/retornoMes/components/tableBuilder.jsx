import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  TableCaption,
} from "@chakra-ui/react";
import CabecalhoRelatorio from "../../../defaultComponents/CabecalhoRelatório";

export default function TableBuilder({
  id,
  nomeCliente,
  cnpjCliente,
  Header_Row,
  Rows,
  titulo,
}) {
  return (
    <div
      style={{
        pageBreakInside: "avoid",
        width: "100%",
      }}
      id={id}
    >
      <Flex
        flexDirection="column"
        height={"95%"}
        my={3}
        bgColor={"#fff"}
        w={"98%"}
        mx={"auto"}
      >
        <CabecalhoRelatorio
          titulo={"Retorno do Mês"}
          nomeCliente={nomeCliente}
          cnpjCliente={cnpjCliente}
        />
        <Flex w={"90%"} mx={"auto"} mt={4} flexDir={"column"}>
          {titulo && (
            <Text
              color={"#20A6DF"}
              fontWeight={"bold"}
              my={2}
              fontSize={"20px"}
            >
              {titulo}
            </Text>
          )}
          <Table
            variant={"simple"}
            size={"sm"}
            sx={{ display: "table", tableLayout: "auto" }}
            borderRadius={"5px"}
          >
            <Thead>
              <Tr>{Header_Row}</Tr>
            </Thead>
            <Tbody>{Rows}</Tbody>
          </Table>
        </Flex>
      </Flex>
    </div>
  );
}
