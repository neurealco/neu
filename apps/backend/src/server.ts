import app from './app';
import config from './config';
import { createServer } from 'http';
import { initCache } from './utils/cache.util';

const server = createServer(app);

const start = async () => {
  await initCache();
  
  // Solución 1: Convertir PORT a número
  const port = Number(config.PORT) || 8000;
  
  // Solución 2: Escuchar sin especificar host
  server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

start();