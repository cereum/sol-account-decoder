import { H3 } from "@blueprintjs/core";
import { Dropdown } from "../elements/Dropdown";
import Drop, { Option } from "react-dropdown";
import { SchemaType } from "../pages";

export const SchemaSelector = ({
  schema,
  setSchemaType,
}: {
  schema: SchemaType;
  setSchemaType: Function;
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

  const onChange = (option: Option) => {
    setSchemaType(option.value);
  };

  return (
    <div>
      <H3 style={{ margin: 18, textAlign: "center" }}>
        Select Account Display
      </H3>
      <Dropdown schema={schema} setSchemaType={setSchemaType} />
    </div>
  );
};
