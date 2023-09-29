import { logo } from "@/assets";
import { useUser } from "@/contexts/UserContext";
import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const Navbar = () => {
  const User = useUser();
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
        <Flex gap={4}>
          <Text alignSelf={"center"}>{User.username}</Text>
          <Box w={10} mt={1} h={10} borderRadius={20} bgColor={"#5a4ca77d"}>
            <Text textAlign={"center"} lineHeight={"10"}>
              {User.profile_pic}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
