import { BaseEventHandler } from './base.event-handler';
import { IEvent } from '@nestjs/cqrs';

class TestEvent implements IEvent {}

class TestEventHandler extends BaseEventHandler<TestEvent> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(_event: TestEvent) {
    this.logger.log('Handling test event');

    return 'handled';
  }
}

describe('BaseEventHandler', () => {
  let handler: TestEventHandler;

  beforeEach(() => {
    handler = new TestEventHandler();
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('should handle event', () => {
    const result = handler.handle(new TestEvent());
    expect(result).toBe('handled');
  });

  it('should have access to logger from BaseLogger', () => {
    expect(handler['logger']).toBeDefined();
  });
});
