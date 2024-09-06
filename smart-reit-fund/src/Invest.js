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
      <h1 className="page-title">Smart REIT Fund</h1>
      <p className="subtitle">ブロックチェーン技術によるスマートな不動産投資プラットフォーム</p>
      <p className="description">
        ブロックチェーン技術を使った不動産投資プラットフォームへようこそ！<br/>
        このページでは、ETHを投資することで同量のRETトークンが返却されます。<br/>
        RETトークンの保有量に基づいて、配当が定期的に配布されます。
      </p>
      <div className="steps">
        <h2>投資の流れ</h2>
        <ol>
          <li>MetaMaskを使ってウォレットを接続します。</li>
          <li>コントラクトアドレスと投資するETHの金額を入力します。</li>
          <li>「REITに投資する」ボタンを押して投資を実行します。</li>
        </ol>
      </div>
      <button className="cta-button" onClick={connectWallet}>
          {isConnected ? `接続したウォレットのアドレス: ${userAddress}` : "ウォレットを接続"}
        </button>
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
      <button onClick={sendEtherToContract}>REITに投資する</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Invest;
