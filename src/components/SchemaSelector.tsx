import { H3 } from "@blueprintjs/core";
import { Dropdown } from "./SchemaSelectMenu";
import { SchemaType } from "../pages";

export const SchemaSelector = ({
  schema,
  setSchemaType,
}: {
  schema: SchemaType;
  setSchemaType: Function;
}) => {
  return (
    <div>
      <H3 style={{ margin: 18, textAlign: "center" }}>
        Select Account Display
      </H3>
      <Dropdown schema={schema} setSchemaType={setSchemaType} />
    </div>
  );
};
