import { Flex, Img } from "@chakra-ui/react";
import PieChart from "../../components/graficos/pieChart";
import BarChart from "../../components/graficos/barChart";
import { IDGRAFICOSREVISAOCARTEIRA } from "../../constants/idForHTML";
import CabecalhoRelatorio from "../../components/CabecalhoRelatório";

export default function GraficosVisaoGeralCarteira({
  dataCarteira,
  nomeCliente,
  cnpjCliente,
}) {
  return (
    <div
      style={{
        pageBreakInside: "avoid",
        width: "98.5%",
      }}
      id={IDGRAFICOSREVISAOCARTEIRA}
    >
      <Flex
        bgColor={"#fff"}
        px={6}
        m={3}
        w={"100%"}
        justifyContent={"space-evenly"}
        height={"95%"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <CabecalhoRelatorio
          titulo={"Visão Geral da Carteira"}
          nomeCliente={nomeCliente}
          cnpjCliente={cnpjCliente}
        />
        <Flex
          w={"90%"}
          mx={"auto"}
          h={"80%"}
          mt={8}
          justifyContent={"space-evenly"}
        >
          <Flex
            justifyContent={"center"}
            alignItems={"flex-start"}
            width={"49%"}
            bgColor={"#fff"}
            minHeight={"500px"}
            height={"500px"}
            mt={"0.5%"}
            py={5}
            my={"0.5%"}
            border={"1px solid #e5e5e5"}
            borderRadius={"lg"}
          >
            <PieChart
              dataChart={
                dataCarteira &&
                dataCarteira.filter(
                  (item) =>
                    !item.hasOwnProperty("isHeader") &&
                    !item.hasOwnProperty("isFooter")
                )
              }
            />
          </Flex>
          <Flex
            justifyContent={"center"}
            alignItems={"flex-start"}
            width={"49.5%"}
            bgColor={"#fff"}
            minHeight={"500px"}
            height={"500px"}
            maxHeight={"500px"}
            py={5}
            my={"0.5%"}
            border={"1px solid #e5e5e5"}
            borderRadius={"lg"}
          >
            <BarChart
              dataChart={
                dataCarteira &&
                dataCarteira.filter(
                  (item) =>
                    !item.hasOwnProperty("isHeader") &&
                    !item.hasOwnProperty("isFooter")
                )
              }
            />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
}
