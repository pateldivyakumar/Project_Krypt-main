import pool from '../config/database.js';

export class TransactionModel {
  // Create a new transaction record
  static async create(transactionData) {
    const {
      transactionHash,
      blockNumber,
      fromAddress,
      toAddress,
      amount,
      message,
      keyword,
      gifUrl,
      timestamp,
      blockchainTimestamp
    } = transactionData;

    try {
      const query = `
        INSERT INTO transactions (
          transaction_hash, block_number, from_address, to_address, 
          amount, message, keyword, gif_url, timestamp, blockchain_timestamp
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
      `;
      
      const values = [
        transactionHash, blockNumber, fromAddress, toAddress,
        amount, message, keyword, gifUrl, timestamp, blockchainTimestamp
      ];

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') {
        // Unique constraint violation (transaction already exists)
        return await this.getByHash(transactionHash);
      }
      throw error;
    }
  }

  // Get transaction by hash
  static async getByHash(transactionHash) {
    try {
      const query = 'SELECT * FROM transactions WHERE transaction_hash = $1';
      const result = await pool.query(query, [transactionHash]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get all transactions with pagination
  static async getAll(limit = 20, offset = 0) {
    try {
      const query = `
        SELECT * FROM transactions 
        ORDER BY timestamp DESC 
        LIMIT $1 OFFSET $2
      `;
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get transactions by address (sent or received)
  static async getByAddress(address, limit = 20, offset = 0) {
    try {
      const query = `
        SELECT * FROM transactions 
        WHERE from_address = $1 OR to_address = $1
        ORDER BY timestamp DESC 
        LIMIT $2 OFFSET $3
      `;
      const result = await pool.query(query, [address, limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get transactions sent from an address
  static async getSentByAddress(address, limit = 20, offset = 0) {
    try {
      const query = `
        SELECT * FROM transactions 
        WHERE from_address = $1
        ORDER BY timestamp DESC 
        LIMIT $2 OFFSET $3
      `;
      const result = await pool.query(query, [address, limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get transactions received by an address
  static async getReceivedByAddress(address, limit = 20, offset = 0) {
    try {
      const query = `
        SELECT * FROM transactions 
        WHERE to_address = $1
        ORDER BY timestamp DESC 
        LIMIT $2 OFFSET $3
      `;
      const result = await pool.query(query, [address, limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Search transactions by keyword or message
  static async search(searchTerm, limit = 20, offset = 0) {
    try {
      const query = `
        SELECT * FROM transactions 
        WHERE message ILIKE $1 OR keyword ILIKE $1
        ORDER BY timestamp DESC 
        LIMIT $2 OFFSET $3
      `;
      const result = await pool.query(query, [`%${searchTerm}%`, limit, offset]);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  // Get transaction statistics
  static async getStats() {
    try {
      const query = `
        SELECT 
          COUNT(*) as total_transactions,
          SUM(amount) as total_volume,
          AVG(amount) as average_amount,
          COUNT(DISTINCT from_address) as unique_senders,
          COUNT(DISTINCT to_address) as unique_receivers
        FROM transactions
      `;
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update GIF URL for a transaction
  static async updateGifUrl(transactionHash, gifUrl) {
    try {
      const query = `
        UPDATE transactions 
        SET gif_url = $1, updated_at = CURRENT_TIMESTAMP
        WHERE transaction_hash = $2
        RETURNING *
      `;
      const result = await pool.query(query, [gifUrl, transactionHash]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
