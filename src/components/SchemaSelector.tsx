import { Dropdown } from "../elements/Dropdown";

export const SchemaSelector = ({
  setSchemaType,
}: {
  setSchemaType: Function;
}) => {
  return (
    <div>
      <h2
        className="text-3xl font-extrabold text-gray-600"
        style={{ textAlign: "center" }}
      >
        Select Account Display
      </h2>
      <Dropdown setSchemaType={setSchemaType} />
    </div>
  );
};
