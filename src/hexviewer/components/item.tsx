import React, { FC } from "react";

export const Item: FC<{
  byte: string;
  index: number;
  activate(idx: number): void;
  clear(): void;
  active: boolean;
}> = (props) => {
  const { activate, byte, index, active, clear } = props;

  function getClasses() {
    return (active ? "active" : "") + (byte === "--" ? " none" : "");
  }

  return (
    <li
      className={getClasses()}
      onMouseOver={() => activate(index)}
      onFocus={() => {}}
      onMouseLeave={clear}
    >
      {byte}
    </li>
  );
};
