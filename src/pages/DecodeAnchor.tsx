import { Button } from "@blueprintjs/core";
import { Idl } from "@project-serum/anchor";
import { Program } from "@project-serum/anchor/dist/cjs/program";
import { useSolana } from "@saberhq/use-solana";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";
import { IDLInput } from "../components/IDLInput";
import camelcase from "camelcase";
import { useParams } from "react-router-dom";
import ReactJson from "react-json-view";
import { BallTriangle } from "react-loader-spinner";
import { IDLSelectMenu, Option } from "../components/IDLSelectMenu";

export const DecodeAnchor = () => {
  const { accountPubkey } = useParams<{ accountPubkey: string }>();
  const [program, setProgram] = useState<Program>();
  const { provider } = useSolana();
  const [idl, setIDL] = useState<any>();
  const [options, setOptions] = useState<Option[]>([]);
  const [accountContents, setAccountContents] = useState<any>();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = () => {
    try {
      setProgram(
        new Program(
          idl! as Idl,
          new PublicKey(idl!.metadata.address ? idl!.metadata.address : 0),
          provider
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const validateIDL = (file: File) => {
    try {
      const idlJSON = JSON.parse(file.toString());
      setIDL(idlJSON);
      setOptions(
        idlJSON.accounts.map((account: any) => {
          return { label: account.name, value: account.name };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onDropDownChange = async (value: string) => {
    try {
      setLoading(true);
      setAccountContents(
        await program!.account[camelcase(value)].fetch(
          new PublicKey(accountPubkey!)
        )
      );
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return !program ? (
    <div>
      <div>
        <IDLInput setFile={validateIDL} />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  ) : (
    <>
      {accountContents ? (
        <ReactJson src={accountContents} />
      ) : isLoading ? (
        <BallTriangle color="#ffba01" height={100} width={100} />
      ) : null}
      <IDLSelectMenu selectOption={onDropDownChange} options={options} />
    </>
  );
};
