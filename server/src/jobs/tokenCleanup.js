import pool from '../utils/db.js';

export class TokenCleanupJob {
  static async cleanup() {
    try {
      const [result] = await pool.query(
        'DELETE FROM token_blacklist WHERE expires_at < CURRENT_TIMESTAMP'
      );
      console.log(`Cleaned up ${result.affectedRows} expired tokens`);
    } catch (error) {
      console.error('Token cleanup error:', error);
    }
  }

  static start(interval = 3600000) { // Default 1 hour
    this.cleanup(); // Run immediately
    return setInterval(() => this.cleanup(), interval);
  }

  static stop(timerId) {
    if (timerId) {
      clearInterval(timerId);
    }
  }
}