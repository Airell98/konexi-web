import { Theme, extendTheme } from "@chakra-ui/react";

export const colors = {
  mediumBlue: "#2383F3",
  lightGreen: "#04AB46",
  paleGreen: "#E7F6F1",
  lightGrey: "#F5F5F5",
  grey: "#F0F0F0",
  darkGrey: "#DBDBDB",
  black: "#1F1F1F",
  hazel: "#848484",
};

const theme = extendTheme({
  colors,
  breakpoints: {
    sm: "320px",
    md: "768px", //less than 768px is mobile
    lg: "960px",
    xl: "1200px", //less than 1200px is tablet
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
}) as Theme;

export { theme };
