import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { Connection } from "@solana/web3.js";
import { HTMLAttributes, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { connectionContext, Network } from "../contexts/connectionContext";

export interface Option {
  value: Network;
  label: ConnectionLabel;
}

type ConnectionLabel = "Mainnet Beta" | "Devnet" | "Testnet";
type NetworkEndpoint =
  | "https://api.mainnet-beta.solana.com"
  | "https://api.devnet.solana.com"
  | "https://api.testnet.solana.com";

const Selector = Select.ofType<Option>();

const options: Option[] = [
  {
    label: "Mainnet Beta",
    value: "mainnet",
  },
  {
    label: "Testnet",
    value: "testnet",
  },
  {
    label: "Devnet",
    value: "devnet",
  },
];
const convertNetworkToLabel = (network: Network): ConnectionLabel => {
  switch (network) {
    case "devnet":
      return "Devnet";
    case "mainnet":
      return "Mainnet Beta";
    case "testnet":
      return "Testnet";
  }
};

const convertNetworkToEndpoint = (network: Network): NetworkEndpoint => {
  switch (network) {
    case "devnet":
      return "https://api.devnet.solana.com";
    case "mainnet":
      return "https://api.mainnet-beta.solana.com";
    case "testnet":
      return "https://api.testnet.solana.com";
  }
};

export function NetworkSelector({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const { setConnection, setNetwork, network } = useContext(connectionContext);
  const [connectionLabel, setConnectionLabel] = useState<ConnectionLabel>(
    convertNetworkToLabel(network)
  );
  const [activeNetwork, setActiveNetwork] = useState<Network>(network);

  const onChange = (option: Option) => {
    setConnection(new Connection(convertNetworkToEndpoint(option.value)));
    setConnectionLabel(option.label);
    setNetwork(option.value);
    setActiveNetwork(network);
  };

  console.log(`activeNetwork: ${activeNetwork}`);
  if (activeNetwork !== network) {
    setConnection(new Connection(convertNetworkToEndpoint(network)));
    setConnectionLabel(convertNetworkToLabel(network));
    setActiveNetwork(network);
  }

  return (
    <Selector
      items={options}
      filterable={false}
      itemRenderer={(item, { handleClick }) => {
        return (
          <MenuItem
            key={item.label}
            text={item.label}
            // active={item.value === value}
            onClick={(e: any) => handleClick(e)}
            shouldDismissPopover={false}
          />
        );
      }}
      noResults={<MenuItem disabled={true} text="No results." />}
      onItemSelect={onChange}
    >
      <Button text={connectionLabel} rightIcon="double-caret-vertical" />
    </Selector>
  );
}
