import Head from "next/head";
import { Flex, Box, Button, Text, Spinner } from "@chakra-ui/react";
import { FieldValues, set, useForm } from "react-hook-form";
import { FormInput } from "@/components";
import { logo } from "@/assets";
import Image from "next/image";
import { api } from "@/services";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useUser } from "@/contexts/UserContext";
import React from "react";

export default function Home() {
  const User = useUser();
  const [isLoading, setIsLoading] = React.useState(false);
  const { register, handleSubmit, formState } = useForm();
  const router = useRouter();
  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await api.post("/login", { body: data });
      setCookie("token", response.data["access-token"]);
      User.setUsername("Eduardo");
      User.setProfilePic("E");
      router.push("/home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
            onSubmit={handleSubmit(async (data) => await onSubmit(data))}
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
              {isLoading ? <Spinner /> : "Entrar"}
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
