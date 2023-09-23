import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Sen } from "next/font/google";
const font = Sen({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <main className={font.className}>
        <Component {...pageProps} />
      </main>
    </ChakraProvider>
  );
}
