import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PublicKeyInput } from "../components/PublicKeyInput";

type DecoderState = "input" | "anchor" | "unparsed";


export const DecoderSelector = () => {
  const [decoderState, setDecoderState] = useState<DecoderState>("input");
  const [accountKey, setAccountKey] = useState<PublicKey>();
  let navigate = useNavigate();

  const switchState = (state: DecoderState) => {
    switch (state) {
      case "input": {
        return (
          <PublicKeyInput
            setPublicKey={setAccountKey}
            setDecoderState={setDecoderState}
          ></PublicKeyInput>
        );
      }
      case "unparsed": {
        if (accountKey) {
          navigate(`/raw/${accountKey.toString()}`);
        }
        break;
      }
      case "anchor": {
        if (accountKey) {
          navigate(`/anchor/${accountKey.toString()}`);
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
