import { BaseQueryHandler } from './base.query-handler';
import { IQuery } from '@nestjs/cqrs';

class TestQuery implements IQuery {}

class TestQueryHandler extends BaseQueryHandler<TestQuery, string> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_query: TestQuery): Promise<string> {
    await Promise.resolve();
    this.logger.log('Executing test query');

    return 'query_result';
  }
}

describe('BaseQueryHandler', () => {
  let handler: TestQueryHandler;

  beforeEach(() => {
    handler = new TestQueryHandler();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should execute query and return result', async () => {
    const result = await handler.execute(new TestQuery());
    expect(result).toBe('query_result');
  });

  it('should have access to logger from BaseLogger', () => {
    expect(handler['logger']).toBeDefined();
  });
});
