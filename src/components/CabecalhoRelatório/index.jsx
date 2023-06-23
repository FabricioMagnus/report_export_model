import { Text, Flex, Img } from "@chakra-ui/react";

export default function CabecalhoRelatorio({
  titulo,
  nomeCliente = "",
  cnpjCliente = "",
}) {
  return (
    <Flex
      w={"97%"}
      h={"8vh"}
      mx={"auto"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={5}
      borderBottom={"1px solid #20A6DF"}
      mt={5}
    >
      <Text color={"#123E6B"} fontSize={"30px"} fontWeight={"bold"}>
        {titulo}
      </Text>
      <Flex flexDir={"column"}>
        <Text color={"#123E6B"} fontSize={"12px"} fontWeight={"bold"}>
          {`Cliente: ${nomeCliente}`}
        </Text>
        <Text color={"#123E6B"} fontSize={"12px"} fontWeight={"bold"}>
          {`CNPJ: ${cnpjCliente}`}
        </Text>
      </Flex>
      <Img src={"/favicon.ico"} h={"100%"} />
    </Flex>
  );
}
