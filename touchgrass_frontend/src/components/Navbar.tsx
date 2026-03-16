"use client"

import Link from "next/link"

export default function Navbar() {

  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-black border-b border-gray-800">

      <h1 className="text-xl font-bold text-green-400">
        TouchGrass 🌱
      </h1>

      <div className="flex gap-6 text-gray-300">

        <Link href="/" className="hover:text-green-400">
          Home
        </Link>

        <Link href="/stake" className="hover:text-green-400">
          Stake
        </Link>

        <Link href="/proof" className="hover:text-green-400">
          Proof
        </Link>

        <Link href="/dashboard" className="hover:text-green-400">
          Dashboard
        </Link>

      </div>

    </nav>
  )
}