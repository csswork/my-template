import { TokenCleanupJob } from './tokenCleanup.js';

export const initJobs = () => {
  // Start token cleanup job
  const tokenCleanupTimer = TokenCleanupJob.start();

  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    TokenCleanupJob.stop(tokenCleanupTimer);
  });

  return {
    tokenCleanupTimer
  };
};