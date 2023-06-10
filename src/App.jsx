import { useState } from "react";
import "./App.css";
import { Flex } from "@chakra-ui/react";
import Filtros from "./components/filtros";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TableComponent from "./components/viewPDF/components/TableComponent";
import { Button } from "@chakra-ui/react";

function App() {
  const handleExportPDF = () => {
    const input = document.getElementById("myScreen");

    html2canvas(input, { scale: 2 }) // Aumenta a escala para melhor qualidade
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape"); // Define a orientação como paisagem
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("myScreen.pdf");
      });
  };
  const arrayListObjects = [
    {
      id: 1,
      nome: "João",
      profissao: "engenheiro",
      endereço: "rua a",
      email: "a@teste.com.br",
      telefone: "4849849894",
      saldo: 50,
      valor: 40,
      cpfDestinatario: "02060411017",
      cnpjLocador: "27110404000165",
    },
    {
      id: 2,
      nome: "Maria",
      profissao: "cozinheira",
      endereço: "rua b",
      email: "b@teste.com.br",
      telefone: "8494984984",
      saldo: 50,
      valor: 40,
      cpfDestinatario: "02060411017",
      cnpjLocador: "27110404000165",
    },
    {
      id: 3,
      nome: "Pedro",
      profissao: "padeiro",
      endereço: "rua c",
      email: "c@teste.com.br",
      telefone: "84948984984",
      saldo: 50,
      valor: 40,
      cpfDestinatario: "02060411017",
      cnpjLocador: "27110404000165",
    },
    {
      id: 4,
      nome: "Joaquina",
      profissao: "secretária",
      endereço: "rua d",
      email: "d@teste.com.br",
      telefone: "8494894984",
      saldo: 50,
      valor: 40,
      cpfDestinatario: "02060411017",
      cnpjLocador: "27110404000165",
    },
    {
      id: 4,
      nome: "Samuel",
      profissao: "backend",
      endereço: "rua e",
      email: "sa@teste.com.br",
      telefone: "8494894984",
      saldo: 50,
      valor: 40,
      cpfDestinatario: "02060411017",
      cnpjLocador: "27110404000165",
    },
    {
      id: 4,
      nome: "Davi",
      profissao: "Frontend",
      endereço: "rua e",
      email: "davi@teste.com.br",
      telefone: "8494894984",
      saldo: 50,
      valor: 40,
      cpfDestinatario: "02060411017",
      cnpjLocador: "27110404000165",
    },
  ];

  const arrayCabecalho = [
    "Nome",
    // "Idade",
    "Profissão",
    "Endereço",
    "Telefone",
    "Email",
    "Saldo",
    "Valor",
    "CPF do Cliente",
    "CNPJ da Empresa",
  ];

  const optionList = [];

  const rowList = [
    "nome",
    "profissao",
    "endereço",
    "telefone",
    "email",
    "saldo",
    "valor",
    "cpfDestinatario",
    "cnpjLocador",
  ];

  return (
    <Flex w={"100vw"} h={"100vh"} flexDirection={"column"}>
      <Flex
        w={"100%"}
        h={"11vh"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Filtros />
      </Flex>
      <Flex
        w={"100%"}
        h={"81vh"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <div id="myScreen">
          <Flex w={"95vw"}>
            <TableComponent
              headerList={arrayCabecalho}
              data={arrayListObjects}
              rowList={rowList}
              loading={false}
              optionsList={optionList}
            />
          </Flex>
        </div>
        <Button w={"15%"} onClick={handleExportPDF}>
          Exportar para PDF
        </Button>
      </Flex>
      <Flex w={"100%"} h={"8vh"} bg={"blue"}>
        teste
      </Flex>
    </Flex>
  );
}

export default App;
