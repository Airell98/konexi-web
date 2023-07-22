import { Button, Box, Flex, Text, Center } from "@chakra-ui/react";

import { GoogleLogoIcon } from "@konexi/icons";

import { CardBlock } from "../CardBlock";

type TGoogleLoginCardProps = {
  handleRemoveCardBlock: () => void;
  handleOpenModal: () => void;
};

export const GoogleLoginCard = ({
  handleRemoveCardBlock,
  handleOpenModal,
}: TGoogleLoginCardProps) => {
  const LABELS = {
    title: "Connect Google Account",
    subTitle: "Please connect Google Account to use this block",
    button: "Connect",
  };
  return (
    <CardBlock handleRemoveCardBlock={handleRemoveCardBlock}>
      <Box px="14px" pb="14px" pt="10px">
        <Flex alignItems="center" gap="14px">
          <Center bg="grey" borderRadius="50%" p="6px">
            <GoogleLogoIcon fontSize={{ base: 25, md: 30 }} />
          </Center>
          <Flex flexDirection={"column"}>
            <Text
              noOfLines={2}
              fontWeight="bold"
              fontSize={{ base: "14px", md: "16px" }}
            >
              {LABELS.title}
            </Text>
            <Text
              fontSize="12px"
              noOfLines={1}
              color="#848484"
              fontWeight="bold"
            >
              {LABELS.subTitle}
            </Text>
          </Flex>
        </Flex>

        <Button
          size="sm"
          mt="14px"
          fontSize="12px"
          bg="mediumBlue"
          color="white"
          onClick={handleOpenModal}
        >
          {LABELS.button}
        </Button>
      </Box>
    </CardBlock>
  );
};
