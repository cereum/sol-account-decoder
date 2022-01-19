import React, { FC, useState } from "react";
import { Set } from "./set";

export const Row: FC<{ sets: number[][]; heading: string }> = (props) => {
  const { sets, heading } = props;
  const [activeSet, setActiveSet] = useState(-1);
  const [activeItem, setActiveItem] = useState(-1);

  function setActiveSetFn(set: number) {
    if (sets[set][0] === -1) return;
    setActiveSet(set);
  }

  function clearActiveSet() {
    setActiveSet(-1);
  }

  function clearActiveItem() {
    setActiveItem(-1);
  }

  const setsNode = sets.map((set: number[], i) => {
    const setIdx = i;
    return (
      <Set
        key={`set${setIdx}`}
        set={set}
        index={i}
        active={activeSet === i}
        activeItem={activeItem}
        activateSet={setActiveSetFn}
        clearSet={clearActiveSet}
        activateItem={(idx) => setActiveItem(idx)}
        clearItem={clearActiveItem}
      />
    );
  });

  const ascii = sets.map((set, setIndex) => {
    return set.map((byte, itemIndex, theSet) => {
      let char = "";
      if (byte === -1) {
        char = " ";
      } else if (byte > 31 && byte < 127) {
        char = String.fromCharCode(byte);
      } else {
        char = "·";
      }
      const itemSetIndex = itemIndex;
      return (
        <li
          key={`set${itemSetIndex}`}
          className={
            activeSet * theSet.length + activeItem ===
            setIndex * theSet.length + itemIndex
              ? "active"
              : ""
          }
        >
          {char}
        </li>
      );
    });
  });
  return (
    <div className="hex-row">
      <div className="heading">{heading}:</div>
      <div className="hex">{setsNode}</div>
      <div className="ascii">
        <ul className="setAscii">{ascii}</ul>
      </div>
    </div>
  );
};
