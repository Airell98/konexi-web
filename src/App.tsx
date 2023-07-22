import { VStack, Box, Text, useDisclosure } from "@chakra-ui/react";

import {
  GoogleLoginCard,
  ImportCard,
  AccountListCard,
  GoogleLoginModal,
} from "@konexi/components";

import { TMockDataId, useDataManagement } from "./hooks";

function App() {
  const LABEL = {
    title: " Output/Export to Google Sheets",
  };

  const {
    data,
    handleAddNewGoogleAccount,
    handleDeleteBlockCard,
    handleRemoveSheetFromSingleAccount,
    handleSelectTab,
    handleExportFile,
  } = useDataManagement();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack
      bg="lightGrey"
      justifyContent="stretch"
      alignItems="center"
      minHeight="100vh"
      px="20px"
    >
      <GoogleLoginModal
        isOpen={isOpen}
        onClose={onClose}
        handleAddNewGoogleAccount={handleAddNewGoogleAccount}
      />
      <Box maxW="700px" pb="100px">
        <Text fontSize={{ base: "35px", md: "40px" }} fontWeight="bold">
          {LABEL.title}
        </Text>

        <VStack mt="14px" px={{ base: "10px", md: "50px" }} spacing="18px">
          {(Object.keys(data) as Array<TMockDataId>).map((key) => {
            const cardBlock = data[key];
            return (
              <Box key={key} w="100%">
                {cardBlock.type === "account-list" && (
                  <AccountListCard
                    googleAccounts={cardBlock.googleAccounts}
                    handleRemoveSheet={handleRemoveSheetFromSingleAccount}
                    handleRemoveCardBlock={() => handleDeleteBlockCard(key)}
                    handleSelectTab={handleSelectTab}
                    handleExportFile={handleExportFile}
                  />
                )}
                {cardBlock.type === "google-signin" && (
                  <GoogleLoginCard
                    handleOpenModal={onOpen}
                    handleRemoveCardBlock={() => handleDeleteBlockCard(key)}
                  />
                )}
                {cardBlock.type === "import" && (
                  <ImportCard
                    handleRemoveCardBlock={() => handleDeleteBlockCard(key)}
                  />
                )}
              </Box>
            );
          })}
        </VStack>
      </Box>
    </VStack>
  );
}

export default App;
