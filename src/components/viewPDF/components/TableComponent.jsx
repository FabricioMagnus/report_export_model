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
import CabecalhoRelatorio from "../../CabecalhoRelatório";
import { IDREVISAOCARTEIRA } from "../../../constants/idForHTML";

export default function TableComponent({
  headerList,
  data,
  rowList,
  loading,
  nomeCliente,
  cnpjCliente,
  id,
}) {
  const fontTd = "10px";

  const Rows = data.map((obj, index) => {
    const arrayToLocaleFormater = [
      "valor",
      "saldo",
      "value",
      "credito",
      "debito",
      "valorRestante",
    ];

    if (obj.isHeader && obj.isHeader === true) {
      return (
        <Tr
          style={{
            pageBreakInside: "avoid",
            maxHeight: "25px",
            height: "25px",
          }}
          bgColor={"#20A6DF"}
          color={"#fff"}
          sx={{ lineHeight: "1" }}
          fontSize={"10px"}
          key={index}
        >
          <Td>{obj.nomeFundo}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td bgColor={"#20A6DF"}>{`${obj.participacao.toFixed(5)} %`}</Td>
          <Td>{ToLocaleFormat(obj.saldo)}</Td>
        </Tr>
      );
    }

    if (obj.isFooter && obj.isFooter === true) {
      return (
        <Tr
          bgColor={"#123E6B"}
          color={"#fff"}
          fontWeight={"bold"}
          sx={{ lineHeight: "1" }}
          fontSize={fontTd}
          key={index}
        >
          <Td bgColor={"#123E6B"}>{obj.nomeFundo}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{`${obj.participacao.toFixed(5)} %`}</Td>
          <Td bgColor={"#123E6B"}>{ToLocaleFormat(obj.saldo)}</Td>
        </Tr>
      );
    }

    if (!obj.isHeader && !obj.isFooter) {
      const arrayToCaptionFormat = ["legislacao", "tipo"];

      const rowCells = rowList.map((key, index) => {
        if (key === "nomeFundo") {
          return (
            <Td fontSize={fontTd} style={{ wordWrap: "break-word" }}>
              {obj[key].slice(0, 30)}
            </Td>
          );
        }
        if (key === "patrimonioLiquido") {
          return (
            <Td fontSize={fontTd} minWidth={"120px"}>{`${(obj.saldo === 0
              ? 0
              : obj.saldo / obj[key]
            ).toFixed(5)} %`}</Td>
          );
        }
        if (key === "taxaAdm") {
          return <Td fontSize={fontTd}>{`${obj[key]} %`}</Td>;
        }
        if (key === "saldo") {
          return <Td fontSize={fontTd}>{ToLocaleFormat(obj[key])}</Td>;
        }
        if (key === "participacao") {
          return (
            <Td fontSize={fontTd}>{`${
              obj[key] !== 0 ? obj[key].toFixed(5) : 0
            } %`}</Td>
          );
        }
        // if (arrayToLocaleFormater.includes(key.toLowerCase())) {
        //   return <Td>{ToLocaleFormat(obj[key])}</Td>;
        // }
        // if (arrayToPercentFormat.includes(key.toLowerCase())) {
        //   return <Td>{`${obj[key]} %`}</Td>;
        // }
        // if (arrayToCaptionFormat.includes(key.toLowerCase())) {
        //   return <Td>{CaptionFormater(obj[key])}</Td>;
        // }

        return <Td fontSize={fontTd}>{obj[key]}</Td>;
      });

      return (
        <Tr
          style={{
            pageBreakInside: "avoid",
            maxHeight: "25px",
            height: "10px",
          }}
          bgColor={index % 2 === 0 ? "#d3d3d3" : "#fff"}
          borderRadius={"md"}
          sx={{ lineHeight: "1" }}
          fontSize={fontTd}
          key={index}
        >
          {[...rowCells]}
        </Tr>
      );
    }
  });

  const Header_Row =
    headerList &&
    headerList.map((item, index) => (
      <Th
        fontSize={fontTd}
        bgColor={"blue.900"}
        color={"white"}
        key={index}
        style={{ maxHeight: "20px" }}
      >
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
    <div
      style={{
        pageBreakInside: "avoid",
        width: "98.5%",
      }}
      id={id}
    >
      <Flex
        flexDirection="column"
        height={"95%"}
        px={6}
        m={3}
        bgColor={"#fff"}
        w={"98%"}
        mx={"auto"}
      >
        <CabecalhoRelatorio
          titulo={"Visão Geral da Carteira"}
          nomeCliente={nomeCliente}
          cnpjCliente={cnpjCliente}
        />
        <Flex w={"90%"} mx={"auto"} mt={8}>
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
