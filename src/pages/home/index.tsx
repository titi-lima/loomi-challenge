import { HomeInfos, Navbar, Sidebar } from "@/components";
import { api } from "@/services";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Heading, Flex, Box } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import React from "react";

export default function Home({
  dailyAverage,
  monthOrders,
  alerts,
  monthlyAverage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Navbar />
      <Flex>
        <Sidebar currentRoute="/home" />
        <Box m={10} width={"100%"}>
          <Heading as="h2" size="lg" color="#4E5D66" mb={5} textIndent={"40px"}>
            Início
          </Heading>
          <Flex flex={1} flexWrap={"wrap"} gap={6}>
            <HomeInfos
              title="Ticket médio últimas 24h"
              boxStat={dailyAverage.growth + " %"}
              subtitle="em relação a ontem"
              color="#109E8E"
              value={dailyAverage.value}
              valueHelper="R$"
            />
            <HomeInfos
              title="Ticket médio último mês"
              boxStat={monthlyAverage.growth + " %"}
              subtitle="em relação ao mês passado"
              color="#109E8E"
              value={monthlyAverage.value}
              valueHelper="R$"
            />
            {alerts.map((alert) => (
              <HomeInfos
                key={alert.type}
                title={alert.type}
                boxStat={
                  "há " +
                  Math.floor(
                    (new Date().getTime() - new Date(alert.since).getTime()) /
                      86400000
                  ) +
                  " dias"
                }
                subtitle={
                  alert.type === "Acabando o estoque"
                    ? "repor o quanto antes"
                    : ""
                }
                color="#D6628E"
                value={alert.value}
                valueHelper="produtos"
                icon={
                  alert.type === "Acabando o estoque" ? (
                    <ChevronRightIcon fontSize={27} />
                  ) : undefined
                }
              />
            ))}
            <HomeInfos
              title="Pedidos realizados no mês"
              boxStat={monthOrders.growth + " %"}
              subtitle="em relação ao mês passado"
              color="#109E8E"
              value={monthOrders.value}
              valueHelper="pedidos"
            />
            <HomeInfos
              title="Produtos vendidos no mês"
              boxStat={monthOrders.growth + " %"}
              subtitle="em relação ao mês passado"
              color="#109E8E"
              value={monthOrders.value}
              valueHelper="produtos"
            />
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

type ApiSimpleReturn = {
  growth: number;
  value: number;
};
type ApiArrayReturn = {
  type: string;
  value: number;
  since: string;
}[];

export const getServerSideProps = async () => {
  try {
    const dailyAveragePromise = api.get<ApiSimpleReturn>("/avg-ticket-day");
    const monthlyAveragePromise = api.get<ApiSimpleReturn>("/avg-ticket-month");
    const alertsPromise = api.get<ApiArrayReturn>("/alerts");
    const monthOrdersPromise = api.get<ApiSimpleReturn>("/orders-month");
    const [dailyAverage, monthlyAverage, alerts, monthOrders] =
      await Promise.all([
        dailyAveragePromise,
        monthlyAveragePromise,
        alertsPromise,
        monthOrdersPromise,
      ]);
    return {
      props: {
        dailyAverage: dailyAverage.data,
        monthlyAverage: monthlyAverage.data,
        alerts: alerts.data,
        monthOrders: monthOrders.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        dailyAverage: {
          growth: 0,
          value: 0,
        },
        monthlyAverage: {
          growth: 0,
          value: 0,
        },
        monthOrders: {
          growth: 0,
          value: 0,
        },
        alerts: [],
      },
    };
  }
};
