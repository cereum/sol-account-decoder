import React, { FC } from "react";
import { Item } from "./item";

export const Set: FC<{
  active: boolean;
  activeItem: number;
  activateItem(idx: number): void;
  activateSet(idx: number): void;
  clearSet(): void;
  clearItem(): void;
  index: number;
  set: number[];
}> = (props) => {
  const {
    set,
    activeItem,
    activateItem,
    activateSet,
    active,
    clearItem,
    clearSet,
    index,
  } = props;

  const items = set.map((byte, i) => {
    let byteString = "";
    if (byte === -1) {
      byteString = "--";
    } else {
      byteString = byte.toString(16);
      if (byteString.length === 1) {
        byteString = `0${byteString}`;
      }
    }
    byteString = byteString.toUpperCase();
    const idx = i;

    return (
      <Item
        key={`${idx}`}
        index={i}
        byte={byteString}
        active={!!(activeItem === i && active)}
        activate={activateItem}
        clear={clearItem}
      />
    );
  });

  return (
    <ul
      className={`setHex${active ? " active" : ""}`}
      onMouseOver={() => activateSet(index)}
      onFocus={() => {}}
      onMouseLeave={() => clearSet()}
    >
      {items}
    </ul>
  );
};
