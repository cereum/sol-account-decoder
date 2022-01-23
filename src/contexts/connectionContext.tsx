import { Connection } from "@solana/web3.js";
import { createContext } from "react";

export type Network = "devnet" | "mainnet" | "testnet";

export const connectionContext = createContext<{
  connection: Connection;
  setConnection: Function;
  network: Network;
  setNetwork: Function;
}>({
  connection: new Connection("https://api.mainnet-beta.solana.com"),
  setConnection: () => {},
  network: "mainnet",
  setNetwork: () => {},
});
