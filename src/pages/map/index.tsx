import React from "react";
import { Map, Navbar, Sidebar } from "@/components";
import geojsonData from "./geo.json";
import { Box, Flex, Heading } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Box bgColor={"#F2F2F2"}>
      <Navbar />
      <Sidebar currentRoute="/map" />
      <Heading ml={20} mt={10} as="h3" size="md" color={"#4F4F4F"} mb={5}>
        Regiões de entrega
      </Heading>
      {/* couldn't get ts to understand that this geoJsonData was "as const" and the types were being inferred incorrectly */}
      <Flex flex={1} marginLeft={20}>
        <Map geojson={geojsonData as any} />
      </Flex>
    </Box>
  );
};

export default HomePage;
