import express from 'express';
import {
  getAllTransactions,
  getTransactionByHash,
  createTransaction,
  getTransactionsByAddress,
  searchTransactions,
  getTransactionStats,
  updateTransactionGif
} from '../controllers/transactionController.js';

const router = express.Router();

// GET /api/transactions - Get all transactions
router.get('/', getAllTransactions);

// GET /api/transactions/stats - Get transaction statistics
router.get('/stats', getTransactionStats);

// GET /api/transactions/search - Search transactions
router.get('/search', searchTransactions);

// GET /api/transactions/:hash - Get transaction by hash
router.get('/:hash', getTransactionByHash);

// POST /api/transactions - Create new transaction
router.post('/', createTransaction);

// PUT /api/transactions/:hash/gif - Update transaction GIF URL
router.put('/:hash/gif', updateTransactionGif);

// GET /api/transactions/address/:address - Get transactions by address
router.get('/address/:address', getTransactionsByAddress);

export default router;
