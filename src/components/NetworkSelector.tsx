import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { HTMLAttributes, useEffect, useState } from "react";
import { Network, useConnection } from "../contexts/ConnectionContext";

export interface Option {
  value: Network;
  label: ConnectionLabel;
}

type ConnectionLabel = "Mainnet Beta" | "Devnet" | "Testnet";
export type NetworkEndpoint =
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

export function NetworkSelector({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const { setNetwork, network } = useConnection();
  const [connectionLabel, setConnectionLabel] = useState<ConnectionLabel>(
    convertNetworkToLabel(network || "mainnet")
  );

  const onChange = (option: Option) => {
    setNetwork(option.value);
  };
  
  useEffect(() => {
    setConnectionLabel(convertNetworkToLabel(network || "mainnet"));
  }, [network]);

  console.log("selector");
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
