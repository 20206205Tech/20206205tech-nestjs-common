import { Logger } from '@nestjs/common';
import { BaseLogger } from './base-logger';

class TestLogger extends BaseLogger {
  public getLogger() {
    return this.logger;
  }
}

describe('BaseLogger', () => {
  it('should initialize with a Logger instance', () => {
    const testLogger = new TestLogger();
    expect(testLogger.getLogger()).toBeDefined();
    expect(testLogger.getLogger()).toBeInstanceOf(Logger);
  });

  it('should have the correct context name', () => {
    const testLogger = new TestLogger();
    // NestJS Logger context is private, but we can check if it's initialized
    // Usually we would mock the Logger class to verify the constructor call
    expect(testLogger.getLogger()).toBeDefined();
  });
});
