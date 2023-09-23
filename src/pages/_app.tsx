import "@/styles/globals.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Sen } from "next/font/google";
const font = Sen({ subsets: ["latin"] });

const theme = extendTheme({
  colors: {
    primary: "#5B4DA7",
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
