import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import { Select, type ChakraStylesConfig } from "chakra-react-select";
import React from "react";
import {
  type UseFormRegister,
  type FieldValues,
  type FormState,
  type RegisterOptions,
  type Control,
  useController,
} from "react-hook-form";

type FormSelectProps = {
  isRequired?: boolean;
  placeholder?: string;
  registerOptions?: RegisterOptions<FieldValues>;
  multiple?: boolean;
  options: {
    value: string;
    label: string;
  }[];
  control: Control<FieldValues, any>;
  name: string;
  rules?: Omit<
    RegisterOptions<any, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
};

const chakraStyles: ChakraStylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "gray.100",
    border: "none",
    _hover: {
      cursor: "pointer",
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    border: "none",
  }),
};

const FormSelect = ({
  name,
  rules,
  isRequired = false,
  placeholder = "",
  multiple = false,
  options,
  control,
}: FormSelectProps) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController<any>({
    name,
    control,
    rules,
  });
  return (
    <FormControl isInvalid={!!error} id={name}>
      <Select
        placeholder={placeholder}
        options={options}
        isMulti={multiple}
        onChange={onChange}
        value={value}
        ref={ref}
        required={isRequired}
        // @ts-expect-error - chakra-react-select types are not working properly
        chakraStyles={chakraStyles}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormSelect;
