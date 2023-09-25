import "@/styles/globals.css";
import { ChakraProvider, Flex, extendTheme } from "@chakra-ui/react";
import { background } from "@/assets";
import type { AppProps } from "next/app";
import { Ubuntu } from "next/font/google";
const font = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const theme = extendTheme({
  colors: {
    primary: {
      "50": "#EFEEF7",
      "100": "#D2CEE8",
      "200": "#B5AFDA",
      "300": "#998FCB",
      "400": "#7C70BD",
      "500": "#5F50AF",
      "600": "#4C408C",
      "700": "#393069",
      "800": "#262046",
      "900": "#131023",
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex
        backgroundImage={background.src}
        backgroundRepeat={"repeat"}
        backgroundColor={"gray.100"}
        className={font.className}
        direction="column"
        minHeight="100vh"
      >
        <Component {...pageProps} />
      </Flex>
    </ChakraProvider>
  );
}
