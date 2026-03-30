import express from 'express';
import { BlockchainSyncService } from '../services/blockchainSync.js';

const router = express.Router();
const syncService = new BlockchainSyncService();

// POST /api/sync/all - Sync all transactions from blockchain
router.post('/all', async (req, res) => {
  try {
    const result = await syncService.syncAllTransactions();
    res.json({
      success: true,
      message: 'Blockchain sync completed',
      data: result
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({
      success: false,
      message: 'Error syncing blockchain data',
      error: error.message
    });
  }
});

// POST /api/sync/transaction/:hash - Sync specific transaction
router.post('/transaction/:hash', async (req, res) => {
  try {
    const { hash } = req.params;
    const transaction = await syncService.syncTransactionByHash(hash);
    
    res.json({
      success: true,
      message: 'Transaction synced successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({
      success: false,
      message: 'Error syncing transaction',
      error: error.message
    });
  }
});

// POST /api/sync/start-listener - Start event listener
router.post('/start-listener', async (req, res) => {
  try {
    await syncService.startEventListener();
    res.json({
      success: true,
      message: 'Event listener started successfully'
    });
  } catch (error) {
    console.error('Error starting listener:', error);
    res.status(500).json({
      success: false,
      message: 'Error starting event listener',
      error: error.message
    });
  }
});

// POST /api/sync/stop-listener - Stop event listener
router.post('/stop-listener', (req, res) => {
  try {
    syncService.stopEventListener();
    res.json({
      success: true,
      message: 'Event listener stopped successfully'
    });
  } catch (error) {
    console.error('Error stopping listener:', error);
    res.status(500).json({
      success: false,
      message: 'Error stopping event listener',
      error: error.message
    });
  }
});

export default router;
