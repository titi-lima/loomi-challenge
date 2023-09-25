import { menu, home, product, truck } from "@/assets";
import { Box, Divider, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type SidebarProps = {
  currentRoute: string;
};

const Sidebar = ({ currentRoute }: SidebarProps) => {
  return (
    <Box m={4} width={6}>
      <Flex
        bgColor={"white"}
        height={"fit-content"}
        direction={"column"}
        gap={2}
        p={2}
        position={"fixed"}
        borderRadius={"8px"}
      >
        <Image src={menu.src} alt="Menu lateral" width={36} height={36} />
        <Divider />
        <Link
          href="/home"
          style={
            currentRoute === "/home"
              ? {
                  backgroundColor: "#5A4CA7",
                  borderRadius: "6px",
                }
              : {}
          }
        >
          <Image
            src={home.src}
            alt="Home"
            width={36}
            height={36}
            style={
              currentRoute === "/home"
                ? {
                    filter: "brightness(0) invert(1)",
                  }
                : {}
            }
          />
        </Link>
        <Link
          href="/add-product"
          style={
            currentRoute === "/add-product"
              ? {
                  backgroundColor: "#5A4CA7",
                  borderRadius: "6px",
                }
              : {}
          }
        >
          <Image
            src={product.src}
            alt="Produtos"
            width={36}
            height={36}
            style={
              currentRoute === "/add-product"
                ? {
                    filter: "brightness(0) invert(1)",
                  }
                : {}
            }
          />
        </Link>
        <Link
          href="/map"
          style={
            currentRoute === "/map"
              ? {
                  backgroundColor: "#5A4CA7",
                  borderRadius: "6px",
                }
              : {}
          }
        >
          <Image
            src={truck.src}
            alt="Entregas"
            width={36}
            height={36}
            style={
              currentRoute === "/map"
                ? {
                    filter: "brightness(0) invert(1)",
                  }
                : {}
            }
          />
        </Link>
      </Flex>
    </Box>
  );
};

export default Sidebar;
