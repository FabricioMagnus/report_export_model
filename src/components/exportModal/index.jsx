import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
} from "@chakra-ui/react";
import handleExportPDF from "../../functions/exportPDF";
import { ProgressoPorEtapas } from "../react-circle-progress";
import { HubConnectionBuilder } from "@microsoft/signalr";
import {
  IDCAPARELATORIO,
  IDGRAFICOSREVISAOCARTEIRA,
  IDREVISAOCARTEIRA,
} from "../../constants/idForHTML";

const ModalComponent = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const [etapaAtual, setEtapaAtual] = useState(7);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/etapa")
      .build();

    connection.on("ReceiveEtapaAtual", (novaEtapa) => {
      setEtapaAtual(novaEtapa);
    });

    connection.start();

    return () => {
      connection.stop();
    };
  }, []);

  const totalEtapas = 17;

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay bg="blackAlpha.800" blur={"2xl"} />
        <ModalContent>
          <ModalHeader>Exportação de Relatório</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              w={"400px"}
              h={"200px"}
              justifyContent={"center"}
              alignItems={"center"}
              // bgColor={"blue"}
            >
              {etapaAtual === 17 ? (
                <Text>Requisição Finalizada</Text>
              ) : (
                <ProgressoPorEtapas
                  etapaAtual={etapaAtual}
                  totalEtapas={totalEtapas}
                />
              )}
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent={"center"}>
            <Button
              type="button"
              colorScheme="blue"
              onClick={() => {
                handleExportPDF([IDCAPARELATORIO, IDREVISAOCARTEIRA]);
              }}
            >
              Exportar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalComponent;
