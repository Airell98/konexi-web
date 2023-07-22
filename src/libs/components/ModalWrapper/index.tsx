import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

import type {
  ModalContentProps,
  ModalProps as IChakraModal,
} from "@chakra-ui/react";

export interface IModalWrapper extends IChakraModal {
  modalContentProps?: ModalContentProps;
  withOverlay?: boolean;
}

export const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  modalContentProps = {},
  withOverlay = true,
}: IModalWrapper) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      {withOverlay && <ModalOverlay />}
      <ModalContent w="468px" mx="auto" {...modalContentProps}>
        {children}
      </ModalContent>
    </ChakraModal>
  );
};
