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
import { ProgressoPorEtapas } from "../react-circle-progress";
import {
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { LinkWebsocket } from "../../constants/urls";

const ModalComponent = ({ isOpen, setIsOpen, setIsOk, idRequisicao }) => {
  const handleClose = () => {
    // setIsOpen(false);
  };

  // console.log("idRequisicao recebido no modal", idRequisicao);

  const [etapaAtual, setEtapaAtual] = useState(0);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(LinkWebsocket, {
        transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling,
      })
      .configureLogging(LogLevel.Information)
      .build();

    if (idRequisicao) {
      connection.start().then(() => {
        connection.invoke("JoinExportGroup", idRequisicao);
      });
    }
    connection.on("ReceiveStatusUpdate", (id, status) => {
      // console.log("id da chamada websocket", id);
      // console.log("status da chamada websocket", status);
      setEtapaAtual(status);
    });

    return () => {
      connection.stop();
    };
  }, [idRequisicao]);

  useEffect(() => {
    setEtapaAtual(0);
  }, []);

  // useEffect(() => {
  //   if (isOpen === true && etapaAtual < totalEtapas) {
  //     setTimeout(() => {
  //       setEtapaAtual(etapaAtual + 1);
  //     }, 1000);
  //   }
  // }, [etapaAtual, isOpen]);

  const totalEtapas = 5;

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay bg="blackAlpha.800" blur={"2xl"} />
        <ModalContent>
          <ModalHeader>Exportação de Relatório</ModalHeader>
          {/* <ModalCloseButton /> */}
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
            {etapaAtual === 100 && (
              <Text color={"red.500"} fontWeight={"bold"}>
                Erro na requisição
              </Text>
            )}

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
