import { AccountInfo, PublicKey } from "@solana/web3.js";
import { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountViewer } from "../components/AccountViewer";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { BallTriangle } from "react-loader-spinner";
import { Toast } from "../components/Toaster";
import { Container } from "../components/UI";
import { Network, useConnection } from "../contexts/ConnectionContext";

export const AccountInfoHexViewer = () => {
  const { accountPubkey, network: urlNetwork } =
    useParams<{ accountPubkey: string; network: Network }>();
  const { connection, network, setNetwork } = useConnection();
  const [accountInfo, setAccountInfo] = useState<AccountInfo<Buffer> | null>();
  const navigate = useNavigate();

  useEffect(() => {
    if (urlNetwork && urlNetwork !== network && !network) {
      setNetwork(urlNetwork);
      navigate(`/raw/${urlNetwork}/${accountPubkey}`);
    }
  }, [network, accountPubkey, navigate, setNetwork, urlNetwork]);

  useEffect(() => {
    if (urlNetwork !== network && network) {
      setNetwork(network);
      navigate(`/raw/${network}/${accountPubkey}`);
    }
  }, [network, accountPubkey, navigate, setNetwork, urlNetwork]);

  useMemo(async () => {
    try {
      if (connection) {
        const accountInfo = await connection.getAccountInfo(
          new PublicKey(accountPubkey!)
        );
        setAccountInfo(accountInfo);
      }
    } catch (error) {
      Toast.show({ intent: "danger", message: (error as any).toString() });
    }
  }, [accountPubkey, connection]);

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
