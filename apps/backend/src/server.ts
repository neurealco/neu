import app from './app';
import config from './config';
import { createServer } from 'http';
import { initCache } from './utils/cache.util';

const server = createServer(app);

const start = async () => {
  try {
    await initCache();
    console.log('✅ Redis connected');
    
    const port = Number(config.PORT) || 8000;
    
    // Escuchar en 0.0.0.0 para conexiones externas
    server.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`🩺 Health check: http://0.0.0.0:${port}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

start();