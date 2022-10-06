import { Button } from "@blueprintjs/core";
import { BN, BorshAccountsCoder, Idl, Provider } from "@project-serum/anchor";
import { Program } from "@project-serum/anchor/dist/cjs/program";
import { PublicKey } from "@solana/web3.js";
import { useContext, useEffect, useState } from "react";
import { IDLInput } from "../components/IDLInput";
import camelcase from "camelcase";
import { useNavigate, useParams } from "react-router-dom";
import ReactJson from "react-json-view";
import { BallTriangle } from "react-loader-spinner";
import { IDLSelectMenu, Option } from "../components/IDLSelectMenu";
import { Toast } from "../components/Toaster";
import { Container } from "../components/UI";
import { ThemeContext } from "../contexts/themeContext";
import { Network, useConnection } from "../contexts/ConnectionContext";
import { IdlTypeDef } from "@project-serum/anchor/dist/cjs/idl";
import { DecodeStrategy, DecodeStrategySelectMenu } from '../components/DecodeStrategySelectMenu';


function decodeAccount(coder: BorshAccountsCoder, type: IdlTypeDef, data: Buffer, strategy: DecodeStrategy): Object {
  const discriminator = BorshAccountsCoder.accountDiscriminator(type.name);
  switch (strategy) {
    case 'Anchor':
      return coder.decode(type.name, data);
    case 'AddDiscriminator':
      return coder.decode(type.name, Buffer.concat([discriminator, data]));;
    case 'ReplaceDiscriminator':
      // Untested
      return coder.decode(type.name, Buffer.concat([discriminator, data.slice(8,)]));;
  }
}

export const DecodeAnchor = () => {
  const { accountPubkey, network: urlNetwork } =
    useParams<{ accountPubkey: string; network: Network }>();
  const [program, setProgram] = useState<Program>();
  const { connection, network, setNetwork } = useConnection();
  const [idl, setIDL] = useState<any>();
  const [options, setOptions] = useState<Option[]>([]);
  const [accountContents, setAccountContents] = useState<Object>();
  const [isLoading, setLoading] = useState(false);

  const [decodeStrategy, setDecodeStrategy] = useState<DecodeStrategy>('Anchor');
  const [idlAccountType, setIdlAccountType] = useState<IdlTypeDef | null>(null);

  let navigate = useNavigate();

  const isDark = useContext(ThemeContext);

  useEffect(() => {
    if (urlNetwork && urlNetwork !== network && !network) {
      setNetwork(urlNetwork);
      setProgram(undefined);
      navigate(`/anchor/${urlNetwork}/${accountPubkey}`);
    }
  }, [network, accountPubkey, navigate, setNetwork, urlNetwork]);

  useEffect(() => {
    if (urlNetwork !== network && network) {
      setNetwork(network);
      setProgram(undefined);
      navigate(`/anchor/${network}/${accountPubkey}`);
    }
  }, [network, accountPubkey, navigate, setNetwork, urlNetwork]);

  useEffect(() => {
    if (urlNetwork !== network && network) {
      setAccountContents(undefined);
      setLoading(false);
      setProgram(
        new Program(
          idl! as Idl,
          new PublicKey(idl!.metadata.address ? idl!.metadata.address : 0),
          { connection } as Provider
        )
      );
    }
  }, [idl, connection, network, urlNetwork]);

  const handleSubmit = () => {
    try {
      setProgram(
        new Program(idl! as Idl, new PublicKey(idl!.metadata.address || 0), {
          connection,
        } as Provider)
      );
    } catch (error) {
      Toast.show({
        intent: "danger",
        message: "Unable to parse Program from IDL File",
      });
    }
  };

  const handleIDLFile = (file: File) => {
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

  function decodeObject(object: any) {
    const decodedObject: { [key: string]: any } = {};

    if (object === null) return;

    if (object.hasOwnProperty("words") && object.hasOwnProperty("negative")) {
      return object.toString();
    } else if (object instanceof Object && !(object instanceof PublicKey)) {
      for (const [key, value] of Object.entries(object)) {
        decodedObject[key] = decodeObject(value);
      }
      return decodedObject;
    } else {
      return object.toString();
    }
  }

  const onDropDownChange = async (value: string) => {
    const typedIdl: Idl = idl as Idl;
    const type: IdlTypeDef = typedIdl.accounts!.filter((def) => def.name.toLowerCase() === value.toLocaleLowerCase())![0];
    setIdlAccountType(type);
  }

  const onButtonClick = async () => {
    try {
      setLoading(true);
      setAccountContents(undefined);

      if (!idlAccountType) {
        throw Error("No account type selected");
      }

      const accountDetails = await connection?.getAccountInfo(new PublicKey(accountPubkey!));
      if (!accountDetails) {
        throw Error("Account not found");
      }
      console.log(`Decoding: ${idlAccountType} with ${decodeStrategy}`);
      const decoded = decodeAccount(new BorshAccountsCoder(idl as Idl), idlAccountType, accountDetails.data, decodeStrategy);

      const objectEntries = Object.entries(
        decoded,
      ).map((x: any) => {
        const [key, value] = x;

        if (value instanceof PublicKey) {
          return [key, value.toString()];
        } else if (value instanceof BN) {
          return [key, value.toString()];
        } else if (value instanceof Object) {
          return [key, decodeObject(value)];
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
      console.log(error);
      setLoading(false);
      Toast.show({
        intent: "danger",
        message: (error as any).toString(),
      });
    }
  };

  const onDecodeStrategyChange = async (newDecodeStrategy: DecodeStrategy) => {
    setDecodeStrategy(newDecodeStrategy);
  }

  return !program ? (
    <div>
      <IDLInput setFile={handleIDLFile} />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  ) : (
    <div>
      <div className="mx-auto flex flex-row center place-items-center px-5 place-content-center">
        <div className="">
          <DecodeStrategySelectMenu selectOption={onDecodeStrategyChange} />
        </div>
        <div className="my-auto place-items-center px-5">
          <IDLSelectMenu selectOption={onDropDownChange} options={options} />
        </div>
        <div>
          <Button onClick={onButtonClick}>Decode</Button>
        </div>
      </div>
      <Container>
        {accountContents ? (
          <ReactJson
            collapsed
            src={accountContents}
            style={{
              textAlign: "left",
              marginTop: 12,
              paddingRight: 24,
              background: isDark ? "rgb(25, 25, 25)" : "#e8dcb2",
            }}
            theme={isDark ? "twilight" : "rjv-default"}
          />
        ) : isLoading ? (
          <BallTriangle color="#ffba01" height={100} width={100} />
        ) : null}
      </Container>
    </div>
  );
};
