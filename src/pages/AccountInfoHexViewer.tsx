import { AccountInfo, PublicKey } from "@solana/web3.js";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AccountViewer } from "../components/AccountViewer";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle } from "react-loader-spinner";
import { Toast } from "../components/Toaster";
import { Container } from "../components/UI";
import { connectionContext } from "../contexts/connectionContext";

export const AccountInfoHexViewer = () => {
  const { accountPubkey } = useParams<{ accountPubkey: string }>();
  const { connection } = useContext(connectionContext);
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
    return (
      <Container>
        <AccountViewer accountInfo={accountInfo}></AccountViewer>{" "}
      </Container>
    );
  } else if (accountInfo === null) {
    return (
      <Container>
        <p style={{ textAlign: "center" }}>
          Whoops! We can't seem to find any information about this account.
        </p>
      </Container>
    );
  } else {
    return (
      <Container>
        <BallTriangle color="#ffba01" height={100} width={100} />{" "}
      </Container>
    );
  }
};
