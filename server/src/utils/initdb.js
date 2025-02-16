import pool from './db.js';

const initDatabase = async () => {
  try {
    const conn = await pool.getConnection();
    
    try {
      // Check and create users table
      await conn.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          phone VARCHAR(20) UNIQUE,
          wechat VARCHAR(100) UNIQUE,
          role ENUM('user', 'subscriber', 'editor', 'admin') DEFAULT 'user',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);

      // Check and create user_profiles table
      await conn.query(`
        CREATE TABLE IF NOT EXISTS user_profiles (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL UNIQUE,
          avatar_url VARCHAR(255),
          address TEXT,
          company VARCHAR(255),
          gender ENUM('male', 'female', 'other'),
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          bio TEXT,
          birth_date DATE,
          website VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      console.log('Database tables initialized successfully');
    } catch (error) {
      console.error('Error initializing database tables:', error);
      throw error;
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
};

export default initDatabase;