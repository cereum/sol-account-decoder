import { Idl } from "@project-serum/anchor";
import { Address, Program } from "@project-serum/anchor/dist/cjs/program";
import { useSolana } from "@saberhq/use-solana";
import { PublicKey } from "@solana/web3.js";
import { useParams } from "react-router-dom";

export const DecodeAnchor = () => {
  const { accountPubkey } = useParams<{ accountPubkey: string }>();

  return (
    <div>
      <input></input>
    </div>
  );
};
