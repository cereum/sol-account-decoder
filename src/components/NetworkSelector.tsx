import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { Connection } from "@solana/web3.js";
import { HTMLAttributes, useContext, useState } from "react";
import { connectionContext } from "../contexts/connectionContext";

export interface Option {
  value: string;
  label: string;
}

const Selector = Select.ofType<Option>();
type Network = "Devnet" | "Mainnet Beta" | "Testnet";

const options = [
  { label: "Mainnet Beta", value: "https://api.mainnet-beta.solana.com" },
  { label: "Testnet", value: "https://api.testnet.solana.com" },
  { label: "Devnet", value: "https://api.devnet.solana.com" },
];

export function NetworkSelector({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const [currentNetwork, setCurrentNetwork] = useState<Network>("Mainnet Beta");
  const { setConnection } = useContext(connectionContext);

  const onChange = (option: Option) => {
    setCurrentNetwork(option.label as Network);
    setConnection(new Connection(option.value));
  };

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
      <Button text={currentNetwork} rightIcon="double-caret-vertical" />
    </Selector>
  );
}
