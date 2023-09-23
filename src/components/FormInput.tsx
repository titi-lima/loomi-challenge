import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
  IconButton,
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
}: FormInputProps) => {
  const [typeState, setTypeState] = React.useState(type || "text");
  return (
    <FormControl
      isInvalid={!!formState.errors[field]}
      mb={8}
      flexDirection={"column"}
    >
      <FormLabel htmlFor={field} textIndent={"16px"}>
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
          width={"40ch"}
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
      <FormErrorMessage>
        {formState.errors[field]?.message as string}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
