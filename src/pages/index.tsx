import Head from "next/head";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormInput } from "@/components";
import { logo } from "@/assets";
import Image from "next/image";

export default function Home() {
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <>
      <Head>
        <title>Loomi Challenge</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex flex={1} height={"100vh"} justifyContent={"center"}>
        <Flex
          flex={0.5}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          bgColor={"white"}
        >
          <Image src={logo} alt="Loomi" width={200} height={200} />
          <Text as={"h1"} fontSize={"20"} fontWeight={"500"} m={8}>
            Entrar na plataforma
          </Text>
          <Box
            as={"form"}
            onSubmit={handleSubmit(onSubmit)}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <FormInput
              register={register}
              formState={formState}
              field="email"
              type="email"
              label="E-mail"
              isRequired
              options={{
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail inválido.",
                },
              }}
            />
            <FormInput
              register={register}
              formState={formState}
              field="password"
              type="password"
              label="Senha"
              isRequired
              options={{
                minLength: {
                  value: 4,
                  message: "A senha deve ter no mínimo 4 caracteres.",
                },
              }}
            />
            <Button
              type={"submit"}
              colorScheme={"primary"}
              isLoading={formState.isSubmitting}
              w={24}
              h={8}
            >
              Entrar
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
