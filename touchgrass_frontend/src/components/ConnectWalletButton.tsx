"use client";

import { useWallet } from "../hooks/useWallet";

export default function ConnectWalletButton() {

  const { walletAddress, connectWallet } = useWallet();

  return (

    <button
      onClick={connectWallet}
      className="px-6 py-3 bg-[#00FFD1] text-black rounded-xl font-bold"
    >
      {walletAddress ? "Wallet Connected" : "Connect Wallet"}
    </button>

  );
}