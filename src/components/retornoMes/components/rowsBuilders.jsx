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
import { ToLocaleFormat } from "../../../functions/formtadores";

export default function rowsBuilder(data, rowList) {
  const fontTd = "12px";

  return data.map((obj, index) => {
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
      const rowCells = rowList.map((key, index) => {
        if (key === "nomeFundo") {
          return (
            <Td
              borderTopLeftRadius="lg"
              borderBottomLeftRadius="lg"
              fontSize={fontTd}
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
        if (key === "efetivo") {
          return (
            <Td
              borderTopRightRadius={"lg"}
              borderBottomRightRadius={"lg"}
              textAlign={"center"}
              fontSize={fontTd}
            >{`${obj[key].toFixed(4)} %`}</Td>
          );
        }
        if (key === "retornoPercentual") {
          return (
            <Td textAlign={"center"} fontSize={fontTd}>{`${obj[key].toFixed(
              4
            )} %`}</Td>
          );
        }

        return <Td fontSize={fontTd}>{obj[key]}</Td>;
      });

      if (obj.isTotal === true) {
        return (
          <Tr
            my={0.5}
            bgColor={"#C9C9C9"}
            borderRadius={"md"}
            sx={{ lineHeight: "1" }}
            fontSize={fontTd}
            key={index}
            fontWeight={"bold"}
          >
            {[...rowCells]}
          </Tr>
        );
      } else {
        return (
          <Tr
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
    }
  });
}
