import { BaseLogger } from '../../utils/base-logger';
import { ICommand } from '@nestjs/cqrs';

export abstract class BaseCommandHandler<
  TCommand extends ICommand,
  TResult = void,
> extends BaseLogger {
  // implements ICommandHandler<TCommand, TResult>
  constructor() {
    super();
  }

  // Ép buộc các class con phải implement hàm execute
  abstract execute(command: TCommand): Promise<TResult>;
}
