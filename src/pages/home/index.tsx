import { GraphContainer, HomeInfos, Navbar, Sidebar } from "@/components";
import { api } from "@/services";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Heading,
  Flex,
  Box,
  Text,
  Divider,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
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
  initialProducts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [firstYear, setFirstYear] = React.useState("");
  const [secondYear, setSecondYear] = React.useState("");
  const [thirdYear, setThirdYear] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [products, setProducts] = React.useState(initialProducts);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    api
      .get<ApiProductReturn>(`/products?page=${page}&limit=10&search=${search}`)
      .then((response) => {
        setProducts(
          response.data.map((product) => ({
            name: product.name.split(" ")[2],
            color: product.color,
            status: product.status,
            specification: product.name.split(" ").slice(0, 2),
            id: product.id,
          }))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, search]);

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
          <Box width={"92%"} bgColor={"#fff"} borderRadius={20} mt={14}>
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              pt={7}
              mx={10}
            >
              <Heading
                as="h4"
                fontWeight={"semibold"}
                size="lg"
                color={"#333333"}
              >
                Listagem de Produtos
              </Heading>
              <InputGroup width={"fit-content"}>
                <Input
                  placeholder="Pesquisar"
                  bg={"#F5F5F5"}
                  width={300}
                  height={50}
                  fontSize={20}
                  px={5}
                  border={"none"}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <InputRightAddon
                  height={50}
                  width={50}
                  bg={"#F5F5F5"}
                  border={"none"}
                  _hover={{ cursor: "pointer" }}
                >
                  <SearchIcon color={"#333333"} fontSize={20} />
                </InputRightAddon>
              </InputGroup>
            </Flex>
            <Flex flex={1} flexDirection={"column"}>
              <Flex flex={1}>
                <Flex
                  direction={"column"}
                  bgColor={"#4E5D66"}
                  borderRadius={9}
                  flex={3}
                  padding={3}
                  fontWeight={"bold"}
                  textIndent={"32px"}
                  m={10}
                  color={"white"}
                >
                  <Text>PRODUTO</Text>
                </Flex>
                <Flex
                  bgColor={"#4E5D66"}
                  borderRadius={9}
                  flex={7}
                  padding={3}
                  fontWeight={"bold"}
                  textIndent={"32px"}
                  m={10}
                  ml={0}
                  color={"white"}
                  alignItems={"center"}
                >
                  <Flex direction={"column"} flex={2.8}>
                    <Text>CORES</Text>
                  </Flex>
                  <Divider my={2} orientation="vertical" />
                  <Flex direction={"column"} flex={2.8}>
                    <Text>ESPECIFICAÇÕES</Text>
                  </Flex>
                  <Divider my={2} orientation="vertical" />
                  <Flex direction={"column"} flex={1.4}>
                    <Text>STATUS</Text>
                  </Flex>
                </Flex>
              </Flex>

              {products?.map((product) => (
                <Flex flex={1} gap={5} key={product.id}>
                  <Flex
                    direction={"column"}
                    flex={3}
                    px={3}
                    textIndent={"32px"}
                    fontSize={20}
                    color={"#333333"}
                  >
                    <Text>{product.name}</Text>
                    <Divider m={4} orientation="horizontal" />
                  </Flex>
                  <Flex direction={"column"} flex={7}>
                    <Flex
                      flex={7}
                      px={3}
                      fontSize={20}
                      color={"#333333"}
                      alignItems={"center"}
                      ml={5}
                      mr={5}
                    >
                      <Flex textIndent={"32px"} flex={2.8}>
                        <Text fontSize={20}>{product.color}</Text>
                      </Flex>
                      <Divider my={2} orientation="vertical" />
                      <Flex flex={2.6} flexWrap={"wrap"}>
                        {product.specification.map((spec) => (
                          <Box
                            key={spec + product.name}
                            bgColor={"#4e5d6620"}
                            borderRadius={18}
                            py={1}
                            px={4}
                            width={"fit-content"}
                            ml={4}
                          >
                            <Text
                              opacity={1}
                              fontSize={12}
                              fontWeight={"bold"}
                              color={"#333333"}
                            >
                              {spec}
                            </Text>
                          </Box>
                        ))}
                      </Flex>
                      <Divider my={2} orientation="vertical" />
                      <Flex flex={1.45}>
                        <Text textIndent={"32px"}>{product.status}</Text>
                      </Flex>
                    </Flex>
                    <Divider m={4} w={"95%"} orientation="horizontal" />
                  </Flex>
                </Flex>
              ))}
            </Flex>
            <Flex justifyContent={"flex-end"} p={8} gap={5}>
              <ChevronLeftIcon
                fontSize={20}
                color={"#333333"}
                _hover={{ cursor: "pointer" }}
                onClick={() => setPage(page - 1)}
              />
              <ChevronRightIcon
                fontSize={20}
                color={"#333333"}
                _hover={{ cursor: "pointer" }}
                onClick={() => setPage(page + 1)}
              />
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
type ApiProductReturn = {
  createdAt: string;
  name: string;
  color: string;
  status: string;
  description: string;
  id: string;
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

    const productsPromise = api.get<ApiProductReturn>(
      "/products?page=1&limit=10"
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
      products,
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
      productsPromise,
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
        initialProducts: products.data.map((product) => ({
          name: product.name.split(" ")[2],
          color: product.color,
          status: product.status,
          specification: product.name.split(" ").slice(0, 2),
          id: product.id,
        })),
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
        initialProducts: [],
      },
    };
  }
};
