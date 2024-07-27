import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './Progress.css';

function Progress() {
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 不動産投資の目標金額（10 ETH）
  const targetAmount = ethers.parseEther("100");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Ethereumネットワークへの接続
        const provider = new ethers.BrowserProvider(window.ethereum);
        // コントラクトアドレスの指定
        const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        // バランスの取得
        const balance = await provider.getBalance(contractAddress);
        // バランスをETHに変換して設定
        setBalance(ethers.formatEther(balance));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setError("バランスの取得に失敗しました。後でもう一度お試しください。");
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  // 進捗率の計算
  const progress = balance ? (parseFloat(balance) / parseFloat(ethers.formatEther(targetAmount))) * 100 : 0;

  return (
    <div className="progress-container">
      <div className="balance-info">
        <h3>池田伏見ビルの不動産投資の進捗状況</h3>
        {loading ? (
          <p>読み込み中...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <p>コントラクトに集まった資産合計: {balance} ETH</p>
            <p>目標金額: {ethers.formatEther(targetAmount)} ETH</p>
            <p>進捗率: {progress.toFixed(2)}%</p>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Progress;