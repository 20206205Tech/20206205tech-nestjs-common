import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { BaseController } from './base.controller';

class TestController extends BaseController {
  public getCommandBus() {
    return this.commandBus;
  }
  public getQueryBus() {
    return this.queryBus;
  }
  public getLogger() {
    return this.logger;
  }
}

describe('BaseController', () => {
  let controller: TestController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestController,
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() },
        },
        {
          provide: QueryBus,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<TestController>(TestController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have commandBus injected', () => {
    expect(controller.getCommandBus()).toBe(commandBus);
  });

  it('should have queryBus injected', () => {
    expect(controller.getQueryBus()).toBe(queryBus);
  });

  it('should inherit from BaseLogger', () => {
    // Check if logger property exists (it's protected in BaseLogger)
    expect(controller.getLogger()).toBeDefined();
  });
});
