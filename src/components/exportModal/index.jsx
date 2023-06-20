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
import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import {
  IDCAPARELATORIO,
  IDGRAFICOSREVISAOCARTEIRA,
  IDREVISAOCARTEIRA,
} from "../../constants/idForHTML";
import { LinkWebsocket } from "../../constants/urls";

const ModalComponent = ({ isOpen, setIsOpen, setIsOk }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const [etapaAtual, setEtapaAtual] = useState(4);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(LinkWebsocket, {
        transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling,
      })
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceiveStatusUpdate", (novaEtapa) => {
      setEtapaAtual(novaEtapa);
    });

    connection.start();

    return () => {
      connection.stop();
    };
  }, []);

  const totalEtapas = 4;

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
              {etapaAtual === totalEtapas ? (
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
            {etapaAtual === totalEtapas ? (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setIsOk(true);
                  handleClose();
                  setIsOpen(false);
                  setEtapaAtual(0);
                }}
              >
                Fechar
              </Button>
            ) : (
              <></>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ModalComponent;
