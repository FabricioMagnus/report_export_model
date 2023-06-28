import { Flex, Img, Text } from "@chakra-ui/react";
import { dataClient } from "../../components/revisaoCarteira/data/dataClient";
import {
  CaptionFormater,
  abreviarNome,
  obterMesAno,
} from "../../functions/formtadores";
import { IDCAPARELATORIO } from "../../constants/idForHTML";

export default function Capa({ data, filtroData }) {
  return (
    <Flex
      w={"100%"}
      id={IDCAPARELATORIO}
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
      <Flex
        w={"30%"}
        height={"35vh"}
        // bgColor={"red"}
        mt={"10%"}
        mr={20}
        p={6}
        borderLeft={"2px solid #20A6DF"}
        justifyContent={"center"}
        flexDir={"column"}
      >
        <Text color={"#fff"} fontSize={"30px"} mb={2} fontWeight={"black"}>
          {abreviarNome(data.nome)}
        </Text>
        <Text color={"#fff"} fontSize={"30px"} mb={4}>
          {CaptionFormater(data.nome)}
        </Text>
        <Text color={"#20A6DF"} fontSize={"24px"} fontWeight={"black"}>
          {obterMesAno(filtroData)}
        </Text>
      </Flex>
    </Flex>
  );
}
