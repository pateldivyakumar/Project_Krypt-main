import React from 'react';

const App = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a2e', 
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navigation */}
      <nav style={{ 
        width: '100%', 
        padding: '20px', 
        backgroundColor: '#16213e',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          🚀 Quantum Transfer
        </h1>
      </nav>

      {/* Main Content */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Send Crypto across the world
          </h2>
          <p style={{ fontSize: '20px', marginBottom: '30px', color: '#ccc' }}>
            Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
          </p>
          <button style={{
            backgroundColor: '#667eea',
            color: 'white',
            padding: '15px 30px',
            fontSize: '18px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Status Info */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        backgroundColor: '#0f3460',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <div>✅ React App: Loaded</div>
        <div>✅ Vite: Running</div>
        <div>✅ Server: Active</div>
      </div>
    </div>
  );
};

export default App;
