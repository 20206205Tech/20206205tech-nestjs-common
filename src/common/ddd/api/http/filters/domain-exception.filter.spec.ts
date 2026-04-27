import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { DomainExceptionFilter } from './domain-exception.filter';
import { DomainException } from '../../../domain/exceptions/domain.exception';
import { Response, Request } from 'express';

describe('DomainExceptionFilter', () => {
  let filter: DomainExceptionFilter;
  let mockArgumentsHost: Partial<ArgumentsHost>;
  let mockResponse: Partial<Response>;
  let mockRequest: Partial<Request>;

  beforeEach(() => {
    filter = new DomainExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockRequest = {
      url: '/test-url',
    };
    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    };
  });

  it('should catch DomainException and return 400 Bad Request', () => {
    const exception = new DomainException('Business rule violated');

    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Business rule violated',
        path: '/test-url',
        error: 'DomainException',
      }),
    );
  });

  it('should include a timestamp in the response', () => {
    const exception = new DomainException('Error');

    filter.catch(exception, mockArgumentsHost as ArgumentsHost);

    const jsonArg = (
      (mockResponse.json as jest.Mock).mock.calls as unknown[][]
    )[0][0] as Record<string, unknown>;
    expect(jsonArg.timestamp).toBeDefined();
    expect(new Date(jsonArg.timestamp as string).getTime()).not.toBeNaN();
  });
});
