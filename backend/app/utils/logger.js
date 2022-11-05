const log4js = require('log4js');

const logger = (name) => {
  log4js.configure({

    appenders: {
      console: { type: 'stdout' },
      // file: {
      //   type: 'file',
      //   filename: './logs/info/Wethiologs.log',
      // },
    },
    categories: { default: { appenders: ['console'], level: 'error' } },
  });

  const loggerConfig = log4js.getLogger(name);
  loggerConfig.level = 'debug';

  return loggerConfig;
};

module.exports = logger;
