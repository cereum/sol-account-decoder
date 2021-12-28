import { useSolana } from "@saberhq/use-solana";
import { AccountInfo, PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { UnstyledHexEditor } from "react-hex-editor";

type DecoderState = "input" | "parsed" | "unparsed";

export const Decoder = () => {
  const { connection } = useSolana();
  const [decoderState, setDecoderState] = useState<DecoderState>("input");
  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer> | null>();

  const handleInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    try {
      const publicKey = new PublicKey(event.target.value);
      console.log(publicKey);
      const accountInfo = await connection.getAccountInfo(publicKey);
      setAccountInfo(accountInfo);
      setDecoderState("parsed");
    } catch (error) {
      console.log(error);
    }
  };
  const switchState = (state: DecoderState) => {
    switch (state) {
      case "input": {
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleInput(event);
              }}
              placeholder="Address"
              className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
        );
      }
      case "parsed": {
        console.log(accountInfo);
        return accountInfo ? (
          <div className="min-h-screen bg-yellow-50 py-8 px-4">
            <div className="flex flex-col items-center max-w-7xl mx-auto">
              <p className="max-w-prose mx-auto mt-4 text-left">
                {accountInfo.data.toString("hex")}
              </p>
            </div>
          </div>
        ) : null;
      }
      case "unparsed": {
        return (
          <input
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInput(event);
            }}
            placeholder="Address"
            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
          />
        );
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
