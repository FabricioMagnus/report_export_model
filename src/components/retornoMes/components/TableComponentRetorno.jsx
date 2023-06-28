/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";

import { IDREVISAOCARTEIRA } from "../../../constants/idForHTML";
import CabecalhoRelatorio from "../../../defaultComponents/CabecalhoRelatório";
import { ToLocaleFormat } from "../../../functions/formtadores";

export default function TableComponentRetorno({
  headerList,
  data,
  rowList,
  loading,
  nomeCliente,
  cnpjCliente,
  id,
}) {
  const fontTd = "12px";

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
          my={0.5}
          bgColor={"#20A6DF"}
          color={"#fff"}
          sx={{ lineHeight: "1" }}
          fontSize={"10px"}
          key={index}
        >
          <Td borderTopLeftRadius="lg" borderBottomLeftRadius="lg">
            {obj.nomeFundo}
          </Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{}</Td>

          <Td
            borderTopRightRadius={"lg"}
            borderBottomRightRadius={"lg"}
            textAlign={"center"}
          ></Td>
        </Tr>
      );
    }

    if (obj.isFooter && obj.isFooter === true) {
      return (
        <Tr
          bgColor={"#123E6B"}
          color={"#fff"}
          my={0.5}
          fontWeight={"bold"}
          sx={{ lineHeight: "1" }}
          fontSize={fontTd}
          key={index}
        >
          <Td
            bgColor={"#123E6B"}
            borderTopLeftRadius="lg"
            borderBottomLeftRadius="lg"
          >
            {obj.nomeFundo}
          </Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>
          <Td bgColor={"#123E6B"}>{}</Td>

          <Td
            borderTopRightRadius={"lg"}
            borderBottomRightRadius={"lg"}
            textAlign={"center"}
          ></Td>
        </Tr>
      );
    }

    if (!obj.isHeader && !obj.isFooter) {
      const arrayToCaptionFormat = ["legislacao", "tipo"];

      const rowCells = rowList.map((key, index) => {
        if (key === "nomeFundo") {
          return (
            <Td
              borderTopLeftRadius="lg"
              borderBottomLeftRadius="lg"
              fontSize={fontTd}
              style={{ wordWrap: "break-word" }}
            >
              {obj[key].slice(0, 30)}
            </Td>
          );
        }
        if (
          key === "saldoAnterior" ||
          key === "saldoAtual" ||
          key === "aplicacoes" ||
          key === "resgates" ||
          key === "retorno"
        ) {
          return (
            <Td fontSize={fontTd} textAlign={"center"}>
              {ToLocaleFormat(obj[key])}
            </Td>
          );
        }
        if (key === "participacao") {
          return (
            <Td textAlign={"center"} fontSize={fontTd}>{`${obj[key]} %`}</Td>
          );
        }
        if (key === "efetivo" || key === "retornoPercentual") {
          return (
            <Td textAlign={"center"} fontSize={fontTd}>{`${obj[key].toFixed(
              4
            )} %`}</Td>
          );
        }

        return <Td fontSize={fontTd}>{obj[key]}</Td>;
      });

      return (
        <Tr
          style={{
            pageBreakInside: "avoid",
            maxHeight: "25px",
            height: "10px",
          }}
          my={0.5}
          bgColor={index % 2 === 0 ? "#F3F3F3" : "#EBEBEB"}
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
    headerList.map((item, index) => {
      const isFirstChild = index === 0;
      const isLastChild = index === headerList.length - 1;

      if (isLastChild) {
        return (
          <Th
            fontSize={fontTd}
            borderTopRightRadius={"lg"}
            bgColor={"blue.900"}
            borderBottomRightRadius={"lg"}
            color={"white"}
            key={index}
            textAlign={"center"}
          >
            {item}
          </Th>
        );
      }
      if (isFirstChild) {
        return (
          <Th
            fontSize={fontTd}
            borderTopLeftRadius={"lg"}
            borderBottomLeftRadius={"lg"}
            bgColor={"blue.900"}
            color={"white"}
            key={index}
            style={{ maxHeight: "20px" }}
            textAlign={"center"}
          >
            {item}
          </Th>
        );
      }

      return (
        <Th
          fontSize={fontTd}
          bgColor={"blue.900"}
          color={"white"}
          key={index}
          height={"35px"}
          textAlign={"center"}
          // style={{ maxHeight: "20px" }}
        >
          {item}
        </Th>
      );
    });

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
