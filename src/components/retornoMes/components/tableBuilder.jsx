import { Table, Thead, Tbody, Tr, Text } from "@chakra-ui/react";
import CabecalhoRelatorio from "../../../defaultComponents/CabecalhoRelatório";

export default function TableBuilder({ Header_Row, Rows, titulo }) {
  console.log("titulo", titulo);

  return (
    <>
      <Text color={"#20A6DF"} fontWeight={"bold"} mt={2} fontSize={"20px"}>
        {titulo}
      </Text>
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
    </>
  );
}
