import { useSolana } from "@saberhq/use-solana";
import { AccountInfo, PublicKey } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { AccountViewer } from "../components/AccountViewer";

import { PublicKeyInput } from "../components/PublicKeyInput";
import { Box } from "../elements";

type DecoderState = "input" | "parsed" | "unparsed";

export const Decoder = () => {
  const { connection } = useSolana();
  const [decoderState, setDecoderState] = useState<DecoderState>("input");
  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer> | null>();
  const [accountKey, setAccountKey] = useState<PublicKey>();
  const [, setSchema] = useState<{}>();

  const getAccountInfo = async () => {
    try {
      const accountInfo = await connection.getAccountInfo(accountKey!);
      setAccountInfo(accountInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccountInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decoderState]);

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
        return accountInfo ? (
          <AccountViewer accountInfo={accountInfo}></AccountViewer>
        ) : (
          <Box.Center>
            <p
              className="text-2xl font-extrabold text-gray-600"
              style={{ textAlign: "center" }}
            >
              Whoops! We can't seem to find any information about this account.
            </p>
          </Box.Center>
        );
      }
      case "parsed": {
        return <p>Schema Parser</p>;
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
