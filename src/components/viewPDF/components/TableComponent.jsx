import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function TableComponent({
  headerList,
  data,
  rowList,
  loading,
  optionsList,
}) {
  const Rows = data.map((obj, index) => {
    function CNPJFormater(cnpj) {
      const CNPJ = cnpj;
      return CNPJ.replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }

    function PhoneFormater(number) {
      const phoneNumber = number;
      return phoneNumber
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }

    function CaptionFormater(text) {
      return text
        .toLowerCase()
        .replace(/(^\w{1})|(\s+\w{1})/g, (letra) => letra.toUpperCase());
    }

    function ToLocaleFormat(value) {
      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }

    function CPFFormater(cpf) {
      const CPF = cpf;
      return CPF.replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }

    const arrayToLocaleFormater = [
      "valor",
      "saldo",
      "value",
      "credito",
      "debito",
      "valorRestante",
    ];

    const arrayToCaptionFormat = [
      "nome",
      "sobrenome",
      "profissao",
      "razaoSocial",
      "nomeFantasia",
      "endereço",
    ];

    //saldoPeriodo

    const rowCells = rowList.map((key, index) => {
      if (key.toLowerCase().includes("telefone")) {
        return <Td>{PhoneFormater(obj[key])}</Td>;
      }
      if (arrayToLocaleFormater.includes(key.toLowerCase())) {
        return <Td>{ToLocaleFormat(obj[key])}</Td>;
      }
      if (arrayToCaptionFormat.includes(key.toLowerCase())) {
        return <Td>{CaptionFormater(obj[key])}</Td>;
      }
      if (
        key.toLowerCase().includes("cpf") ||
        key.toLowerCase().includes("cnpj")
      ) {
        if (obj[key].length === 11) {
          return <Td>{CPFFormater(obj[key])}</Td>;
        }
        return <Td>{CNPJFormater(obj[key])}</Td>;
      }
      return <Td>{obj[key]}</Td>;
    });
    const options = (
      <Td>
        <Menu>
          <MenuButton as={IconButton} icon={<Icon as={HamburgerIcon} />} />
          <MenuList>
            {optionsList.map((option) => (
              <MenuItem key={option.label} onClick={() => option.onClick(obj)}>
                {option.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Td>
    );
    return <Tr key={index}>{[...rowCells]}</Tr>;
  });

  const Header_Row =
    headerList &&
    headerList.map((item, index) => (
      <Th bgColor={"black"} color={"white"} key={index}>
        {item}
      </Th>
    ));

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  return (
    <Table variant={"striped"}>
      <Thead>
        <Tr key={1}>{Header_Row}</Tr>
      </Thead>
      <Tbody>{Rows}</Tbody>
    </Table>
  );
}
