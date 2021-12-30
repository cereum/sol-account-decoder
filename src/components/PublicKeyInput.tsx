import { useState } from "react";
import {PublicKey } from "@solana/web3.js";

export const PublicKeyInput = ({setPublicKey}:{setPublicKey:Function}) => {
    const [publicKey, setPublicKey] = useState<PublicKey| null>();

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        try{
            const publicKey = new PublicKey(event.target.value);
            setPublicKey(publicKey)
        } catch(error){
            console.log("Invalid Public Key")
        }

    }
    return( 
        <div>
            <h2
                className="text-3xl font-extrabold text-gray-600"
                style={{ textAlign: "center" }}
            >
                Enter Account Address
            </h2>
            <input
                type="text"
                onChange={handleInput}
                placeholder="Address"
                className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
        </div>
    );
}