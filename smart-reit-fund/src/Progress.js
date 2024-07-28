import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './Progress.css';

function Progress() {
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 各進捗バーの区切り (10 ETH, 100 ETH, 1000 ETH, ..., 10000000 ETH)
  const thresholds = [10, 100, 1000, 10000, 100000, 1000000, 10000000];

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

  // 進捗バーのデータを作成
  const progressBars = thresholds.map((threshold) => {
    const percentage = balance ? (Math.min(parseFloat(balance), threshold) / threshold) * 100 : 0;
    const achieved = parseFloat(balance) >= threshold;
    return { threshold, percentage, achieved };
  });

  // 現在の進捗に基づいて表示する目標を決定
  const currentTargetIndex = progressBars.findIndex(bar => !bar.achieved);
  const displayBars = progressBars.slice(0, currentTargetIndex + 1);

  return (
    <div className="progress-container">
      <div className="balance-info">
        <h3>本プロジェクトへの投資総額</h3>
        {loading ? (
          <p>読み込み中...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <>
            <p>コントラクトに集まった資産合計: {balance} ETH</p>
            {displayBars.map(({ threshold, percentage, achieved }, index) => (
              <div key={index} className="progress-bar-container">
                <p>目標: {threshold} ETH</p>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <p>総額: {percentage.toFixed(2)}%</p>
                {achieved && <p className="achievement-status">達成！</p>}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Progress;