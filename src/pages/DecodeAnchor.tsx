import { Button } from "@blueprintjs/core";
import { BN, Idl } from "@project-serum/anchor";
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
import { Toast } from "../components/Toaster";
import { Container } from "../components/UI";

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
      Toast.show({
        intent: "danger",
        message: "Unable to parse Program from IDL File",
      });
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
      Toast.show({
        intent: "danger",
        message: "Unable to parse IDL from file",
      });
    }
  };

  const onDropDownChange = async (value: string) => {
    try {
      setLoading(true);

      const objectEntries = Object.entries(
        await program!.account[camelcase(value)].fetch(
          new PublicKey(accountPubkey!)
        )
      ).map((x: any) => {
        const [key, value] = x;

        if (value instanceof PublicKey) {
          return [key, value.toString()];
        } else if (value instanceof BN) {
          return [key, value.toString()];
        } else if (value instanceof Object) {
          for (const [key, _value] of Object.entries(value)) {
            value[key] = (_value as any).toString();
          }
          return [key, value];
        } else {
          return [key, value];
        }
      });

      const object: { [key: string]: any } = {};
      for (const entry of objectEntries) {
        object[entry![0] as any] = entry![1];
      }
      setAccountContents(object);
    } catch (error) {
      setLoading(false);
      Toast.show({
        intent: "danger",
        message: (error as any).toString(),
      });
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
    <Container>
      <IDLSelectMenu selectOption={onDropDownChange} options={options} />
      {accountContents ? (
        <ReactJson
          collapsed
          src={accountContents}
          style={{
            textAlign: "left",
            marginTop: 12,
            width: 350,
            background: "rgb(25, 25, 25)",
          }}
          theme={"twilight"}
        />
      ) : isLoading ? (
        <BallTriangle color="#ffba01" height={100} width={100} />
      ) : null}
    </Container>
  );
};
