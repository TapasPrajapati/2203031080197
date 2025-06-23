const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});


const requestLogger = (req, res, next) => {
  logger.info({
    message: 'Request received',
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });
  next();
};


const errorLogger = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString()
  });
  next(err);
};

module.exports = {
  requestLogger,
  errorLogger,
  logger
};