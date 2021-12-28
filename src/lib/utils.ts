import { Provider } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID } from "./constants";
import {
  createTokenAccount,
  getTokenAccount,
  parseTokenAccount,
} from "@project-serum/common";

export const isDevEnv = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const getWalletTokenAccounts = async (
  walletPublicKey: PublicKey,
  provider: Provider
) => {
  return (
    await provider.connection.getTokenAccountsByOwner(walletPublicKey, {
      programId: TOKEN_PROGRAM_ID,
    })
  ).value.map((x) => {
    const tokenAccount = parseTokenAccount(x.account.data);
    tokenAccount.address = x.pubkey;
    return tokenAccount;
  });
};

export async function getATA(
  owner: PublicKey,
  mint: PublicKey,
  provider: Provider,
  minbalance?: number
) {
  try {
    const walletAccount = (
      await getWalletTokenAccounts(owner, provider)
    ).filter((x) => {
      return (
        x.mint.toString() === mint.toString() &&
        Number(x.amount) >= (minbalance ? minbalance : 0)
      );
    })[0].address;
    console.log("got Account!: " + walletAccount);
    return walletAccount;
  } catch (error) {
    //unable to find a wallet account
    console.log(error);
  }

  const PDA = (
    await PublicKey.findProgramAddress(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )
  )[0];

  try {
    await getTokenAccount(provider, PDA);
    console.log("got Derived Account!: " + PDA);
    return PDA;
  } catch (error) {
    console.log(error);
    const newAccount = await createTokenAccount(
      provider,
      mint,
      provider.wallet.publicKey
    );
    console.log("Created Account!: " + newAccount);
    return newAccount;
  }
}
