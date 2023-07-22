import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@konexi/theme";
import type { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};
