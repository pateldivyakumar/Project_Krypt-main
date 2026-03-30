import { BlockchainSyncService } from '../services/blockchainSync.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function syncBlockchainTransactions() {
  try {
    console.log('🔄 Starting blockchain sync process...');
    
    const syncService = new BlockchainSyncService();
    const result = await syncService.syncAllTransactions();
    
    console.log('✅ Sync completed successfully!');
    console.log(`📊 Results:`, result);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

// Run the sync
syncBlockchainTransactions();