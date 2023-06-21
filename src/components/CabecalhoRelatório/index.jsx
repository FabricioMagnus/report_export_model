import { Text, Flex } from "@chakra-ui/react";

export default function CabecalhoRelatorio({ titulo }) {
  return (
    <Flex
      w={"97%"}
      h={"8vh"}
      mx={"auto"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      p={5}
      borderBottom={"1px solid #123E6B"}
    >
      <Text color={"#123E6B"} fontSize={"30px"} fontWeight={"bold"}>
        {titulo}
      </Text>
    </Flex>
  );
}
