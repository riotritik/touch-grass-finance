import { create } from "zustand";

interface WalletState {
  walletAddress: string | null
  setWallet: (address: string) => void
}

export const useWalletStore = create<WalletState>((set) => ({
  walletAddress: null,

  setWallet: (address) =>
    set({
      walletAddress: address
    })
}));