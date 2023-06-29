/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
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
import rowsBuilder from "./rowsBuilders";
import HeaderBuilder from "./headerBuilder";
import TableBuilder from "./tableBuilder";

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

  const headerIndices = [];

  if (!data[0].isHeader) {
    headerIndices.push(0);
  }

  headerIndices.push(
    ...data.reduce((indices, obj, index) => {
      if (obj.isHeader) {
        indices.push(index);
      }
      return indices;
    }, [])
  );

  headerIndices.push(data.length);

  const groups = headerIndices
    .map((value, index, arr) => {
      if (index !== arr.length - 1) {
        return data.slice(value, arr[index + 1]);
      }
    })
    .filter((item) => item);

  console.log("headerIndices", headerIndices);
  console.log("groups", groups);
  const Header_Row = HeaderBuilder(headerList);
  const Rows = rowsBuilder(data, rowList);

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
        // h={"94vh"}
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
          {groups.map((group, index) => {
            const filtered = group.filter((item) => !item.isHeader);
            const titulo = group.filter((item) => item.isHeader)[0];
            const Rows = rowsBuilder(filtered, rowList);
            return (
              <TableBuilder
                Header_Row={Header_Row}
                Rows={Rows}
                titulo={titulo ? titulo.nomeFundo : ""}
                key={index}
              />
            );
          })}
        </Flex>
      </Flex>
    </div>
  );
}
