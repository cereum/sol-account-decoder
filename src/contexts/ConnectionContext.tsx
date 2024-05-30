import { Connection } from "@solana/web3.js";
import { createContext, useContext, useState } from "react";
import { convertNetworkToEndpoint } from "../lib/utils";

export type Network = "devnet" | "mainnet" | "testnet";

type SetNetwork = (network: Network) => void;
type ConnectionProviderProps = { children: React.ReactNode };

const ConnectionContext = createContext<
  | { setNetwork: SetNetwork; connection?: Connection; network?: Network }
  | undefined
>(undefined);

function ConnectionProvider({ children }: ConnectionProviderProps) {
  const [network, setNetworkState] = useState<Network>('mainnet');
  const [connection, setConnection] = useState<Connection>(new Connection(convertNetworkToEndpoint('mainnet')));

  const setNetwork = (targetNetwork: Network) => {
    if (targetNetwork !== network) {
      setNetworkState(targetNetwork);
      console.log(convertNetworkToEndpoint(targetNetwork));
      setConnection(new Connection(convertNetworkToEndpoint(targetNetwork)));
    }
  };

  return (
    <ConnectionContext.Provider value={{ connection, network, setNetwork }}>
      {children}
    </ConnectionContext.Provider>
  );
}

function useConnection() {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
}

export { ConnectionProvider, useConnection };
