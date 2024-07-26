import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { WalletContext } from './WalletContext';
import './Home.css';

function Home() {
  const { userAddress, isConnected, connectWallet } = useContext(WalletContext);
  const navigate = useNavigate();

  const handleConnectWallet = async () => {
    await connectWallet();
    if (isConnected) {
      navigate('/invest');
    }
  };

  return (
    <div className="home-container">
      <section className="hero">
        <h1>未来の不動産投資をあなたに</h1>
        <p>Smart REIT Fundは、ブロックチェーン技術を利用して、不動産投資をより簡単に、安全に、そして透明性のあるものにします。</p>
      </section>
      
      <section className="features">
        <h2>本サービスの特徴</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>簡単な操作</h3>
            <p>初心者でも安心して利用できるシンプルなインターフェース。</p>
          </div>
          <div className="feature">
            <h3>安全な取引</h3>
            <p>ブロックチェーン技術であなたの投資を保護します。</p>
          </div>
          <div className="feature">
            <h3>透明性の確保</h3>
            <p>全ての取引履歴をブロックチェーンに記録し、透明性を確保します。</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>今すぐ始めましょう</h2>
        <p>未来の不動産投資を今すぐ体験しましょう。簡単なウォレット接続で始められます。</p>
        <button className="cta-button" onClick={handleConnectWallet}>
          {isConnected ? `Connected: ${userAddress}` : "ウォレットを接続"}
        </button>
      </section>
    </div>

  );
}

export default Home;