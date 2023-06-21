/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import {
  CNPJFormater,
  CPFFormater,
  CaptionFormater,
  ToLocaleFormat,
  abreviarNome,
} from "../../../functions/formtadores";

export default function TableComponent({
  headerList,
  data,
  rowList,
  loading,
  nomeCliente,
}) {
  const Rows = data.map((obj, index) => {
    const arrayToLocaleFormater = [
      "valor",
      "saldo",
      "value",
      "credito",
      "debito",
      "valorRestante",
    ];

    const arrayToCaptionFormat = ["legislacao", "tipo"];

    const arrayToPercentFormat = ["taxaAdm"];

    //saldoPeriodo

    const rowCells = rowList.map((key, index) => {
      if (key.toLowerCase().includes("telefone")) {
        return <Td>{PhoneFormater(obj[key])}</Td>;
      }
      if (key === "nomeFundo" || key === "enquadramentoLegislacao") {
        return (
          <Td style={{ wordWrap: "break-word" }}>
            {CaptionFormater(obj[key])}
          </Td>
        );
      }
      if (key === "patrimonioLiquido") {
        return (
          <Td minWidth={"120px"}>{`${(obj.saldo === 0
            ? 0
            : obj.saldo / obj[key]
          ).toFixed(5)} %`}</Td>
        );
      }
      if (key === "taxaAdm") {
        return <Td>{`${obj[key]} %`}</Td>;
      }
      if (key === "participacao") {
        const total = data.reduce((a, b) => a + b.saldo, 0);
        return <Td>{`${(obj.saldo / total).toFixed(5)} %`}</Td>;
      }
      if (arrayToLocaleFormater.includes(key.toLowerCase())) {
        return <Td>{ToLocaleFormat(obj[key])}</Td>;
      }
      // if (arrayToPercentFormat.includes(key.toLowerCase())) {
      //   return <Td>{`${obj[key]} %`}</Td>;
      // }
      if (arrayToCaptionFormat.includes(key.toLowerCase())) {
        return <Td>{CaptionFormater(obj[key])}</Td>;
      }
      if (
        key.toLowerCase().includes("cpf") ||
        key.toLowerCase().includes("cnpj")
      ) {
        if (obj[key].length === 11) {
          return <Td>{CPFFormater(obj[key])}</Td>;
        }
        return <Td>{CNPJFormater(obj[key])}</Td>;
      }
      return <Td>{obj[key]}</Td>;
    });

    return (
      <Tr style={{ pageBreakInside: "avoid" }} fontSize={"12px"} key={index}>
        {[...rowCells]}
      </Tr>
    );
  });

  const Header_Row =
    headerList &&
    headerList.map((item, index) => (
      <Th fontSize={"11px"} bgColor={"blue.900"} color={"white"} key={index}>
        {item}
      </Th>
    ));

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <Flex flexDirection="column" h={"100%"} my={6}>
      <Flex
        w={"100%"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        mb={3}
      >
        <Text fontSize={"2xl"} fontWeight={"bold"} color={"blue.900"}>
          Visão Geral da Carteira
        </Text>
        <Text fontSize={"2xl"} fontWeight={"bold"} color={"blue.900"}>
          Cliente : {abreviarNome(nomeCliente)}
        </Text>
      </Flex>
      <Table variant={"striped"}>
        <Thead>
          <Tr>{Header_Row}</Tr>
        </Thead>
        <Tbody>{Rows}</Tbody>
      </Table>
    </Flex>
  );
}
