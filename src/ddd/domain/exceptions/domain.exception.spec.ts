import { DomainException } from './domain.exception';

describe('DomainException', () => {
  it('should create an exception with the given message', () => {
    const ex = new DomainException('Something went wrong');
    expect(ex.message).toBe('Something went wrong');
  });

  it('should have name equal to "DomainException"', () => {
    const ex = new DomainException('err');
    expect(ex.name).toBe('DomainException');
  });

  it('should be an instance of Error', () => {
    const ex = new DomainException('err');
    expect(ex).toBeInstanceOf(Error);
  });

  it('should support subclassing and preserve the subclass name', () => {
    class MyDomainException extends DomainException {
      constructor() {
        super('My domain error');
      }
    }
    const ex = new MyDomainException();
    expect(ex.name).toBe('MyDomainException');
    expect(ex.message).toBe('My domain error');
    expect(ex).toBeInstanceOf(DomainException);
    expect(ex).toBeInstanceOf(Error);
  });
});
