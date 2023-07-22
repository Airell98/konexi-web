import { useState, useRef, useEffect } from "react";

import { Button, Text, useToast } from "@chakra-ui/react";

import { DatabaseIcon } from "@konexi/icons";

import { CardBlock } from "../CardBlock";

type TImportCardProps = {
  handleRemoveCardBlock: () => void;
};

export const ImportCard = ({ handleRemoveCardBlock }: TImportCardProps) => {
  const LABELS = {
    title: "Connect Flow Node to Import to Google Sheets",
  };

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLoadingProcess = () => {
    setIsLoading(true);

    timeoutRef.current = setTimeout(() => {
      toast({
        title: "Success",
        description: "Successfully imported",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <CardBlock handleRemoveCardBlock={handleRemoveCardBlock}>
      <Button
        onClick={isLoading ? undefined : handleLoadingProcess}
        loadingText="Uploading"
        isLoading={isLoading}
        leftIcon={
          <DatabaseIcon fontSize={20} display={{ base: "none", md: "block" }} />
        }
        w="100%"
        borderRadius="30px"
        bg="grey"
        fontSize={{ base: "12px", md: "14px" }}
        whiteSpace="normal"
      >
        <Text noOfLines={1}> {LABELS.title}</Text>
      </Button>
    </CardBlock>
  );
};
