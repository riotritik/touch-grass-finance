"use client";

import { useState } from "react";
import api from "../../src/lib/api";
import { useWalletStore } from "../../src/store/walletStore";
import { useWallet } from "../../src/hooks/useWallet";

export default function StakePage() {

  useWallet();

  const { walletAddress } = useWalletStore();

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleStake = async () => {

    if (!walletAddress) {
      alert("Connect wallet first");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {

      await api.post("/api/stake/create", {
        wallet_address: walletAddress,
        amount: amount,
        tx_hash: "0x" + Math.random().toString(16).slice(2)
      });

      setMessage("Stake successful 🌱");

    } catch (err) {

      console.error(err);
      setMessage("Stake failed");

    }

  };

  return (

    <main className="min-h-screen bg-[#0B0F1A] text-white flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold mb-8">
        Stake Crypto 🌱
      </h1>

      <input
        type="number"
        placeholder="Amount to stake"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="bg-gray-800 text-white placeholder-gray-400 px-4 py-3 rounded-lg mb-4 w-64 border border-gray-600 focus:outline-none focus:border-green-400"
      />

      <button
        onClick={handleStake}
        className="px-6 py-3 bg-[#00FFD1] text-black rounded-xl"
      >
        Stake
      </button>

      {message && (
        <p className="mt-4">{message}</p>
      )}

    </main>
  );
}