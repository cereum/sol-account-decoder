import "../style/hex-viewer.scss";
import { HexViewer } from "../hexviewer";
import { AccountInfo } from "@solana/web3.js";
import { ThemeContext } from "../contexts/themeContext";
import { useContext } from "react";
export const AccountViewer = ({
  accountInfo,
}: {
  accountInfo: AccountInfo<Buffer> | null;
}) => {
  const isDark = useContext(ThemeContext);
  if(isDark){

  }
  return (
    <>
      <h2
        className="text-3xl font-extrabold text-gray-600"
        style={{ textAlign: "center" }}
      >
        Hex View of Account Info
      </h2>
      <div className="w-screen m-8">
        <div className={isDark?"hexviewerdark !important":"hexviewer !important"}> 
          <HexViewer hex rowLength={16} setLength={4}>
            {accountInfo!.data.toString("hex")}
          </HexViewer>
        </div>
      </div>
    </>
  );
};
