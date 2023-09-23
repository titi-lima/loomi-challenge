import { FormInput } from "@/components";
import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  field: string;
  label: string;
  isRequired?: boolean;
};

const DETALHES_FORM_FIELDS = [
  {
    field: "name",
    label: "Nome:",
  },
  {
    field: "id",
    label: "ID:",
  },
  {
    field: "code",
    label: "Código:",
  },
  {
    field: "seller:",
    label: "Vendedor:", //! Prototype says it should be "Seller:" here.
  },
  {
    field: "deadline",
    label: "Prazo de entrega:",
  },
];

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
  });
  return (
    <>
      <Box bg="white">
        <Flex gap={20}>
          <Box>
            <Heading as="h4" size="md" m={4}>
              Detalhes
            </Heading>
            {DETALHES_FORM_FIELDS.map((field) => (
              <FormInput
                key={field.field}
                field={field.field}
                label={field.label}
                placeholder=""
                register={register}
                formState={formState}
                labelPosition="left"
              />
            ))}
          </Box>
          <Box>Categorias</Box>
          <Box>Tags</Box>
        </Flex>
        <Box>Especificações</Box>
      </Box>
      <Box bg="white">Itens</Box>
    </>
  );
}
