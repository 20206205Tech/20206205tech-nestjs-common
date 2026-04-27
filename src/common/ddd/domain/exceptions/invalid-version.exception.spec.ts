import { InvalidVersionException } from './invalid-version.exception';
import { DomainException } from './domain.exception';

describe('InvalidVersionException', () => {
  it('should include value and min in the message', () => {
    const ex = new InvalidVersionException(0, 1);
    expect(ex.message).toContain('0');
    expect(ex.message).toContain('1');
  });

  it('should be an instance of DomainException', () => {
    const ex = new InvalidVersionException(0, 1);
    expect(ex).toBeInstanceOf(DomainException);
  });

  it('should be an instance of Error', () => {
    const ex = new InvalidVersionException(0, 1);
    expect(ex).toBeInstanceOf(Error);
  });

  it('should have name "InvalidVersionException"', () => {
    const ex = new InvalidVersionException(0, 1);
    expect(ex.name).toBe('InvalidVersionException');
  });
});
