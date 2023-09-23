import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import {
  type FormState,
  type FieldValues,
  type UseFormRegister,
  type RegisterOptions,
} from "react-hook-form";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type FormInputProps = {
  register: UseFormRegister<FieldValues>;
  formState: FormState<FieldValues>;
  field: string;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  options?: RegisterOptions<FieldValues>;
  labelPosition?: "left" | "top";
};

const FormInput = ({
  register,
  formState,
  field,
  type,
  label,
  options,
  isRequired = false,
  placeholder = label,
  labelPosition = "top",
}: FormInputProps) => {
  const [typeState, setTypeState] = React.useState(type || "text");
  return (
    <FormControl
      isInvalid={!!formState.errors[field]}
      mb={8}
      flexDirection={"column"}
    >
      <Flex
        direction={labelPosition === "left" ? "row" : "column"}
        alignItems={labelPosition === "left" ? "center" : "flex-start"}
      >
        <FormLabel
          htmlFor={field}
          textIndent={labelPosition === "left" ? 0 : "16px"}
          width={labelPosition === "left" ? "136px" : "auto"}
          fontSize={14}
          verticalAlign={"middle"}
        >
          {label}
        </FormLabel>
        <InputGroup>
          <Input
            bgColor={"gray.100"}
            {...register(field, {
              required: `${isRequired ? "Campo obrigatório." : ""}`,
              ...options,
            })}
            isRequired={isRequired}
            placeholder={placeholder}
            type={typeState}
            border={"none"}
          />
          <InputRightElement>
            {label === "Senha" && (
              <IconButton
                aria-label="Mostrar senha"
                icon={typeState === "password" ? <ViewIcon /> : <ViewOffIcon />}
                onClick={() => {
                  setTypeState(typeState === "text" ? "password" : "text");
                }}
                variant={"unstyled"}
              />
            )}
          </InputRightElement>
        </InputGroup>
      </Flex>
      <FormErrorMessage>
        {formState.errors[field]?.message as string}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
