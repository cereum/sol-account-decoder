import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { HTMLAttributes } from "react";
import { SchemaType } from "../pages";

interface Option {
  value: SchemaType;
  label: string;
}

const SchemaSelect = Select.ofType<Option>();

export function Dropdown({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement> & {
  schema: SchemaType;
  setSchemaType: Function;
}) {
  const options: Option[] = [
    {
      value: "raw",
      label: "Raw",
    },
    {
      value: "anchor",
      label: "Anchor IDL",
    },
  ];

  const onChange = (option: Option) => {
    props.setSchemaType(option.value);
  };

  return (
    <SchemaSelect
      items={options}
      filterable={false}
      itemRenderer={(item, { handleClick }) => {
        return (
          <MenuItem
            key={item.label}
            text={item.label}
            active={item.value === props.schema}
            onClick={(e: any) => handleClick(e)}
            shouldDismissPopover={false}
          />
        );
      }}
      noResults={<MenuItem disabled={true} text="No results." />}
      onItemSelect={onChange}
    >
      <Button
        text={`Schema Option: ${props.schema}`}
        rightIcon="double-caret-vertical"
      />
    </SchemaSelect>
  );
}
