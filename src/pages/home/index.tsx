import { GraphContainer, HomeInfos, Navbar, Sidebar } from "@/components";
import { api } from "@/services";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Heading, Flex, Box, Text, Divider } from "@chakra-ui/react";
import { InferGetServerSidePropsType } from "next";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
} from "recharts";
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

const SECOND_TRANSLATIONS = {
  value: "Real",
  expectation: "Expectativa",
};

const THIRD_TRANSLATIONS = {
  value: "Realizados",
  canceled: "Cancelados",
};

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

  const profitData = React.useMemo(() => {
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push({
        month: i,
        value: profitPerMonth?.[i]?.value,
        expectation: profitExpectationPerMonth[i]?.value,
      });
    }
    return data;
  }, [profitPerMonth, profitExpectationPerMonth]);

  const ordersData = React.useMemo(() => {
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push({
        month: i,
        value: ordersPerMonth?.[i]?.value,
        canceled: canceledOrdersPerMonth[i]?.value,
      });
    }
    return data;
  }, [ordersPerMonth, canceledOrdersPerMonth]);

  React.useEffect(() => {
    console.log("a filter could be applied here");
  }, [firstYear, secondYear, thirdYear]);
  return (
    <>
      <Navbar />
      <Flex>
        <Sidebar currentRoute="/home" />
        <Box ml={14} mt={10} mb={10} width={"100%"}>
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
            my={10}
            textIndent={"40px"}
            fontWeight={"bold"}
          >
            Dashboard de vendas
          </Heading>
          <Box
            overflowX={"auto"}
            pr={100}
            css={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                width: 0,
                height: 0,
              },
            }}
          >
            <Flex flexWrap={"nowrap"} width={"fit-content"} gap={6}>
              <GraphContainer
                title="Pedidos por mês"
                width={608}
                setYear={setFirstYear}
              >
                <ResponsiveContainer width={"90%"} height={300}>
                  <BarChart data={sellsPerMonth} barSize={20}>
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
              <GraphContainer
                title="Expectativa de lucro x lucro real"
                width={608}
                setYear={setSecondYear}
              >
                <ResponsiveContainer width={"90%"} height={300}>
                  <ComposedChart data={profitData}>
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => MONTHS[+value]}
                      type="category"
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: number) =>
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(value)
                      }
                      content={(props) => {
                        return (
                          <Box
                            bg={"#fff"}
                            boxShadow={"0px 0px 10px #00000026"}
                            borderRadius={5}
                            p={2}
                          >
                            <Flex justifyContent={"space-between"} my={1}>
                              <Text
                                fontSize={14}
                                fontWeight={"light"}
                                fontStyle={"italic"}
                              >
                                Mês atual:{" "}
                              </Text>
                              <Text fontWeight={"bold"} fontSize={14}>
                                {MONTHS[props.label]}
                              </Text>
                            </Flex>
                            <Text fontSize={12}>
                              Real:{" "}
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(props?.payload?.[0]?.payload?.value)}
                              <Divider my={1} />
                              Expectativa:{" "}
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(
                                props?.payload?.[0]?.payload?.expectation
                              )}
                            </Text>
                          </Box>
                        );
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      formatter={(value: keyof typeof SECOND_TRANSLATIONS) => (
                        <Text as="span" color={"#000"}>
                          {SECOND_TRANSLATIONS[value]}
                        </Text>
                      )}
                    />
                    <Bar
                      dataKey="value"
                      barSize={20}
                      fill="#9DD6D3"
                      shape={(props) => {
                        return (
                          <rect
                            rx={3}
                            width={props.width}
                            height={props.height}
                            x={props.x}
                            y={props.y}
                            fill={"#9DD6D3"}
                            style={{
                              filter: "drop-shadow(0px 0px 10px #00000026",
                            }}
                          />
                        );
                      }}
                    />

                    <Line
                      type="linear"
                      dataKey="expectation"
                      fill="#fff"
                      stroke="#393C56"
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </GraphContainer>
              <GraphContainer
                title="Pedidos realizados x pedidos cancelados"
                width={608}
                setYear={setThirdYear}
              >
                <ResponsiveContainer width={"90%"} height={300}>
                  <ComposedChart data={ordersData}>
                    <XAxis
                      dataKey="month"
                      tickFormatter={(value) => MONTHS[+value]}
                      type="category"
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      formatter={(value: number) =>
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(value)
                      }
                      content={(props) => {
                        return (
                          <Box
                            bg={"#fff"}
                            boxShadow={"0px 0px 10px #00000026"}
                            borderRadius={5}
                            p={2}
                          >
                            <Flex justifyContent={"space-between"} my={1}>
                              <Text
                                fontSize={14}
                                fontWeight={"light"}
                                fontStyle={"italic"}
                              >
                                Mês atual:{" "}
                              </Text>
                              <Text fontWeight={"bold"} fontSize={14}>
                                {MONTHS[props.label]}
                              </Text>
                            </Flex>
                            <Text fontSize={12}>
                              Realizados:{" "}
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(props?.payload?.[0]?.payload?.value)}
                              <Divider my={1} />
                              Cancelados:{" "}
                              {new Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(props?.payload?.[0]?.payload?.canceled)}
                            </Text>
                          </Box>
                        );
                      }}
                    />
                    <Legend
                      verticalAlign="top"
                      formatter={(value: keyof typeof THIRD_TRANSLATIONS) => (
                        <Text as="span" color={"#000"}>
                          {THIRD_TRANSLATIONS[value]}
                        </Text>
                      )}
                    />
                    <Bar
                      dataKey="value"
                      barSize={20}
                      fill="#109E8E"
                      shape={(props) => {
                        return (
                          <rect
                            rx={3}
                            width={props.width}
                            height={props.height}
                            x={props.x}
                            y={props.y}
                            fill={props.fill}
                            style={{
                              filter: "drop-shadow(0px 0px 10px #00000026",
                            }}
                          />
                        );
                      }}
                    />

                    <Bar
                      dataKey="canceled"
                      barSize={20}
                      fill="#F18F7F"
                      shape={(props) => {
                        return (
                          <rect
                            rx={3}
                            width={props.width}
                            height={props.height}
                            x={props.x}
                            y={props.y}
                            fill={props.fill}
                            style={{
                              filter: "drop-shadow(0px 0px 10px #00000026",
                            }}
                          />
                        );
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </GraphContainer>
            </Flex>
          </Box>
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
