import { useWalletStore } from "../store/walletStore";
import api from "../services/api";
import { useEffect } from "react";

export const useWallet = () => {

  const { walletAddress, setWallet } = useWalletStore();

  useEffect(() => {

    const autoConnect = async () => {

      if ((window as any).starknet) {

        const starknet = (window as any).starknet;

        try {

          await starknet.enable({ showModal: false });

          const address = starknet.selectedAddress;

          if (address) {
            setWallet(address);
          }

        } catch (err) {
          console.log("Wallet not yet authorized");
        }

      }

    };

    if (!walletAddress) {
      autoConnect();
    }

  }, [walletAddress, setWallet]);

  const connectWallet = async () => {

    if ((window as any).starknet) {

      const starknet = (window as any).starknet;

      await starknet.enable();

      const address = starknet.selectedAddress;

      setWallet(address);

      await api.post("/api/auth/connect-wallet", {
        wallet_address: address
      });

    } else {
      alert("Install ArgentX or Braavos wallet");
    }
  };

  return {
    walletAddress,
    connectWallet
  };

};