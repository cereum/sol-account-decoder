import { useSolana } from "@saberhq/use-solana";
import { AccountInfo, PublicKey } from "@solana/web3.js";
import { useState,useEffect } from "react";
import { AccountViewer } from "../components/AccountViewer";

import { PublicKeyInput } from "../components/PublicKeyInput";


export const Decoder = () => {
  const { connection } = useSolana();
  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer> | null>();

  const getAccountInfo = async () => {
    try {
      const accountInfo = await connection.getAccountInfo(publicKey!);
      setAccountInfo(accountInfo);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if(publicKey){
      getAccountInfo()
    }
  } ,[publicKey])

  return (
    <div className="min-h-screen bg-yellow-50 py-8 px-4">
      <div className="flex flex-col items-center max-w-7xl mx-auto">
        {!publicKey?
          <PublicKeyInput setPublicKey={setPublicKey}></PublicKeyInput>:null
        }
        {accountInfo?
          <AccountViewer accountInfo={accountInfo!}></AccountViewer>:null
        }
      </div>
    </div>
  );
};
