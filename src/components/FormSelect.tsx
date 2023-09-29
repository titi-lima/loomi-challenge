import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Select, type ChakraStylesConfig } from "chakra-react-select";
import React from "react";
import {
  type FieldValues,
  type RegisterOptions,
  type Control,
  useController,
} from "react-hook-form";

type FormSelectProps = {
  isRequired?: boolean;
  placeholder?: string;
  registerOptions?: RegisterOptions<FieldValues>;
  label?: string;
  control: Control<FieldValues, any>;
  name: string;
  rules?: Omit<
    RegisterOptions<any, string>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
} & (
  | {
      multiple: true;
      options: {
        value: string;
        label: string;
      }[];
    }
  | {
      multiple?: false; // if multiple is false, there's no need to pass options.
      options?: {
        value: string;
        label: string;
      }[];
    }
);

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
  container: (provided) => ({
    ...provided,
    width: "100%",
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
  label,
}: FormSelectProps) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController<any>({
    //TODO: use some generic here instead of any if it matters
    name,
    control,
    rules,
  });
  return (
    <FormControl isInvalid={!!error} id={name} display={"flex"}>
      {label && (
        <FormLabel fontSize={14} w={"136px"}>
          {label}
        </FormLabel>
      )}
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
