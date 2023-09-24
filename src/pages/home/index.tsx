import { FormInput } from "@/components";
import FormSelect from "@/components/FormSelect";
import { Box, Flex, Heading, Select } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

/**
 * FormValues is typed to have more control over the form fields.
 */

type FormValues = {
  field: string;
  label: string;
  isRequired?: boolean;
  height?: React.CSSProperties["height"];
};

const DETALHES_FORM_FIELDS: FormValues[] = [
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

const ESPECIFICACOES_FORM_FIELDS: FormValues[] = [
  {
    field: "subtitle",
    label: "Subtítulo:",
  },
  {
    field: "informations",
    label: "Informações:",
    height: "5rem",
  },
  {
    field: "cleaning_care",
    label: "Limpeza e Cuidados:",
    height: "5rem",
  },
];

export default function Home() {
  const { register, handleSubmit, formState, control } = useForm({
    mode: "onBlur",
  });
  return (
    <>
      <Box bg="white" borderRadius={"24px"}>
        <Flex gap={20}>
          <Box m={4} flex={1}>
            <Heading as="h4" size="md" mb={8}>
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
          <Box m={4} flex={1}>
            <Heading as="h4" size="md" mb={8}>
              Categorias
            </Heading>
            <FormSelect
              control={control}
              placeholder="Selecionar categorias"
              name="categories"
              multiple
              options={[
                { value: "option1", label: "Cadeira" },
                { value: "option2", label: "Mesa" },
                { value: "option3", label: "Sofá" },
              ]}
            />
          </Box>
          <Box m={4} flex={1}>
            <Heading as="h4" size="md" mb={8}>
              Tags
            </Heading>
            <FormSelect
              control={control}
              placeholder="Selecionar tags"
              name="tags"
              multiple
              options={[
                { value: "option1", label: "Madeira escura" },
                { value: "option2", label: "Madeira média" },
                { value: "option3", label: "Madeira clara" },
              ]}
            />
          </Box>
        </Flex>
        <Box>
          <Heading as="h4" size="md" mb={8}>
            Especificações
          </Heading>
          {ESPECIFICACOES_FORM_FIELDS.map((field) => (
            <FormInput
              key={field.field}
              field={field.field}
              label={field.label}
              placeholder=""
              register={register}
              formState={formState}
              labelPosition="left"
              height={field.height} // !ERR: only one line being used
            />
          ))}
        </Box>
      </Box>
      <Box bg="white">Itens</Box>
    </>
  );
}
