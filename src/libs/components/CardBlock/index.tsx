import { Box, Center, Flex, Text } from "@chakra-ui/react";

import { TrashIcon, SpreadSheetLogoIcon } from "@konexi/icons";

import type { FC } from "react";

type TCardblockProps = {
  children: React.ReactNode;
  handleRemoveCardBlock: () => void;
};

export const CardBlock: FC<TCardblockProps> = ({
  children,
  handleRemoveCardBlock,
}) => {
  const LABELS = {
    header: "Export to Google Sheets",
  };
  return (
    <Box
      width="100%"
      bg="white"
      border="1px solid"
      borderColor="darkGrey"
      p={{ base: "14px", md: "16px" }}
      borderRadius="8px"
    >
      <Flex
        flexDirection="column"
        justifyContent={"space-between"}
        alignItems="stretch"
        gap="16px"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" gap="10px">
            <Center
              borderRadius="8px"
              bg="paleGreen"
              w={{ base: "35px", md: "40px" }}
              h={{ base: "35px", md: "40px" }}
            >
              <SpreadSheetLogoIcon fontSize={20} />
            </Center>
            <Text fontWeight="bold" fontSize={{ base: "14px", md: "16px" }}>
              {LABELS.header}
            </Text>
          </Flex>
          <Center
            as="button"
            onClick={handleRemoveCardBlock}
            cursor="pointer"
            borderRadius="8px"
            bg="grey"
            w={{ base: "25px", md: "30px" }}
            h={{ base: "25px", md: "30px" }}
          >
            <TrashIcon fontSize={16} />
          </Center>
        </Flex>

        {children}
      </Flex>
    </Box>
  );
};
