import { FormInput, FormSelect, Navbar, Sidebar } from "@/components";
import { ensureUserLoggedIn } from "@/utils";
import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { type GetServerSidePropsContext } from "next";
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
    field: "seller",
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

type ItemProps = {
  register: ReturnType<typeof useForm>["register"];
  formState: ReturnType<typeof useForm>["formState"];
  control: ReturnType<typeof useForm>["control"];
  index: number;
};

const Item = ({ register, formState, control, index }: ItemProps) => {
  return (
    <>
      <Flex>
        <Heading as="h5" size="sm" mb={8} width={"5rem"} lineHeight={"0"}>
          Item {index + 1 > 9 ? index + 1 : `0${index + 1}`}
        </Heading>
        <Divider />
      </Flex>
      <Box width={400}>
        <FormInput
          field="code" //TODO: find how to make this dynamic in a array
          label="Código:"
          placeholder=""
          register={register}
          formState={formState}
          labelPosition="left"
          isRequired
        />
        <FormSelect control={control} name="color" label="Cor:" isRequired />
        <Flex gap={3} mt={8}>
          <Text mr={5}>Tamanho:</Text>
          <FormInput
            field="width"
            placeholder=""
            register={register}
            formState={formState}
            labelPosition="left"
            type="number"
            isRequired
          />
          <Text whiteSpace={"nowrap"} lineHeight={10}>
            m x
          </Text>
          <FormInput
            field="height"
            placeholder=""
            register={register}
            formState={formState}
            type="number"
            isRequired
          />
          <Text whiteSpace={"nowrap"} lineHeight={10}>
            m x
          </Text>
          <FormInput
            field="depth"
            placeholder=""
            register={register}
            formState={formState}
            type="number"
            isRequired
          />
        </Flex>
      </Box>
    </>
  );
};

export default function AddProduct() {
  const { register, handleSubmit, formState, control } = useForm();
  const [items, setItems] = React.useState([
    <Item
      key={1}
      register={register}
      formState={formState}
      control={control}
      index={0}
    />,
  ]);

  return (
    <>
      <Navbar />
      <Box display={"flex"} flex={1} bg={"gray.100"}>
        <Sidebar currentRoute="/add-product" />
        <Box
          as={"form"}
          onSubmit={handleSubmit((data) => console.log(data))}
          display={"flex"}
          flexDirection={"column"}
          flex={1}
          m={10}
        >
          <Heading as="h3" size="lg" mb={8}>
            Adicionar produto
          </Heading>
          <Box bg="white" borderRadius={"20px"} pt={8} px={8}>
            <Flex gap={20}>
              <Box flex={1}>
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
              <Box flex={1}>
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
              <Box flex={1}>
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
          <Box bg="white" borderRadius={"20px"} p={4} mt={10}>
            <Flex justifyContent={"space-between"}>
              <Heading as="h4" size="md" mb={8}>
                Itens
              </Heading>
              <Button
                variant={"unstyled"}
                fontSize={18}
                onClick={() => {
                  setItems([
                    ...items,
                    <Item
                      key={items.length + 1}
                      register={register}
                      formState={formState}
                      control={control}
                      index={items.length}
                    />,
                  ]);
                }}
              >
                + Adicionar
              </Button>
            </Flex>
            {items.map((item) => item)}
          </Box>
          <Flex justifyContent={"flex-end"} gap={4} mt={8}>
            <Button
              type="submit"
              variant="solid"
              mt={8}
              width={"120px"}
              alignSelf={"flex-end"}
              backgroundColor="#4e5d6610"
              _hover={{ backgroundColor: "#00000010" }}
              color="#3D464B"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="solid"
              mt={8}
              width={"120px"}
              alignSelf={"flex-end"}
              backgroundColor="#C0D7E5"
              _hover={{ backgroundColor: "#a9bdc9" }}
              color="#3D464B"
            >
              Criar
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
