import { BaseResponseDto } from './base.response.dto';

describe('BaseResponseDto', () => {
  it('should initialize with provided values', () => {
    const data = { id: 1, name: 'Test' };
    const message = 'Success';
    const dto = new BaseResponseDto({ message, data });

    expect(dto.message).toBe(message);
    expect(dto.data).toBe(data);
  });

  it('should work with partial values', () => {
    const message = 'Only Message';
    const dto = new BaseResponseDto({ message });

    expect(dto.message).toBe(message);
    expect(dto.data).toBeUndefined();
  });

  it('should work with empty object', () => {
    const dto = new BaseResponseDto({});

    expect(dto.message).toBeUndefined();
    expect(dto.data).toBeUndefined();
  });
});
