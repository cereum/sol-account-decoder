import { HTMLAttributes } from "react";
import Drop, { Option } from "react-dropdown";

export function Dropdown({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement> & { setSchemaType: Function }) {
  const options = [
    {
      value: "anchor",
      label: "Raw Anchor Schema",
    },
    {
      value: "raw",
      label: "Schema",
    },
  ];
  const defaultOption = options[0];

  const onChange = (option: Option) => {
    props.setSchemaType(option.value);
  };

  return (
    <Drop
      onChange={onChange}
      options={options}
      value={defaultOption}
      placeholder="Select an option"
      className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-center ${className}`}
    />
  );
}
