import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import React from "react";
import {
  type FormState,
  type FieldValues,
  type UseFormRegister,
  type RegisterOptions,
} from "react-hook-form";

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
  return (
    <FormControl
      isInvalid={!!formState.errors[field]}
      mb={8}
      flexDirection={"column"}
    >
      <FormLabel htmlFor={field} textIndent={"16px"}>
        {label}
      </FormLabel>
      <Input
        bgColor={"gray.100"}
        {...register(field, {
          required: `${isRequired ? "Campo obrigatório." : ""}`,
          ...options,
        })}
        isRequired={isRequired}
        placeholder={placeholder}
        type={type}
        width={"40ch"}
      />
      <FormErrorMessage>
        {formState.errors[field]?.message as string}
      </FormErrorMessage>
    </FormControl>
  );
};

export default FormInput;
