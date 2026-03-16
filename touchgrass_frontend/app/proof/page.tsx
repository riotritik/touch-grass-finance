"use client";

import { useState } from "react";
import api from "../../src/lib/api";
import { useWallet } from "../../src/hooks/useWallet";

export default function ProofPage() {

  const { walletAddress } = useWallet();

  const [photo, setPhoto] = useState<File | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const captureLocation = () => {

    navigator.geolocation.getCurrentPosition((pos) => {

      setLat(pos.coords.latitude);
      setLon(pos.coords.longitude);

      setMessage("GPS captured ✅");

    });

  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files?.[0];

    if (file) {
      setPhoto(file);
      setMessage(`Selected: ${file.name}`);
    }

  };

  const uploadProof = async () => {

    if (!walletAddress) {
      alert("Connect wallet first");
      return;
    }

    if (!photo) {
      setMessage("Please select a photo first");
      return;
    }

    if (lat === null || lon === null) {
      setMessage("Capture GPS first");
      return;
    }

    const formData = new FormData();

    formData.append("wallet_address", walletAddress);
    formData.append("latitude", lat.toString());
    formData.append("longitude", lon.toString());
    formData.append("photo", photo);

    try {

      await api.post("/api/proofs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Proof submitted 🌱");

    } catch (err: any) {

      console.error(err);

      if (err.response) {
        setMessage(err.response.data.error || "Upload failed");
      } else {
        setMessage("Upload failed");
      }

    }

  };

  return (

    <main className="h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-4xl mb-6">
        Touch Grass 🌱
      </h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button
        onClick={captureLocation}
        className="bg-blue-600 px-4 py-2 rounded mb-4"
      >
        Capture GPS
      </button>

      <button
        onClick={uploadProof}
        className="bg-green-600 px-6 py-3 rounded"
      >
        Upload Proof
      </button>

      {message && (
        <p className="mt-4 text-gray-300">{message}</p>
      )}

    </main>

  );

}