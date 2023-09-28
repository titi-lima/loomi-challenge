import map from "./geo.json";
import ReactMapboxGl, {
  Layer,
  Feature,
  GeoJSONLayer,
  Source,
} from "react-mapbox-gl";
import MapboxGL from "mapbox-gl";
import React from "react";
import { Navbar, Sidebar } from "@/components";
import { Box } from "@chakra-ui/react";

const Mapbox = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY as string,
});

const mapStyle = {
  flex: 1,
  width: "100vw",
  height: "100vh",
};

const symbolLayout: MapboxGL.SymbolLayout = {
  "text-field": "{place}",
  "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
  "text-offset": [0, 0.6],
  "text-anchor": "top",
};
const symbolPaint: MapboxGL.SymbolPaint = {
  "text-color": "white",
};

const circleLayout: MapboxGL.CircleLayout = { visibility: "visible" };
const circlePaint: MapboxGL.CirclePaint = {
  "circle-color": "white",
};

export default function Map() {
  return (
    <Box>
      <Navbar />
      <Sidebar currentRoute="/map" />
      <Mapbox
        style="mapbox://styles/mapbox/streets-v11"
        center={map.features[0].geometry.coordinates[0][0] as [number, number]}
        containerStyle={mapStyle}
      >
        <GeoJSONLayer
          data={map}
          circleLayout={circleLayout}
          circlePaint={circlePaint}
          symbolLayout={symbolLayout}
          symbolPaint={symbolPaint}
        />
      </Mapbox>
    </Box>
  );
}
