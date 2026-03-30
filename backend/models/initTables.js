import pool from '../config/database.js';

// Create tables if they don't exist
export const initializeTables = async () => {
  try {
    // Create transactions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        transaction_hash VARCHAR(66) UNIQUE NOT NULL,
        block_number BIGINT,
        from_address VARCHAR(42) NOT NULL,
        to_address VARCHAR(42) NOT NULL,
        amount DECIMAL(36, 18) NOT NULL,
        message TEXT,
        keyword VARCHAR(255),
        gif_url TEXT,
        timestamp TIMESTAMP NOT NULL,
        blockchain_timestamp BIGINT NOT NULL,
        status VARCHAR(20) DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_transactions_from_address ON transactions(from_address);
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_transactions_to_address ON transactions(to_address);
    `);
    
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_transactions_timestamp ON transactions(timestamp);
    `);

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database tables:', error);
    throw error;
  }
};
