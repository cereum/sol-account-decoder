import { Dropdown } from "../elements/Dropdown";

export const SchemaSelector = ({
  setSchemaType,
}: {
  setSchemaType: Function;
}) => {


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    if(name=="schema"){
        setSchemaType(value);
    }
  };
  

  return (
    <div>
      <h2
        className="text-3xl font-extrabold text-gray-600"
        style={{ textAlign: "center" }}
      >
        Select Account Display
      </h2>
      <Dropdown/>
      
    </div>
  );
};
