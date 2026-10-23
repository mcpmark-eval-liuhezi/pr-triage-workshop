// Tiny logger module for the demo service.

const LEVELS = ['debug', 'info', 'warn', 'error'];
const LEVEL_WEIGHT = { debug: 10, info: 20, warn: 30, error: 40 };

let currentLevel = 'info';

function setLevel(level) {
  if (!LEVELS.includes(level)) {
    throw new Error(`Unknown log level: ${level}`);
  }
  currentLevel = level;
}

function log(level, message) {
  if (LEVEL_WEIGHT[level] < LEVEL_WEIGHT[currentLevel]) {
    return;
  }
  const timestamp = new Date().toISOString();
  const prefix = level.toUpperCase().padEnd(5);
  console.log(`${timestamp} ${prefix} ${message}`);
}

module.exports = {
  setLevel,
  debug: (msg) => log('debug', msg),
  info: (msg) => log('info', msg),
  warn: (msg) => log('warn', msg),
  error: (msg) => log('error', msg),
  LEVELS,
};
