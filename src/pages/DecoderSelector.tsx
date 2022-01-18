import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PublicKeyInput } from "../components/PublicKeyInput";
import { SchemaSelector } from "../components/SchemaSelector";
import { Button } from "../elements";

type SchemaType = "raw" | "anchor" | "schema";

export const DecoderSelector = () => {
  const [publicKey, setPublicKey] = useState<"">();
  const [schema, setSchemaType] = useState<"raw">();
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleSubmit = () => {
    if (publicKey === "") {
      setError("Please Enter Public Key");
    }
    try {
      const pubKey = new PublicKey(publicKey!);
      if (schema === "raw") {
        navigate(`/raw/${pubKey.toString()}`);
      } else if (schema === "anchor") {
        navigate(`/anchor/${pubKey.toString()}`);
      } else {
        navigate(`/raw/${pubKey.toString()}`);
      }
    } catch (error) {
      setError("Invalid Public Key");
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-yellow-50 py-8 px-4">
      <div className="flex flex-col items-center max-w-7xl mx-auto">
        <PublicKeyInput setPublicKey={setPublicKey} />
        <SchemaSelector setSchemaType={setSchemaType} />
        <Button className="px-3 py-3 my-4 w-half" onClick={handleSubmit}>
          Submit
        </Button>
        {error && <h2>{error}</h2>}
      </div>
    </div>
  );
};
