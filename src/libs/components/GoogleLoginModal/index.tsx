import { useState } from "react";

import { ModalWrapper } from "../ModalWrapper";

import { GoogleLogoIcon } from "../../icons";
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import type { ChangeEvent } from "react";

type TGoogleLoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleAddNewGoogleAccount: (username: string) => void;
};

export const GoogleLoginModal = ({
  onClose,
  isOpen,
  handleAddNewGoogleAccount,
}: TGoogleLoginModalProps) => {
  const LABEL = {
    errorMessage: "Username is required.",
    formLabel: "Username",
    submit: "Submit",
    placeholder: "Enter your username",
  };

  const [name, setName] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmitForm = () => {
    onClose();
    setName("");
    handleAddNewGoogleAccount(name);
  };

  const isError = name === "";

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <ModalCloseButton color="black" fontWeight="700" />
      <VStack
        px="20px"
        pb="20px"
        pt="50px"
        alignItems="stretch"
        justifyContent="center"
      >
        <GoogleLogoIcon fontSize={{ base: 90, md: 100 }} alignSelf="center" />
        <FormControl onSubmit={handleSubmitForm} isInvalid={isError}>
          <FormLabel fontWeight="bold" fontSize={{ base: "14px", md: "16px" }}>
            {LABEL.formLabel}
          </FormLabel>
          <Input
            size={{ base: "sm", md: "md" }}
            placeholder={LABEL.placeholder}
            type="text"
            value={name}
            onChange={handleInputChange}
          />
          {isError && (
            <FormErrorMessage fontSize={{ base: "12px", md: "14px" }}>
              {LABEL.errorMessage}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          cursor={isError ? "not-allowed" : "pointer"}
          opacity={isError ? 0.5 : 1}
          mt="12px"
          bg="mediumBlue"
          color="white"
          onClick={isError ? undefined : handleSubmitForm}
          fontSize={{ base: "14px", md: "16px" }}
        >
          {LABEL.submit}
        </Button>
      </VStack>
    </ModalWrapper>
  );
};
