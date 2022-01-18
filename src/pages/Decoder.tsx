import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import { PublicKeyInput } from "../components/PublicKeyInput";

type DecoderState = "input" | "anchor" | "unparsed";

export const Decoder = () => {
  const [decoderState, setDecoderState] = useState<DecoderState>("input");
  const [accountKey, setAccountKey] = useState<PublicKey>();
  const [, setSchema] = useState<{}>();
  let history = useHistory();

  const switchState = (state: DecoderState) => {
    switch (state) {
      case "input": {
        return (
          <PublicKeyInput
            setPublicKey={setAccountKey}
            setSchema={setSchema}
            setDecoderState={setDecoderState}
          ></PublicKeyInput>
        );
      }
      case "unparsed": {
        if (accountKey) {
          history.push(`/raw/${accountKey.toString()}`);
        }
        break;
      }
      case "anchor": {
        if (accountKey) {
          history.push(`/anchor/${accountKey.toString()}`);
        }
        break;
      }
    }
  };
  return (
    <div className="min-h-screen bg-yellow-50 py-8 px-4">
      <div className="flex flex-col items-center max-w-7xl mx-auto">
        {switchState(decoderState)}
      </div>
    </div>
  );
};
