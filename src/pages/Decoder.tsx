import { useSolana } from "@saberhq/use-solana";
import { AccountInfo, PublicKey } from "@solana/web3.js";
import { useState,useEffect } from "react";
import { AccountViewer } from "../components/AccountViewer";

import { PublicKeyInput } from "../components/PublicKeyInput";
import { HexViewer } from "react-hexviewer-ts";
import { Button } from "../elements";


export const Decoder = () => {
  const { connection } = useSolana();
  const [decoderState, setDecoderState] = useState<DecoderState>("input");
  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer>>();
  const [accountKey, setAccountKey] = useState<PublicKey>();
  const [schema, setSchema] = useState<{}>();

  const getAccountInfo = async () => {
    try {
      const accountInfo = await connection.getAccountInfo(publicKey!);
      setAccountInfo(accountInfo);
      const publicKey = new PublicKey(event.target.value);
      console.log(publicKey);
      const accountInfo = await connection.getAccountInfo(publicKey);
      setAccountKey(publicKey);
      setAccountInfo(accountInfo!);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSchemaInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    try {
      setSchema(JSON.parse(event.target.value));
    } catch (error) {
      console.log(error);
    }
  };


  const handleSubmit = async () => {
    if (accountInfo && schema) {
      setDecoderState("parsed");
    } else if (accountInfo) {
      setDecoderState("unparsed");
    } else {
      return;
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
              className="px-3 py-3 my-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
            <input
              type="text"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleSchemaInput(event);
              }}
              placeholder="Schema"
              className="px-3 py-3 my-4 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
            <Button className="px-3 py-3 my-4 w-full" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        );
      }
      case "unparsed": {
        return accountInfo ? (
          <>
            <h2
              className="text-3xl font-extrabold text-gray-600"
              style={{ textAlign: "center" }}
            >
              View hex dump for address: {accountKey!.toString()}
            </h2>
            <div className="my-4">
              <HexViewer hex={true} rowLength={32} setLength={4}>
                {accountInfo.data}
              </HexViewer>
            </div>
          </>
        ) : null;
      }
      case "parsed": {
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
  }
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
