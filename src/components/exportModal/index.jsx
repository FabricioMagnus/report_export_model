import React, { useState } from "react";
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
} from "@chakra-ui/react";
import handleExportPDF from "../../functions/exportPDF";
import { ProgressoPorEtapas } from "../react-circle-progress";

const ModalComponent = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  const etapaAtual = 12;
  const totalEtapas = 17;

  return (
    <div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Exportação de Relatório</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Conteúdo do modal...</p>
            {etapaAtual === 17 ? (
              <Text>Requisição Finalizada</Text>
            ) : (
              <ProgressoPorEtapas
                etapaAtual={etapaAtual}
                totalEtapas={totalEtapas}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              type="button"
              colorScheme="blue"
              onClick={() => {
                handleExportPDF("myScreen");
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
