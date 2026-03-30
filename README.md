<h1 align="center">Quantum Transfer - Web-3.0-Blockchain-Application</h1>

### Description

Quantum Transfer is a `Web3.0 blockchain application` that enables users to send transactions over the blockchain, with each transaction being permanently recorded on the blockchain. **Now enhanced with PostgreSQL database integration for faster queries and better user experience.**

### Main Functionalities:

- Users can connect their MetaMask wallets to send ethereum through the blockchain.
- Each transaction will be paired with a gif and it will be forever stored on the blockchain.
- Users can access and view their latest transactions (and the gifs associated with them).
- **NEW: PostgreSQL database integration for faster transaction history and advanced search**
- **NEW: User profiles and statistics tracking**
- **NEW: Real-time blockchain event listening and automatic database sync**

### Getting Started

To get a local copy up and running follow these simple example steps.

#### Prerequisites

- Node.js 16+
- PostgreSQL 12+
- MetaMask browser extension

#### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/prejin2310/Quantum-Transfer---Web-3.0-Blockchain-Application.git
   ```

2. **Setup Database (Important!)**

   - Install PostgreSQL and create a database named `quantum_transfer_db`
   - See detailed setup instructions in `DATABASE_SETUP.md`

3. **Backend Setup**

   ```sh
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run init-db  # Initialize database tables
   npm run dev      # Start backend server
   ```

4. **Frontend Setup**

   ```sh
   cd client
   npm install
   cp .env.example .env
   # Edit .env with API URLs
   npm run dev      # Start frontend
   ```

5. **Sync Existing Data**
   ```sh
   # After both servers are running, sync blockchain data
   curl -X POST http://localhost:5000/api/sync/all
   ```

### Built With

- [Vite.js (react)](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Solidity](https://soliditylang.org/)
- [Giphy API](https://developers.giphy.com/)
- [Vercel](https://vercel.com/)
- **[PostgreSQL](https://www.postgresql.org/) - Database**
- **[Express.js](https://expressjs.com/) - Backend API**
- **[Node.js](https://nodejs.org/) - Runtime**

### Project Structure

```
├── client/          # React frontend
├── backend/         # Express.js API server
├── smart_contract/  # Solidity contracts
└── DATABASE_SETUP.md # Database setup guide
```
