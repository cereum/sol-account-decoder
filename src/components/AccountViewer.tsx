import { useState } from "react";
import {HexViewer} from 'react-hexviewer-ts';
import { AccountInfo, PublicKey } from "@solana/web3.js";

export const AccountViewer = ({accountInfo}:{accountInfo:AccountInfo<Buffer> | null}) => {
    return( 
        <div>
            <HexViewer
                hex
                rowLength={64}
                setLength={4}
              >
                {accountInfo!.data.toString("hex")}
              </HexViewer>
        </div>
    );
}