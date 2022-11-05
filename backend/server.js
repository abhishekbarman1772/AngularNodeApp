const app = require('./app/app');
const logger = require('./app/utils/logger')('Bootstrap');
const { PORT } = require('./config/const');

require('./app/common/mongoose').connectToDb()
  .then(() => logger.info('database connection established'));

app.listen(PORT, () => logger.info(`server is running on port :${PORT}`))
  .on('error', (err) => logger.error(err));

process.on('uncaughtException', (err) => {
  logger.error('System detect uncaught exception', err.message);
  process.exit(1);
});
