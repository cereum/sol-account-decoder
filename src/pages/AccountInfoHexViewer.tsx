import { useSolana } from "@saberhq/use-solana";
import { AccountInfo, PublicKey } from "@solana/web3.js";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AccountViewer } from "../components/AccountViewer";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle } from "react-loader-spinner";
import { Toast } from "../components/Toaster";

export const AccountInfoHexViewer = () => {
  const { accountPubkey } = useParams<{ accountPubkey: string }>();
  const { connection } = useSolana();
  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer> | null>();

  const getAccountInfo = async () => {
    try {
      const accountInfo = await connection.getAccountInfo(
        new PublicKey(accountPubkey!)
      );
      setAccountInfo(accountInfo);
    } catch (error) {
      Toast.show({ intent: "danger", message: (error as any).toString() });
    }
  };

  useEffect(() => {
    if (accountPubkey) {
      getAccountInfo();
    }
  });

  if (accountInfo) {
    return <AccountViewer accountInfo={accountInfo}></AccountViewer>;
  } else if (accountInfo === null) {
    return (
      <div>
        <p style={{ textAlign: "center" }}>
          Whoops! We can't seem to find any information about this account.
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <BallTriangle color="#ffba01" height={100} width={100} />{" "}
      </div>
    );
  }
};
