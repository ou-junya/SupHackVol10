import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './WalletContext';
import Layout from './Layout'; // レイアウトコンポーネントのインポート
import Home from './Home';
import Invest from './Invest';
import Portfolio from './Portfolio';
import Dividend from './Dividend';
import './App.css';

function App() {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invest" element={<Invest />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/dividend" element={<Dividend />} />
          </Routes>
        </Layout>
      </Router>
    </WalletProvider>
  );
}

export default App;