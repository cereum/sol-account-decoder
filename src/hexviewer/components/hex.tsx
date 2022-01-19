import React, { FC, useContext } from "react";
import { Row } from "./row";
import { ThemeContext } from "../../themeContext";
export const Hex: FC<{ rows: number[][][]; bytesper: number }> = (props) => {
  const { rows, bytesper } = props;
  const pad = "000000";
  const isDark = useContext(ThemeContext)
  const rowsNode = rows.map((row, i) => {
    let heading = `${i * bytesper}`;
    heading = pad.substring(0, pad.length - heading.length) + heading;
    const idx = i;
    return <Row key={`Row${idx}`} sets={row} heading={heading} />;
  });
  return (
    <div className={isDark?"hexviewerdark":"hexviewer"}>
      <div className="hex">{rowsNode}</div>
    </div>
  );
};
