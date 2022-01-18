import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { HTMLAttributes } from "react";

export interface Option {
  value: string;
  label: string;
}

const SchemaSelect = Select.ofType<Option>();

export function IDLSelectMenu({
  className,
  //   value,
  options,
  selectOption,
  ...props
}: HTMLAttributes<HTMLButtonElement> & {
  //   value: SchemaType;
  options: Option[];
  selectOption: Function;
}) {
  const onChange = (option: Option) => {
    selectOption(option.value);
  };

  return (
    <SchemaSelect
      items={options}
      filterable={false}
      itemRenderer={(item, { handleClick }) => {
        return (
          <MenuItem
            text={item.label}
            // active={item.value === value}
            onClick={(e: any) => handleClick(e)}
            shouldDismissPopover={false}
          />
        );
      }}
      noResults={<MenuItem disabled={true} text="No results." />}
      onItemSelect={onChange}
    >
      <Button
        style={{ marginTop: 18 }}
        text="Select Account"
        rightIcon="double-caret-vertical"
      />
    </SchemaSelect>
  );
}
