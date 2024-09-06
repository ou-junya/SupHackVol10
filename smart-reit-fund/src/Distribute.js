import React, { useState, useContext } from 'react';
import { WalletContext } from './WalletContext';
import { ethers } from 'ethers';
import './Invest.css';

function Distribute() {
  const { userAddress, isConnected, connectWallet } = useContext(WalletContext);
  const [contractAddress, setContractAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const sendEtherToContract = async () => {
    if (!userAddress || !contractAddress || !amount) {
      setMessage("すべての項目を入力してください");
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
      const tx = await signer.sendTransaction({
        to: contractAddress,
        value: amountInEther,
        gasLimit: gasEstimate
      });

      setMessage(`取引が送信されました！トランザクションハッシュ: ${tx.hash}`);
      await tx.wait();
      setMessage("取引が確認されました！");
    } catch (error) {
      console.error("取引に失敗しました", error);
      setMessage("取引に失敗しました: " + error.message);
    }
  };

  return (
    <div className="invest-container">
      <h1 className="page-title">Smart REIT Fund 配当分配</h1>
      <p className="subtitle">
        ファンド運営者向けの配当分配ページです。<br />
        こちらからETHを配当として送金し、保有者に自動的に分配されます。
      </p>
      <div className="steps">
        <h2>配当分配の流れ</h2>
        <ol>
          <li>MetaMaskを使ってウォレットを接続します。</li>
          <li>コントラクトアドレスと分配したいETHの金額を入力します。</li>
          <li>「配当を送信」ボタンを押して配当を実行します。</li>
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
          placeholder="分配したいETHの金額"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={sendEtherToContract}>配当を送信</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Distribute;
