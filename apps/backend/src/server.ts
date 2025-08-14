import app from './app';
import config from './config';
import { createServer } from 'http';
import { initCache } from './utils/cache.util';
import logger from './utils/logger.util';

const server = createServer(app);

const start = async () => {
  try {
    await initCache();
    logger.info('✅ Redis conectado');
    
    const port = Number(config.PORT) || 8000;
    
    server.listen(port, '0.0.0.0', () => {
      logger.info(`🚀 Servidor ejecutándose en puerto ${port}`);
      logger.info(`🩺 Health check: http://0.0.0.0:${port}/health`);
      
      // Forzar el evento mount manualmente
      app.emit('mount');
    });
  } catch (error) {
    logger.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

start();