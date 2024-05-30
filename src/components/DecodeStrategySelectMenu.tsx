
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import { HTMLAttributes, useState } from "react";

export interface Option {
    value: string;
    label: string;
}

const SchemaSelect = Select.ofType<Option>();

export type DecodeStrategy =
    | 'Anchor'
    | 'AddDiscriminator'
    | 'ReplaceDiscriminator';

const DECODE_STRATEGY_OPTIONS: DecodeStrategy[] = [
    'Anchor',
    'AddDiscriminator',
    'ReplaceDiscriminator'
]

export function DecodeStrategySelectMenu({
    selectOption,
}: HTMLAttributes<HTMLButtonElement> & {
    selectOption: Function;
}) {
    const onChange = (option: Option) => {
        setButtonText(option.label);
        selectOption(option.value);
    };
    const [buttonText, setButtonText] = useState<string>("Anchor");

    return (
        <SchemaSelect
            items={DECODE_STRATEGY_OPTIONS.map((opt) => {
                return {
                    label: opt,
                    value: opt
                }
            })}
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
            <Button
                style={{}}
                text={buttonText}
                rightIcon="double-caret-vertical"
            />
        </SchemaSelect>
    )
}