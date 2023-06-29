import { Th } from "@chakra-ui/react";

export default function HeaderBuilder(headerList) {
  const fontTd = "12px";

  return (
    headerList &&
    headerList.map((item, index) => {
      const isFirstChild = index === 0;
      const isLastChild = index === headerList.length - 1;

      if (isLastChild) {
        return (
          <Th
            fontSize={fontTd}
            borderTopRightRadius={"lg"}
            bgColor={"blue.900"}
            borderBottomRightRadius={"lg"}
            color={"white"}
            key={index}
            textAlign={"center"}
          >
            {item}
          </Th>
        );
      }
      if (isFirstChild) {
        return (
          <Th
            fontSize={fontTd}
            borderTopLeftRadius={"lg"}
            borderBottomLeftRadius={"lg"}
            bgColor={"blue.900"}
            color={"white"}
            key={index}
            style={{ maxHeight: "20px" }}
            textAlign={"center"}
          >
            {item}
          </Th>
        );
      }

      return (
        <Th
          fontSize={fontTd}
          bgColor={"blue.900"}
          color={"white"}
          key={index}
          height={"35px"}
          textAlign={"center"}
        >
          {item}
        </Th>
      );
    })
  );
}
