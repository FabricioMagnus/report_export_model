import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ServicesApi from "../../services/services";
import TableComponentRetorno from "../../components/retornoMes/components/TableComponentRetorno";
import { arrayCabecalhoRetornoMes } from "../../components/retornoMes/data/cabecalho";
import { rowListretornoMes } from "../../components/retornoMes/data/rowList";
import { IDRETORNODOMES } from "../../constants/idForHTML";

export default function Teste() {
  const [dataRetorno, setDataRetorno] = useState([]);
  const [dataCliente, setDataCliente] = useState([]);

  async function getRelatorio() {
    try {
      const response5 = await ServicesApi.getJsonByTipo(
        "2023",
        129,
        "retorno",
        "4"
      );
      setDataRetorno(response5);

      const response2 = await ServicesApi.getJsonByTipo(
        "2023",
        129,
        "cliente",
        "4"
      );
      setDataCliente(response2);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getRelatorio();
  }, []);

  return (
    <Flex
      w={"99.2vw"}
      h={"fit-content"}
      flexDirection={"column"}
      bgColor={"#e5e5e5"}
      justifyContent={"space-evenly"}
    >
      {dataRetorno &&
        dataRetorno
          .reduce((result, item, index) => {
            const chunkIndex = Math.floor(index / 18);
            if (!result[chunkIndex]) {
              result[chunkIndex] = [];
            }
            result[chunkIndex].push(item);
            return result;
          }, [])
          .map((group, groupIndex) => {
            return (
              <TableComponentRetorno
                key={groupIndex}
                headerList={arrayCabecalhoRetornoMes}
                data={group}
                rowList={rowListretornoMes}
                loading={false}
                nomeCliente={dataCliente && dataCliente.nome}
                cnpjCliente={dataCliente && dataCliente.cnpj}
                id={`${IDRETORNODOMES}-${groupIndex}`}
              />
            );
          })}
    </Flex>
  );
}
