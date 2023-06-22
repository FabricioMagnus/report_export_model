import { Flex, Img, Text } from "@chakra-ui/react";
import { dataClient } from "../../components/viewPDF/data/dataClient";
import { abreviarNome } from "../../functions/formtadores";
import { IDCAPARELATORIO } from "../../constants/idForHTML";

export default function Sumario({ data, filtroData }) {
  return (
    <Flex
      w={"100%"}
      id={IDCAPARELATORIO}
      h={"86vh"}
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
          w={"15%"}
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
        <Flex w={"35%"} height={"50vh"} p={6} justifyContent={"center"} mt={6}>
          <Text color={"#fff"} fontSize={"20px"} mb={4}>
            {`01   Visão Geral da Carteira`}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
