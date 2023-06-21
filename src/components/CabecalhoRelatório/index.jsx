import { Text, Flex } from "@chakra-ui/react";

export default function CabecalhoRelatorio({ titulo }) {
  return (
    <Flex
      w={"100%"}
      h={"8vh"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      p={5}
    >
      <Text color={"#123E6B"} fontSize={"30px"} fontWeight={"bold"}>
        {titulo}
      </Text>
    </Flex>
  );
}
