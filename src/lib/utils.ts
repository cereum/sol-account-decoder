import { Network } from "../contexts/ConnectionContext";
import { NetworkEndpoint } from "../components/NetworkSelector";

export const convertNetworkToEndpoint = (network: Network): NetworkEndpoint => {
  switch (network) {
    case "devnet":
      return "https://api.devnet.solana.com";
    case "mainnet":
      return "https://api.mainnet-beta.solana.com";
    case "testnet":
      return "https://api.testnet.solana.com";
  }
};
