import { BaseCommandHandler } from './base.command-handler';
import { ICommand } from '@nestjs/cqrs';

class TestCommand implements ICommand {}

class TestCommandHandler extends BaseCommandHandler<TestCommand, string> {
  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unused-vars
  async execute(_command: TestCommand): Promise<string> {
    this.logger.log('Executing test command');
    return 'success';
  }
}

describe('BaseCommandHandler', () => {
  let handler: TestCommandHandler;

  beforeEach(() => {
    handler = new TestCommandHandler();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should execute command and return result', async () => {
    const result = await handler.execute(new TestCommand());
    expect(result).toBe('success');
  });

  it('should have access to logger from BaseLogger', () => {
    expect(handler['logger']).toBeDefined();
  });
});
