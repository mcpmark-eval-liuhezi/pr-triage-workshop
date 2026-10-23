// Unit tests for the demo service logger.

const assert = require('assert');
const logger = require('../src/logger');

let output = [];
const originalLog = console.log;

function captureConsole() {
  console.log = (...args) => output.push(args.join(' '));
}

function restoreConsole() {
  console.log = originalLog;
  output = [];
}

describe('logger', () => {
  beforeEach(() => {
    logger.setLevel('info');
    captureConsole();
  });

  afterEach(restoreConsole);

  it('exports the expected log levels', () => {
    assert.deepStrictEqual(logger.LEVELS, ['debug', 'info', 'warn', 'error']);
  });

  it('throws when setting an unknown level', () => {
    assert.throws(() => logger.setLevel('verbose'), /Unknown log level: verbose/);
  });

  it('logs info messages at the default level', () => {
    logger.info('service started');
    assert.strictEqual(output.length, 1);
    assert.match(output[0], /INFO\s+service started$/);
  });

  it('suppresses debug messages below the current level', () => {
    logger.debug('hidden detail');
    assert.strictEqual(output.length, 0);
  });

  it('logs warn messages above the current level', () => {
    logger.warn('cache miss');
    assert.strictEqual(output.length, 1);
    assert.match(output[0], /WARN\s+cache miss$/);
  });

  it('always logs error messages', () => {
    logger.error('something exploded');
    assert.strictEqual(output.length, 1);
    assert.match(output[0], /ERROR\s+something exploded$/);
  });
});
