import { DomainValueObject } from './domain-value-object';

class StringVO extends DomainValueObject<string> {
  constructor(value: string) {
    super(value);
  }
}

class NumberVO extends DomainValueObject<number> {
  constructor(value: number) {
    super(value);
  }
}

describe('DomainValueObject', () => {
  describe('props', () => {
    it('should store the value', () => {
      const vo = new StringVO('hello');
      expect(vo.props).toBe('hello');
    });

    it('should freeze primitive props (no-op for primitives)', () => {
      const vo = new NumberVO(42);
      expect(vo.props).toBe(42);
    });
  });

  describe('equals()', () => {
    it('should return true for two VOs with same value', () => {
      const a = new StringVO('abc');
      const b = new StringVO('abc');
      expect(a.equals(b)).toBe(true);
    });

    it('should return false for two VOs with different values', () => {
      const a = new StringVO('abc');
      const b = new StringVO('xyz');
      expect(a.equals(b)).toBe(false);
    });

    it('should return false when compared with null', () => {
      const a = new StringVO('abc');
      expect(a.equals(null as unknown as DomainValueObject<string>)).toBe(
        false,
      );
    });

    it('should return false when compared with undefined', () => {
      const a = new StringVO('abc');
      expect(a.equals(undefined)).toBe(false);
    });

    it('should compare objects by JSON serialization', () => {
      class ObjVO extends DomainValueObject<{ x: number; y: number }> {
        constructor(x: number, y: number) {
          super({ x, y });
        }
      }
      const a = new ObjVO(1, 2);
      const b = new ObjVO(1, 2);
      const c = new ObjVO(1, 3);
      expect(a.equals(b)).toBe(true);
      expect(a.equals(c)).toBe(false);
    });
  });
});
