import { useMemo, useState } from "react";
import {
  Text,
  VStack,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  Box,
  AccordionPanel,
  HStack,
  Button,
} from "@chakra-ui/react";
import { TabMenu } from "./TabMenu";
import { SpreadSheetLogoIcon } from "@konexi/icons";
import { CloseIcon } from "@chakra-ui/icons";

import { CardBlock } from "../CardBlock";

import type { TAccountFile } from "./entitites";

type TAccountListCardProps = {
  googleAccounts: {
    id: string;
    name: string;
    files: Array<TAccountFile>;
    lastExported?: Date;
  }[];

  handleRemoveSheet: (sheetIndex: number, accountId: string) => void;

  handleSelectTab: (accountId: string, sheetId: string, tabId: string) => void;

  handleExportFile: (accountId: string) => void;

  handleRemoveCardBlock: () => void;
};

type TAccountListCardState = {
  currentAccountId: string;
  files: Array<Array<TAccountFile>>;
};

export const AccountListCard = ({
  googleAccounts,
  handleRemoveSheet,
  handleExportFile,
  handleRemoveCardBlock,
  handleSelectTab,
}: TAccountListCardProps) => {
  const LABELS = {
    googleAccount: "Google Account",
    file: "File",
    export: "Export",
    lastExported: (value: string) => `Last export ${value} ago`,
  };

  const [state, setState] = useState<TAccountListCardState>({
    currentAccountId: googleAccounts[0].id,
    files: [],
  });

  const getSecondsDifference = (date1: Date, date2: Date) => {
    const diffInMilliseconds = date2.getTime() - date1.getTime();
    return Math.floor(diffInMilliseconds / 1000);
  };

  const getLastExportedText = (lastExportedDate: Date) => {
    const now = new Date();
    const secondsDifference = getSecondsDifference(lastExportedDate, now);

    if (secondsDifference < 60) {
      return LABELS.lastExported(
        `${secondsDifference === 0 ? 1 : Math.ceil(secondsDifference)}s`
      );
    } else if (secondsDifference < 3600) {
      const minutes = Math.floor(secondsDifference / 60);
      return LABELS.lastExported(`${minutes}m`);
    } else {
      const hours = Math.floor(secondsDifference / 3600);
      return LABELS.lastExported(`${hours}h`);
    }
  };

  const filteredAccounts = useMemo(() => {
    return googleAccounts.filter(
      (value) => value.id !== state.currentAccountId
    );
  }, [state.currentAccountId, googleAccounts]);

  const currentSelectedAccount = useMemo(() => {
    return googleAccounts.find((value) => value.id === state.currentAccountId);
  }, [state.currentAccountId, googleAccounts]);

  const lastExportedText = useMemo(() => {
    return currentSelectedAccount && currentSelectedAccount.lastExported
      ? getLastExportedText(currentSelectedAccount.lastExported)
      : "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedAccount?.lastExported]);

  return (
    <CardBlock handleRemoveCardBlock={handleRemoveCardBlock}>
      <VStack spacing="14px">
        <Box w="100%">
          <Text mb="12px" fontWeight="bold" fontSize="14px">
            {LABELS.googleAccount}
          </Text>
          <Accordion w="100%" allowToggle>
            <AccordionItem
              isFocusable={false}
              border="1px solid"
              borderColor="grey"
              borderRadius="8px"
            >
              <h2>
                <AccordionButton px="12px">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontWeight="bold"
                    fontSize={{ base: "12px", md: "14px" }}
                  >
                    {currentSelectedAccount!.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel px={0} pb={4}>
                <VStack
                  spacing="10px"
                  justifyContent={"center"}
                  alignItems="stretch"
                >
                  {filteredAccounts.map((value) => (
                    <Box
                      onClick={(_) =>
                        setState((prevData) => ({
                          ...prevData,
                          currentAccountId: value.id,
                        }))
                      }
                      py="4px"
                      pl="12px"
                      _hover={{
                        bg: "grey",
                      }}
                      cursor="pointer"
                      key={value.id}
                    >
                      <Text fontSize={{ base: "12px", md: "14px" }}>
                        {value.name}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        <Box w="100%">
          <Text
            mb="10px"
            fontWeight="bold"
            fontSize={{ base: "12px", md: "14px" }}
          >
            {LABELS.file}
          </Text>
          <VStack spacing="12px" justifyContent={"center"} alignItems="stretch">
            {currentSelectedAccount?.files.map((file, index) => (
              <HStack
                key={file.name}
                py="5px"
                px="12px"
                border="1px solid"
                borderColor="grey"
                borderRadius="8px"
                justifyContent="space-between"
              >
                <HStack>
                  <SpreadSheetLogoIcon fontSize={25} />
                  <Text
                    fontSize={{ base: "12px", md: "14px" }}
                    fontWeight="bold"
                  >
                    {file.name}
                  </Text>
                </HStack>
                <HStack>
                  <TabMenu
                    tabs={file.tabs}
                    handleSelectTab={(tabId) =>
                      handleSelectTab(state.currentAccountId, file.id, tabId)
                    }
                  />
                  <CloseIcon
                    onClick={() =>
                      handleRemoveSheet(index, state.currentAccountId)
                    }
                    cursor="pointer"
                    fontSize={12}
                  />
                </HStack>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Button
          onClick={() => {
            currentSelectedAccount!.files.length > 0 &&
              handleExportFile(state.currentAccountId);
          }}
          bg="mediumBlue"
          color="white"
          w="100%"
          opacity={currentSelectedAccount!.files.length > 0 ? 1 : 0.5}
          cursor={
            currentSelectedAccount!.files.length > 0 ? "pointer" : "not-allowed"
          }
          fontSize={{ base: "14px", md: "16px" }}
        >
          {LABELS.export}
        </Button>
        {currentSelectedAccount?.lastExported &&
          currentSelectedAccount!.files.length > 0 && (
            <Text
              color="hazel"
              mt="-10px"
              fontSize={{ base: "12px", md: "14px" }}
              fontWeight={600}
            >
              {lastExportedText}
            </Text>
          )}
      </VStack>
    </CardBlock>
  );
};
