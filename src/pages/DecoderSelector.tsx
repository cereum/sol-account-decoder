import { Button } from "@blueprintjs/core";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PublicKeyInput } from "../components/PublicKeyInput";
import { SchemaSelector } from "../components/SchemaSelector";
import { Toast } from "../components/Toaster";
import { Container } from "../components/UI";

export type SchemaType = "raw" | "anchor";

export const DecoderSelector = () => {
  const [publicKey, setPublicKey] = useState<"">();
  const [schema, setSchemaType] = useState<SchemaType>("raw");

  let navigate = useNavigate();

  const handleSubmit = () => {
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
      Toast.show({ intent: "danger", message: "Invalid Public Key" });
    }
  };
  return (
    <Container>
      <PublicKeyInput setPublicKey={setPublicKey} />
      <SchemaSelector schema={schema} setSchemaType={setSchemaType} />
      <Button intent="primary" style={{ marginTop: 8 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};
