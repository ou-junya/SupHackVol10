import React, { createContext, useState } from 'react';
import { ethers } from 'ethers'; // ethersをインポート

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setUserAddress(address);
        setIsConnected(true);
      } catch (error) {
        console.error("Wallet connection failed", error);
      }
    } else {
      alert("MetaMaskがインストールされていません。");
    }
  };

  return (
    <WalletContext.Provider value={{ userAddress, isConnected, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};