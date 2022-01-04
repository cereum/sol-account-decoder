import { useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { Button } from "../elements";

export const PublicKeyInput = ({
  setPublicKey,
  setSchema,
  setDecoderState,
}: {
  setPublicKey: Function;
  setSchema: Function;
  setDecoderState: Function;
}) => {
  const [values, setValues] = useState({ key: "", schema: "" });
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = () => {
    if (values.key === "") {
      setError("Please Enter Public Key");
    }
    try {
      const publicKey = new PublicKey(values.key);
      setPublicKey(publicKey);
    } catch (error) {
      setError("Invalid Public Key");
      console.log(error);
    }
    if (values.schema !== "") {
      //TODO validation
      setSchema(values.schema);
      setDecoderState("parsed");
    } else {
      setDecoderState("unparsed");
    }
  };

  return (
    <div>
      <h2
        className="text-3xl font-extrabold text-gray-600"
        style={{ textAlign: "center" }}
      >
        Enter Account Address
      </h2>
      <input
        type="text"
        name="key"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
        }}
        placeholder="Address"
        className="px-3 py-3 my-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
      />
      <input
        type="text"
        name="schema"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(event);
        }}
        placeholder="Schema"
        className="px-3 py-3 my-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
      />
      <Button className="px-3 py-3 my-4 w-full" onClick={handleSubmit}>
        Submit
      </Button>
      {error && <h2>{error}</h2>}
    </div>
  );
};
