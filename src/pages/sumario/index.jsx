import { Flex, Img, Text } from "@chakra-ui/react";
import { dataClient } from "../../components/revisaoCarteira/data/dataClient";
import { abreviarNome } from "../../functions/formtadores";
import { IDSUMARIORELATORIO } from "../../constants/idForHTML";

export default function Sumario({ data, filtroData }) {
  const SumarioList = [
    {
      id: 1,
      item: `01   Visão Geral da Carteira`,
    },
    {
      id: 2,
      item: `02   Retorno do Mês`,
    },
  ];

  return (
    <Flex
      w={"100%"}
      id={IDSUMARIORELATORIO}
      h={"100%"}
      bgGradient="linear(#20A6DF, #123E6B)"
      mx={"auto"}
      shadow={"lg"}
      borderRadius={"lg"}
      flexDir={"column"}
      alignItems={"flex-end"}
    >
      <Flex
        w={"100%"}
        h={"25%"}
        bgColor={"#fff"}
        justifyContent={"space-between"}
        px={10}
        alignItems={"center"}
      >
        <Img src={"/logo-liasys.png"} h={"70%"} />
        <Img src={`data:image/png;base64,${data.foto}`} h={"70%"} />
      </Flex>
      <Flex w={"100%"} justifyContent={"flex-end"}>
        <Flex
          w={"20%"}
          height={"50vh"}
          mr={4}
          p={6}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text color={"#20A6DF"} fontSize={"40px"} mb={4} fontWeight={"bold"}>
            {`Sumário`}
          </Text>
        </Flex>
        <Flex w={"35%"} height={"50vh"} p={6} mt={6} flexDir={"column"}>
          {SumarioList.map((item) => (
            <Text color={"#fff"} fontSize={"20px"} mb={2} key={item.id}>
              {item.item}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
