import { TransactionModel } from '../models/Transaction.js';

// Get all transactions
export const getAllTransactions = async (req, res) => {
  try {
    const { limit = 20, offset = 0, address } = req.query;
    
    let transactions;
    if (address) {
      transactions = await TransactionModel.getByAddress(address, parseInt(limit), parseInt(offset));
    } else {
      transactions = await TransactionModel.getAll(parseInt(limit), parseInt(offset));
    }

    res.json({
      success: true,
      data: transactions,
      count: transactions.length
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message
    });
  }
};

// Get transaction by hash
export const getTransactionByHash = async (req, res) => {
  try {
    const { hash } = req.params;
    const transaction = await TransactionModel.getByHash(hash);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transaction',
      error: error.message
    });
  }
};

// Create new transaction
export const createTransaction = async (req, res) => {
  try {
    const transactionData = req.body;
    
    // Validate required fields
    const requiredFields = ['transactionHash', 'fromAddress', 'toAddress', 'amount', 'timestamp', 'blockchainTimestamp'];
    for (const field of requiredFields) {
      if (!transactionData[field]) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`
        });
      }
    }

    const transaction = await TransactionModel.create(transactionData);

    // Update user statistics
    await UserModel.updateStats(transactionData.fromAddress, {
      amount: transactionData.amount,
      isReceived: false
    });

    await UserModel.updateStats(transactionData.toAddress, {
      amount: transactionData.amount,
      isReceived: true
    });

    res.status(201).json({
      success: true,
      data: transaction,
      message: 'Transaction saved successfully'
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving transaction',
      error: error.message
    });
  }
};

// Get transactions by address
export const getTransactionsByAddress = async (req, res) => {
  try {
    const { address } = req.params;
    const { type = 'all', limit = 20, offset = 0 } = req.query;
    
    let transactions;
    switch (type) {
      case 'sent':
        transactions = await TransactionModel.getSentByAddress(address, parseInt(limit), parseInt(offset));
        break;
      case 'received':
        transactions = await TransactionModel.getReceivedByAddress(address, parseInt(limit), parseInt(offset));
        break;
      default:
        transactions = await TransactionModel.getByAddress(address, parseInt(limit), parseInt(offset));
    }

    res.json({
      success: true,
      data: transactions,
      count: transactions.length
    });
  } catch (error) {
    console.error('Error fetching transactions by address:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message
    });
  }
};

// Search transactions
export const searchTransactions = async (req, res) => {
  try {
    const { q: searchTerm, limit = 20, offset = 0 } = req.query;
    
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Search term is required'
      });
    }

    const transactions = await TransactionModel.search(searchTerm, parseInt(limit), parseInt(offset));

    res.json({
      success: true,
      data: transactions,
      count: transactions.length,
      searchTerm
    });
  } catch (error) {
    console.error('Error searching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching transactions',
      error: error.message
    });
  }
};

// Get transaction statistics
export const getTransactionStats = async (req, res) => {
  try {
    const stats = await TransactionModel.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching transaction stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

// Update transaction GIF URL
export const updateTransactionGif = async (req, res) => {
  try {
    const { hash } = req.params;
    const { gifUrl } = req.body;
    
    if (!gifUrl) {
      return res.status(400).json({
        success: false,
        message: 'GIF URL is required'
      });
    }

    const transaction = await TransactionModel.updateGifUrl(hash, gifUrl);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction,
      message: 'GIF URL updated successfully'
    });
  } catch (error) {
    console.error('Error updating transaction GIF:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating transaction',
      error: error.message
    });
  }
};
