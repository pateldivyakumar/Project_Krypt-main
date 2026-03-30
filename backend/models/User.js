const pool = require('../config/database');const pool = require('../config/database');const pool = require('../config/database');



class User {

  static async create({ name, email, password }) {

    const query = `class User {class User {

      INSERT INTO users (name, email, password, created_at, updated_at)

      VALUES ($1, $2, $3, NOW(), NOW())  // Create new user  // Create new user

      RETURNING id

    `;  static async create({ name, email, password }) {  static async create({ name, email, password }) {

    const values = [name, email, password];

        const query = `    const query = `

    try {

      const result = await pool.query(query, values);      INSERT INTO users (name, email, password, created_at, updated_at)      INSERT INTO users (name, email, password, created_at, updated_at)

      return result.rows[0].id;

    } catch (error) {      VALUES ($1, $2, $3, NOW(), NOW())      VALUES ($1, $2, $3, NOW(), NOW())

      console.error('Error creating user:', error);

      throw error;      RETURNING id      RETURNING id

    }

  }    `;    `;



  static async findByEmail(email) {    const values = [name, email, password];    const values = [name, email, password]; 

    const query = 'SELECT * FROM users WHERE email = $1';

        

    try {

      const result = await pool.query(query, [email]);    try {    const values = [name, email, password];      walletAddress, 

      return result.rows[0];

    } catch (error) {      const result = await pool.query(query, values);

      console.error('Error finding user by email:', error);

      throw error;      return result.rows[0].id;          google_id, 

    }

  }    } catch (error) {



  static async findById(id) {      console.error('Error creating user:', error);    try {      profile_picture,

    const query = 'SELECT * FROM users WHERE id = $1';

          throw error;

    try {

      const result = await pool.query(query, [id]);    }      const result = await pool.query(query, values);      loginType = 'traditional',

      return result.rows[0];

    } catch (error) {  }

      console.error('Error finding user by ID:', error);

      throw error;      return result.rows[0].id;      login_type 

    }

  }  // Find user by email



  static async getAll() {  static async findByEmail(email) {    } catch (error) {    } = userData;

    const query = `

      SELECT id, name, email, created_at, updated_at     const query = 'SELECT * FROM users WHERE email = $1';

      FROM users 

      ORDER BY created_at DESC          console.error('Error creating user:', error);

    `;

        try {

    try {

      const result = await pool.query(query);      const result = await pool.query(query, [email]);      throw error;    try {

      return result.rows;

    } catch (error) {      return result.rows[0];

      console.error('Error getting all users:', error);

      throw error;    } catch (error) {    }      const query = `

    }

  }      console.error('Error finding user by email:', error);



  static async update(id, { name, email }) {      throw error;  }        INSERT INTO users (full_name, email, password, wallet_address, google_id, profile_picture, login_type)

    const query = `

      UPDATE users     }

      SET name = $1, email = $2, updated_at = NOW()

      WHERE id = $3  }        VALUES ($1, $2, $3, $4, $5, $6, $7)

      RETURNING id

    `;

    const values = [name, email, id];

      // Find user by ID  // Find user by email        RETURNING id, full_name, email, wallet_address, google_id, profile_picture, login_type, created_at, updated_at

    try {

      const result = await pool.query(query, values);  static async findById(id) {

      return result.rows[0];

    } catch (error) {    const query = 'SELECT * FROM users WHERE id = $1';  static async findByEmail(email) {      `;

      console.error('Error updating user:', error);

      throw error;    

    }

  }    try {    const query = 'SELECT * FROM users WHERE email = $1';      



  static async delete(id) {      const result = await pool.query(query, [id]);

    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';

          return result.rows[0];          const name = fullName || full_name;

    try {

      const result = await pool.query(query, [id]);    } catch (error) {

      return result.rows[0];

    } catch (error) {      console.error('Error finding user by ID:', error);    try {      const type = loginType || login_type;

      console.error('Error deleting user:', error);

      throw error;      throw error;

    }

  }    }      const result = await pool.query(query, [email]);      const values = [name, email, password, walletAddress, google_id, profile_picture, type];

}

  }

module.exports = User;
      return result.rows[0];      const result = await pool.query(query, values);

