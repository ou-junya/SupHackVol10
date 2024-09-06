import React, { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { WalletContext } from './WalletContext';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // チャートの自動インポート
import './Portfolio.css';

const RET_CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // RETトークンのコントラクトアドレス
const RET_ABI = [
  // RETトークンのABI（ERC-20標準ABIのbalanceOfとdecimalsを含む）
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)"
];

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

      // RETトークンのバランスを取得
      const retContract = new ethers.Contract(RET_CONTRACT_ADDRESS, RET_ABI, provider);
      const retBalanceRaw = await retContract.balanceOf(userAddress);
      const decimals = await retContract.decimals();
      const retBalance = ethers.formatUnits(retBalanceRaw, decimals); // 小数点を考慮
      
      // 他のトークンのバランスも取得する場合は、ここで処理を追加
      const tokenBalances = {
        'ETH': etherBalance,
        'RET': retBalance,
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
        label: 'Token Balances',
        data: Object.values(balances).map(balance => parseFloat(balance)),
        backgroundColor: ['#f39c12', '#2980b9', '#27ae60'], // カスタムカラー
        borderRadius: 10, // バーの角を丸める
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // 幅の自動調整を有効にする
    scales: {
      y: {
        type: 'logarithmic', // Y軸をログスケールに変更
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            if (value === 10 || value === 100 || value === 1000 || value === 10000) {
              return value; // ログスケールの表示値を制限
            }
            return null;
          },
        },
        title: {
          display: true,
          text: 'Token Balance (Log Scale)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(context) {
            const value = context.raw;
            return `Balance: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="portfolio-container">
      <h2>ポートフォリオ</h2>
      <p>ウォレットアドレス: {userAddress}</p>
      <div className="chart-container" style={{ width: '80%', height: '400px', margin: '0 auto' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Portfolio;
