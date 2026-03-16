"use client";

import ConnectWalletButton from "../src/components/ConnectWalletButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F1A] text-white flex flex-col items-center justify-center">

      <h1 className="text-5xl font-bold mb-6">
        TouchGrass Finance 🌱
      </h1>

      <p className="mb-8 text-gray-400">
        Stake crypto. Touch grass. Unlock yield.
      </p>

      <ConnectWalletButton />

    </main>
  );
}