import { Connection } from "@solana/web3.js";
import { createContext } from "react";

export const connectionContext = createContext<{
  connection: Connection;
  setConnection: Function;
}>({
  connection: new Connection("https://api.mainnet-beta.solana.com"),
  setConnection: (newEndpoint: string) => {},
});
