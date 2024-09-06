import React from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="container">
      <header className="header">
        <Link to="/">
          <img src="/service-logo.png" alt="Smart REIT Fund" className="service-logo" />
        </Link>
        <nav className="nav-menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/invest">投資</Link></li>
            <li><Link to="/distribute">配当支払い</Link></li>
            <li><Link to="/portfolio">ポートフォリオ</Link></li>
            <li><Link to="/progress">投資総額</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <img src="/team-logo.png" alt="Blockchain Masters" className="team-logo" />
        <p>&copy; 2024 Blockchain Masters. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Layout;