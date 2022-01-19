import React, { FC, ReactNode, useEffect, useState } from "react";
import { Hex } from "./hex";

export interface HexViewerProps {
  /** number of bytes per row */
  rowLength?: number;
  /** number of bytes between a visible split */
  setLength?: number;
  /** Buffer | number[] | string as base64 or raw hex */
  children: string | Buffer | number[];
  /** sign that the data is hex */
  hex?: boolean;
  /** sign that the data is base64 */
  base64?: boolean;
  /** Component that will be displayed if there is no data */
  noData?: ReactNode;
  /** Component that will be displayed if data parsing is unsuccessful */
  errorData?: ReactNode;
}

export const HexViewer: FC<HexViewerProps> = (props) => {
  const {
    rowLength = 16,
    setLength = 4,
    children,
    base64,
    hex,
    noData,
    errorData,
  } = props;
  const [rows, setRows] = useState<number[][][]>([]);
  const [isErrorData, setIsErrorData] = useState(false);

  useEffect(() => {
    let isError = false;
    try {
      const newRows = [];
      let row = [];
      let set = [];
      let bufferData: number[] = [];
      let rawData: Buffer | number[] | undefined;
      if (hex) {
        rawData = Buffer.from(children as string, "hex");
      } else if (base64) {
        rawData = Buffer.from(children as string, "base64");
      } else {
        rawData = children as Buffer;
      }
      rawData = rawData || [];
      const bytes = rawData.length;
      if (Buffer.isBuffer(rawData)) {
        for (let i = 0; i < bytes; i += 1) {
          bufferData.push(rawData[i]);
        }
        if (typeof bufferData === "string") {
          bufferData = [];
          isError = true;
        }
      } else {
        bufferData = rawData;
      }
      for (let i = 0; i < bytes; i += rowLength) {
        const temparray = bufferData.slice(i, i + rowLength);
        for (let z = temparray.length; z < rowLength; z += 1) {
          temparray.push(-1);
        }
        row = [];
        for (let x = 0, k = temparray.length; x < k; x += setLength) {
          set = temparray.slice(x, x + setLength);
          for (let z = set.length; z < setLength; z += 1) {
            set.push(-1);
          }
          row.push(set);
        }
        newRows.push(row);
      }
      setRows(newRows);
    } catch (e) {
      isError = true;
      setRows([]);
    }
    setIsErrorData(isError);
  }, [children, base64, hex, rowLength, setLength]);
  return (
    <>
      {isErrorData && (errorData || <div>Error Data</div>)}
      {!rows.length && !isErrorData && (noData || <div>No Data</div>)}
      {!!rows.length && !isErrorData && <Hex rows={rows} bytesper={rowLength} />}
    </>
  );
};
