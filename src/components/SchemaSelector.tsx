import { Dropdown } from "../elements/Dropdown";
import Drop, { Option } from "react-dropdown";
import { SchemaType } from "../pages";

export const SchemaSelector = ({
  setSchemaType,
  schema
}: {
  setSchemaType: Function;
  schema: SchemaType
}) => {
    const options = [
    {
      value: "raw",
      label: "Raw",
    },
    {
      value: "anchor",
      label: "Anchor IDL",
    },
    {
      value: "schema",
      label: "Schema",
    },
  ];
  const defaultOption = options[0];

  const onChange = (option: Option) => {
    setSchemaType(option.value);
  };

  return (
    <div>
      <h2
        className="text-3xl font-extrabold text-gray-600"
        style={{ textAlign: "center" }}
      >
        Select Account Display
      </h2>
      <Drop
      onChange={onChange}
      options={options}
      value={schema}
      placeholder="Select an option"
      className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-center`}
    />
    </div>
   );
};
