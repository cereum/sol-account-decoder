import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { HTMLAttributes, useState } from "react";

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
    setButtonText(option.label);
    selectOption(option.value);
  };
  const [buttonText, setButtonText] = useState<string>("Select Account");

  return (
    <SchemaSelect
      items={options}
      filterable={false}
      itemRenderer={(item, { handleClick }) => {
        return (
          <MenuItem
            key={item.label}
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
        text={buttonText}
        rightIcon="double-caret-vertical"
      />
    </SchemaSelect>
  );
}
