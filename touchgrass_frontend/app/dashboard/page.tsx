"use client";

import { useEffect, useState } from "react";
import api from "../../src/lib/api";
import { useWallet } from "../../src/hooks/useWallet";
import IslandScene from "../../src/three/IslandScene";

function formatToken(value: string) {

  const num = Number(value);

  if (isNaN(num)) return "0";

  if (num < 0.000001) {
    return num.toExponential(2);
  }

  return num.toLocaleString(undefined, {
    maximumFractionDigits: 6
  });
}

export default function Dashboard() {

  const { walletAddress } = useWallet();
  const [data, setData] = useState<any>(null);

  useEffect(() => {

    if (!walletAddress) return;

    const loadDashboard = async () => {

      try {

        const res = await api.get(
          `/api/dashboard?wallet_address=${walletAddress}`
        );

        setData(res.data);

      } catch (err) {

        console.error(err);

      }

    };

    loadDashboard();

  }, [walletAddress]);

  if (!walletAddress) {
    return (
      <main className="h-screen flex items-center justify-center text-white">
        Connect wallet first
      </main>
    );
  }

  if (!data) {
    return (
      <main className="h-screen flex items-center justify-center text-white">
        Loading dashboard...
      </main>
    );
  }

  return (

    <main className="min-h-screen bg-black text-white flex flex-col items-center py-16">

      <h1 className="text-4xl mb-10">
        TouchGrass Dashboard 🌱
      </h1>

      {/* 3D Island */}
      <div className="w-full max-w-3xl h-96 mb-12">
        <IslandScene streak={data.streak} />
      </div>

      <div className="grid grid-cols-2 gap-8 text-center">

        <div className="bg-gray-900 p-6 rounded-xl w-56 shadow-lg">
          <p className="text-gray-400 mb-1">Stake</p>
          <p className="text-2xl font-bold">
            {formatToken(data.stake_amount)}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl w-56 shadow-lg">
          <p className="text-gray-400 mb-1">Daily Yield</p>
          <p className="text-2xl font-bold text-green-400">
            {formatToken(data.daily_yield)}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl w-56 shadow-lg">
          <p className="text-gray-400 mb-1">Streak</p>
          <p className="text-2xl font-bold">
            {data.streak}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl w-56 shadow-lg">
          <p className="text-gray-400 mb-1">Today's Proof</p>
          <p className="text-2xl font-bold">
            {data.today_proof_status ? "✅ Verified" : "❌ Missing"}
          </p>
        </div>

      </div>

    </main>
  );
}