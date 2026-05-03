import { BaseLogger } from '../../utils/base-logger';
import { IEvent } from '@nestjs/cqrs';

export abstract class BaseEventHandler<
  TEvent extends IEvent,
> extends BaseLogger {
  // implements IEventHandler<TEvent>
  constructor() {
    super();
  }

  abstract handle(event: TEvent): any;
}
