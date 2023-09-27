import { Box, Flex, Heading } from "@chakra-ui/react";
import { type ChakraStylesConfig, Select } from "chakra-react-select";
import React from "react";

const chakraStyles: ChakraStylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "gray.100",
    border: "none",
    _hover: {
      cursor: "pointer",
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    border: "none",
  }),
  container: (provided) => ({
    ...provided,
    width: "176px",
  }),
};

type GraphContainerProps = {
  title: string;
  children: React.ReactNode;
  width?: React.CSSProperties["width"];
  setYear?: React.Dispatch<React.SetStateAction<string>>;
};

const GraphContainer = ({
  title,
  setYear,
  children,
  width = "100%",
}: GraphContainerProps) => {
  return (
    <Box width={width} borderRadius={12} bgColor={"white"}>
      <Flex justifyContent={"space-between"} p={5}>
        <Heading as="h6" size="sm">
          {title}
        </Heading>
        {setYear && (
          <Select
            onChange={(e) => setYear(e?.value || "")}
            options={[
              { value: "2023", label: "2023" },
              { value: "2022", label: "2022" },
              { value: "2021", label: "2021" },
            ]}
            placeholder="Ano"
            // @ts-ignore
            chakraStyles={chakraStyles}
          />
        )}
      </Flex>
      <Flex direction={"column"} alignItems={"center"}>
        {children}
      </Flex>
    </Box>
  );
};

export default GraphContainer;
