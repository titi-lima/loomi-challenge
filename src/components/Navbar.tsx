import { logo } from "@/assets";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <Box gap={4} bgColor={"white"} width={"100%"} height={"65px"}>
      <Flex
        py={2}
        px={5}
        gap={4}
        justifyContent={"space-between"}
        bgColor={"white"}
        boxShadow={"0px 3px 6px #00000014"}
        width={"100%"}
        position={"fixed"}
        zIndex={1}
      >
        <Image src={logo.src} alt="Logo" width={60} height={60} />
        <Flex>
          <Text alignSelf={"center"}>Eduardo</Text>
          <Image src={logo.src} alt="Foto do usuário" width={60} height={60} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;