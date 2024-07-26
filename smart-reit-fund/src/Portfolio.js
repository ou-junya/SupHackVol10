import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { WalletContext } from './WalletContext';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // チャートの自動インポート
import './Portfolio.css';

function Portfolio() {
  const { userAddress } = useContext(WalletContext);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!userAddress) return;

      const provider = new ethers.BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(userAddress);
      const etherBalance = ethers.formatEther(balance);

      // 他のトークンのバランスも取得する場合は、ここで処理を追加
      const tokenBalances = {
        'ETH': etherBalance,
        // 'DAI': daiBalance, // 例: DAIトークンのバランス
        // 'USDC': usdcBalance, // 例: USDCトークンのバランス
      };

      setBalances(tokenBalances);
      setLoading(false);
    };

    fetchBalances();
  }, [userAddress]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const data = {
    labels: Object.keys(balances),
    datasets: [
      {
        data: Object.values(balances).map(balance => parseFloat(balance)),
        backgroundColor: ['#f39c12', '#2980b9', '#27ae60'], // カスタムカラー
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="portfolio-container">
      <h2>ポートフォリオ</h2>
      <p>ウォレットアドレス: {userAddress}</p>
      <div className="chart-container">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default Portfolio;