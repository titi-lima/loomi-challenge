import { GraphContainer, HomeInfos, Navbar, Sidebar } from "@/components";
import { api } from "@/services";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Heading, Flex, Box } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts";
import React from "react";

const MONTHS = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export default function Home({
  dailyAverage,
  monthOrders,
  alerts,
  monthlyAverage,
  canceledOrdersPerMonth,
  ordersPerMonth,
  profitExpectationPerMonth,
  profitPerMonth,
  sellsPerMonth,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [firstYear, setFirstYear] = React.useState("");
  const [secondYear, setSecondYear] = React.useState("");
  const [thirdYear, setThirdYear] = React.useState("");

  React.useEffect(() => {
    console.log("a filter could be applied here");
  }, [firstYear, secondYear, thirdYear]);
  return (
    <>
      <Navbar />
      <Flex>
        <Sidebar currentRoute="/home" />
        <Box m={10} width={"100%"}>
          <Heading as="h2" size="lg" color="#4E5D66" mb={5} textIndent={"40px"}>
            Início
          </Heading>
          <Flex flex={1} flexWrap={"wrap"} gap={5}>
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

          <Heading
            as="h2"
            size="lg"
            color={"#5A4CA7"}
            my={5}
            textIndent={"40px"}
            fontWeight={"bold"}
          >
            Dashboard de vendas
          </Heading>
          <Flex
            flex={1}
            flexWrap={"nowrap"}
            overflowX={"scroll"}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            gap={6}
            mt={6}
          >
            <GraphContainer
              title="Pedidos por mês"
              width={608}
              setYear={setFirstYear}
            >
              <ResponsiveContainer width={"90%"} height={300}>
                <BarChart data={ordersPerMonth} barSize={20}>
                  <XAxis
                    dataKey="month"
                    tickFormatter={(value) => MONTHS[+value]}
                  />
                  <Bar
                    dataKey="value"
                    shape={(props) => {
                      return (
                        <rect
                          rx={3}
                          width={props.width}
                          height={props.height}
                          x={props.x}
                          y={props.y}
                          fill={"#393C56"}
                        />
                      );
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </GraphContainer>
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
type ApiGraphReturn = {
  month: string;
  value: number;
}[];

export const getServerSideProps = async () => {
  try {
    const dailyAveragePromise = api.get<ApiSimpleReturn>("/avg-ticket-day");
    const monthlyAveragePromise = api.get<ApiSimpleReturn>("/avg-ticket-month");
    const alertsPromise = api.get<ApiArrayReturn>("/alerts");
    const monthOrdersPromise = api.get<ApiSimpleReturn>("/orders-month");

    const sellsPerMonthPromise = api.get<ApiGraphReturn>("/sells-per-month");
    const profitExpectationPerMonthPromise = api.get<ApiGraphReturn>(
      "/profit-expectation-per-month"
    );
    const profitPerMonthPromise = api.get<ApiGraphReturn>("/profit-per-month");
    const ordersPerMonthPromise = api.get<ApiGraphReturn>("/orders-per-month");
    const canceledOrdersPerMonthPromise = api.get<ApiGraphReturn>(
      "/canceled-orders-per-month"
    );

    const [
      dailyAverage,
      monthlyAverage,
      alerts,
      monthOrders,
      sellsPerMonth,
      profitExpectationPerMonth,
      profitPerMonth,
      ordersPerMonth,
      canceledOrdersPerMonth,
    ] = await Promise.all([
      dailyAveragePromise,
      monthlyAveragePromise,
      alertsPromise,
      monthOrdersPromise,
      sellsPerMonthPromise,
      profitExpectationPerMonthPromise,
      profitPerMonthPromise,
      ordersPerMonthPromise,
      canceledOrdersPerMonthPromise,
    ]);
    return {
      props: {
        dailyAverage: dailyAverage.data,
        monthlyAverage: monthlyAverage.data,
        alerts: alerts.data,
        monthOrders: monthOrders.data,
        sellsPerMonth: sellsPerMonth.data,
        profitExpectationPerMonth: profitExpectationPerMonth.data,
        profitPerMonth: profitPerMonth.data,
        ordersPerMonth: ordersPerMonth.data,
        canceledOrdersPerMonth: canceledOrdersPerMonth.data,
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
        sellsPerMonth: [],
        profitExpectationPerMonth: [],
        profitPerMonth: [],
        ordersPerMonth: [],
        canceledOrdersPerMonth: [],
      },
    };
  }
};
