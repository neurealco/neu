import app from './app';
import config from './config';
import { createServer } from 'http';
import { initCache } from './utils/cache.util';

const server = createServer(app);

const start = async () => {
  await initCache();
  
  server.listen(config.PORT, () => {
    console.log(`🚀 Server running on port ${config.PORT}`);
  });
};

start();