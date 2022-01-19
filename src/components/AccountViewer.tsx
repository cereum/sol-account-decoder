import "react-hexviewer-ts/scss/hex-viewer.scss";
import { HexViewer } from "react-hexviewer-ts";
import { AccountInfo } from "@solana/web3.js";

export const AccountViewer = ({
  accountInfo,
}: {
  accountInfo: AccountInfo<Buffer> | null;
}) => {
  return (
    <>
      <h2
        className="text-3xl font-extrabold text-gray-600"
        style={{ textAlign: "center" }}
      >
        Hex View of Account Info
      </h2>
      <div className="w-screen m-8">
        <div>
          <HexViewer hex rowLength={16} setLength={4}>
            {accountInfo!.data.toString("hex")}
          </HexViewer>
        </div>
      </div>
    </>
  );
};
