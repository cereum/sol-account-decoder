import { useState } from "react";
import React from 'react';

import 'react-hexviewer-ts/scss/hex-viewer.scss';
import {HexViewer} from 'react-hexviewer-ts';
import { AccountInfo, PublicKey } from "@solana/web3.js";

export const AccountViewer = ({accountInfo}:{accountInfo:AccountInfo<Buffer> | null}) => {
    return( 
        <div>
          <h2>Hex View of Account Info</h2>
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