import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

type HomeInfosProps = {
  title: string;
  icon?: React.ReactElement | undefined;
  boxStat: string;
  subtitle?: string;
  color: "#D6628E" | "#109E8E";
  value: number;
  valueHelper: string;
};

const formatMoney = (value: number) => {
  return value
    .toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    })
    .slice(3); // removes "R$ "
};

const HomeInfos = ({
  title,
  icon,
  boxStat,
  subtitle,
  value,
  valueHelper,
  color,
}: HomeInfosProps) => {
  const isMoney = valueHelper === "R$";
  return (
    <Box
      p={4}
      borderRadius={15}
      aspectRatio={232 / 168}
      width={"fit-content"}
      bg="white"
      color={"#4E5D66"}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text fontWeight={"bold"}>{title}</Text>
        {icon}
      </Flex>
      <Box
        borderRadius={12}
        boxShadow={"0px 0px 20px #0000001A"}
        width={"fit-content"}
      >
        <Text fontSize={12} fontWeight={"bold"} color={color} m={3}>
          {boxStat}
        </Text>
      </Box>
      <Text color={color} fontSize={14}>
        {subtitle}
      </Text>
      <Flex m={subtitle ? 2 : "40px 8px 8px 8px"} alignItems={"center"}>
        {isMoney ? (
          <>
            <Text fontSize={16}>{valueHelper}</Text>
            <Text fontSize={20} ml={2} fontWeight={"bold"}>
              {formatMoney(value)}
            </Text>
          </>
        ) : (
          <>
            <Text fontSize={20} fontWeight={"bold"}>
              {value}
            </Text>
            <Text fontSize={16} ml={2}>
              {valueHelper}
            </Text>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default HomeInfos;
