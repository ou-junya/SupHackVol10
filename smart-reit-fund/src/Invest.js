import React, { useState, useContext } from 'react';
import { WalletContext } from './WalletContext';
import { ethers } from 'ethers';
import './Invest.css';

function Invest() {
  const { userAddress, isConnected, connectWallet } = useContext(WalletContext);
  const [contractAddress, setContractAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const sendEtherToContract = async () => {
    if (!userAddress || !contractAddress || !amount) {
      setMessage("Please fill in all fields");
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const amountInEther = ethers.parseEther(amount);
      const gasEstimate = await signer.estimateGas({
        to: contractAddress,
        value: amountInEther
      });
      // 直接指定したアドレスにETHを送金する
      const tx = await signer.sendTransaction({
        to: contractAddress,
        value: amountInEther,
        gasLimit: gasEstimate
      });
      
      setMessage(`Transaction sent! Hash: ${tx.hash}`);
      await tx.wait();
      setMessage("Transaction confirmed!");
    } catch (error) {
      console.error("Transaction failed", error);
      setMessage("Transaction failed: " + error.message);
    }
  };

  return (
    <div className="invest-container">
      <p className="subtitle">ブロックチェーン技術によるスマートな不動産投資プラットフォーム<br/>RIETへの投資はこちらから。<br/>投資したETHと同量のRETトークンが返却されます。<br/>RETトークンの保有量に基づき配当が配布されます。</p>
      <button onClick={connectWallet}>Connect Wallet</button>
      {isConnected && <p>Connected with: {userAddress}</p>}
      <div>
        <input
          type="text"
          placeholder="コントラクトアドレス"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="投資したいETHの金額"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={sendEtherToContract}>Send Ether</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Invest;
