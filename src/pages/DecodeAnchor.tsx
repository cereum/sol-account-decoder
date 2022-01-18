import { PublicKey } from "@solana/web3.js";
import { useParams } from "react-router-dom";

export const DecodeAnchor = () => {
  const { accountPubkey } = useParams<{ accountPubkey: string }>();
  
  return (
    <div>
      <input>
      </input>
    </div>
  );
};