  // Get all users

  static async getAll() {    } catch (error) {      return result.rows[0];

    const query = `

      SELECT id, name, email, created_at, updated_at       console.error('Error finding user by email:', error);    } catch (error) {

      FROM users 

      ORDER BY created_at DESC      throw error;      throw error;

    `;

        }    }

    try {

      const result = await pool.query(query);  }  };

      return result.rows;

    } catch (error) {

      console.error('Error getting all users:', error);

      throw error;  // Find user by ID  // Find user by email

    }

  }  static async findById(id) {  static async findByEmail(email) {



  // Update user    const query = 'SELECT * FROM users WHERE id = $1';    try {

  static async update(id, { name, email }) {

    const query = `          const query = 'SELECT * FROM users WHERE email = $1';

      UPDATE users 

      SET name = $1, email = $2, updated_at = NOW()    try {      const result = await pool.query(query, [email]);

      WHERE id = $3

      RETURNING id      const result = await pool.query(query, [id]);      return result.rows[0];

    `;

    const values = [name, email, id];      return result.rows[0];    } catch (error) {

    

    try {    } catch (error) {      throw error;

      const result = await pool.query(query, values);

      return result.rows[0];      console.error('Error finding user by ID:', error);    }

    } catch (error) {

      console.error('Error updating user:', error);      throw error;  }

      throw error;

    }    }

  }

  }  // Find user by ID

  // Delete user

  static async delete(id) {  static async findById(id) {

    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';

      // Get all users    try {

    try {

      const result = await pool.query(query, [id]);  static async getAll() {      const query = 'SELECT id, full_name, email, wallet_address, google_id, profile_picture, login_type, created_at, updated_at FROM users WHERE id = $1';

      return result.rows[0];

    } catch (error) {    const query = `      const result = await pool.query(query, [id]);

      console.error('Error deleting user:', error);

      throw error;      SELECT id, name, email, created_at, updated_at       return result.rows[0];

    }

  }      FROM users     } catch (error) {



  // Get user's transactions      ORDER BY created_at DESC      throw error;

  static async getTransactions(userId) {

    const query = `    `;    }

      SELECT t.*, u.name as sender_name

      FROM transactions t      }

      LEFT JOIN users u ON t.from_address = u.wallet_address

      WHERE t.from_address = (SELECT wallet_address FROM users WHERE id = $1)    try {

         OR t.to_address = (SELECT wallet_address FROM users WHERE id = $1)

      ORDER BY t.timestamp DESC      const result = await pool.query(query);  // Update user

    `;

          return result.rows;  static async update(id, updateData) {

    try {

      const result = await pool.query(query, [userId]);    } catch (error) {    try {

      return result.rows;

    } catch (error) {      console.error('Error getting all users:', error);      const fields = [];

      console.error('Error getting user transactions:', error);

      throw error;      throw error;      const values = [];

    }

  }    }      let paramCounter = 1;



  // Update user's wallet address  }

  static async updateWalletAddress(id, walletAddress) {

    const query = `      Object.keys(updateData).forEach(key => {

      UPDATE users 

      SET wallet_address = $1, updated_at = NOW()  // Update user        if (updateData[key] !== undefined) {

      WHERE id = $2

      RETURNING id  static async update(id, { name, email }) {          fields.push(`${key} = $${paramCounter}`);

    `;

        const query = `          values.push(updateData[key]);

    try {

      const result = await pool.query(query, [walletAddress, id]);      UPDATE users           paramCounter++;

      return result.rows[0];

    } catch (error) {      SET name = $1, email = $2, updated_at = NOW()        }

      console.error('Error updating wallet address:', error);

      throw error;      WHERE id = $3      });

    }

  }      RETURNING id

}

    `;      if (fields.length === 0) {

module.exports = User;
    const values = [name, email, id];        throw new Error('No fields to update');

          }

    try {

      const result = await pool.query(query, values);      fields.push(`updated_at = CURRENT_TIMESTAMP`);

      return result.rows[0];      values.push(id);

    } catch (error) {

      console.error('Error updating user:', error);      const query = `

      throw error;        UPDATE users 

    }        SET ${fields.join(', ')}

  }        WHERE id = $${paramCounter}

        RETURNING id, full_name, email, wallet_address, login_type, created_at, updated_at

  // Delete user      `;

  static async delete(id) {

    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';      const result = await pool.query(query, values);

          return result.rows[0];

    try {    } catch (error) {

      const result = await pool.query(query, [id]);      throw error;

      return result.rows[0];    }

    } catch (error) {  }

      console.error('Error deleting user:', error);

      throw error;  // Update last login

    }  static async updateLastLogin(id) {

  }    try {

      const query = `

  // Get user's transactions        UPDATE users 

  static async getTransactions(userId) {        SET last_login = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP

    const query = `        WHERE id = $1

      SELECT t.*, u.name as sender_name        RETURNING id, full_name, email, wallet_address, login_type, last_login

      FROM transactions t      `;

      LEFT JOIN users u ON t.from_address = u.wallet_address      

      WHERE t.from_address = (SELECT wallet_address FROM users WHERE id = $1)      const result = await pool.query(query, [id]);

         OR t.to_address = (SELECT wallet_address FROM users WHERE id = $1)      return result.rows[0];

      ORDER BY t.timestamp DESC    } catch (error) {

    `;      throw error;

        }

    try {  }

      const result = await pool.query(query, [userId]);

      return result.rows;  // Create or update user (for wallet-based users)

    } catch (error) {  static async createOrUpdate(userData) {

      console.error('Error getting user transactions:', error);    const { walletAddress, username, email } = userData;

      throw error;

    }    try {

  }      const query = `

        INSERT INTO users (wallet_address, username, email, login_type)

  // Update user's wallet address        VALUES ($1, $2, $3, 'wallet')

  static async updateWalletAddress(id, walletAddress) {        ON CONFLICT (wallet_address) 

    const query = `        DO UPDATE SET 

      UPDATE users           username = EXCLUDED.username,

      SET wallet_address = $1, updated_at = NOW()          email = EXCLUDED.email,

      WHERE id = $2          updated_at = CURRENT_TIMESTAMP

      RETURNING id        RETURNING *

    `;      `;

          

    try {      const values = [walletAddress, username, email];

      const result = await pool.query(query, [walletAddress, id]);      const result = await pool.query(query, values);

      return result.rows[0];      return result.rows[0];

    } catch (error) {    } catch (error) {

      console.error('Error updating wallet address:', error);      throw error;

      throw error;    }

    }  }

  }

}  // Get user by wallet address

  static async getByWalletAddress(walletAddress) {

module.exports = User;    try {
      const query = 'SELECT * FROM users WHERE wallet_address = $1';
      const result = await pool.query(query, [walletAddress]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Update user statistics
  static async updateStats(walletAddress, transactionData) {
    const { amount, isReceived } = transactionData;

    try {
      const query = `
        UPDATE users SET 
          total_transactions = total_transactions + 1,
          ${isReceived ? 'total_received' : 'total_sent'} = ${isReceived ? 'total_received' : 'total_sent'} + $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE wallet_address = $2
        RETURNING *
      `;
      
      const result = await pool.query(query, [amount, walletAddress]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Get user statistics with transaction counts
  static async getUserWithStats(walletAddress) {
    try {
      const query = `
        SELECT 
          u.*,
          COALESCE(sent_count.count, 0) as transactions_sent,
          COALESCE(received_count.count, 0) as transactions_received
        FROM users u
        LEFT JOIN (
          SELECT from_address, COUNT(*) as count 
          FROM transactions 
          WHERE from_address = $1 
          GROUP BY from_address
        ) sent_count ON u.wallet_address = sent_count.from_address
        LEFT JOIN (
          SELECT to_address, COUNT(*) as count 
          FROM transactions 
          WHERE to_address = $1 
          GROUP BY to_address
        ) received_count ON u.wallet_address = received_count.to_address
        WHERE u.wallet_address = $1
      `;
      
      const result = await pool.query(query, [walletAddress]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
