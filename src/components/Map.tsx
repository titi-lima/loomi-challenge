// components/Map.tsx
import React from "react";
import MapboxGL from "react-mapbox-gl";
import { FeatureCollection, Polygon } from "geojson";
import mapboxgl from "mapbox-gl";
import ReactDOMServer from "react-dom/server";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { fingerprint, warehouse } from "@/assets";
import Image from "next/image";

const Map = MapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_KEY!,
});

interface MapProps {
  geojson: FeatureCollection<Polygon>;
}

const popupContent = () => {
  return ReactDOMServer.renderToString(
    <div
      style={{
        width: "458px",
        height: "300px",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
      }}
    >
      <h2
        style={{
          color: "#2C3E50",
          padding: 2,
          fontSize: 18,
          alignSelf: "flex-start",
          marginBottom: 30,
          fontWeight: "bold",
        }}
      >
        Pedidos realizados no mês
      </h2>
      <div
        style={{
          display: "flex",
          flex: 1,
          width: "100%",
          marginTop: 10,
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            width: "194px",
            height: "94px",
            backgroundColor: "#F7F8FA",
            borderRadius: 3,
            padding: 16,
          }}
        >
          <div
            style={{
              gap: 10,
              display: "flex",
            }}
          >
            <Image src={warehouse.src} alt="warehouse" width={25} height={25} />
            <p
              style={{
                fontSize: 20,
                lineHeight: "40px",
                fontWeight: "bold",
              }}
            >
              5000
            </p>
          </div>
          <p
            style={{
              fontSize: 18,
            }}
          >
            Pedidos
          </p>
        </div>
        <div
          style={{
            width: "194px",
            height: "94px",
            backgroundColor: "#F7F8FA",
            borderRadius: 3,
            padding: 16,
          }}
        >
          <div
            style={{
              gap: 10,
              display: "flex",
            }}
          >
            <Image
              src={fingerprint.src}
              alt="fingerprint"
              width={25}
              height={25}
            />
            <p
              style={{
                fontSize: 20,
                lineHeight: "40px",
                fontWeight: "bold",
              }}
            >
              5000
            </p>
          </div>
          <p
            style={{
              fontSize: 18,
            }}
          >
            Novos clientes
          </p>
        </div>
      </div>
      <button
        style={{
          backgroundColor: "#5B4DA7",
          color: "#fff",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          fontSize: 18,
          width: "160px",
        }}
      >
        Ver mais
      </button>
    </div>
  );
};

const MapComponent = ({ geojson }: MapProps) => {
  const handleStyleLoad = (map: mapboxgl.Map) => {
    map.addSource("highlighted-areas", {
      type: "geojson",
      data: geojson,
    });

    map.addLayer({
      id: "highlighted-areas-layer",
      type: "fill",
      source: "highlighted-areas",
      layout: {},
      paint: {
        "fill-color": "#5b4da7",
        "fill-opacity": 0.56,
        "fill-outline-color": "#5B4DA7",
      },
    });

    map.on("click", "highlighted-areas-layer", (e) => {
      if (e.features?.length) {
        const [longitude, latitude] = e.lngLat.toArray();

        new mapboxgl.Popup({ maxWidth: "500px" })
          .setLngLat([longitude, latitude])
          .setHTML(popupContent())
          .addTo(map);
      }
    });
  };

  return (
    <Map
      style="mapbox://styles/mapbox/light-v11"
      containerStyle={{
        height: "calc(100vh - 150px)",
        width: "100vw",
      }}
      center={[-34.8813, -8.0539]}
      onStyleLoad={handleStyleLoad}
    />
  );
};

export default MapComponent;
