import { BaseVersion } from './base-version';
import { InvalidVersionException } from '../exceptions/invalid-version.exception';

describe('BaseVersion', () => {
  describe('constructor — validation', () => {
    it('should create a version with value = 1 (MIN_VALUE)', () => {
      const v = new BaseVersion(1);
      expect(v.value).toBe(1);
    });

    it('should create a version with value > 1', () => {
      const v = new BaseVersion(5);
      expect(v.value).toBe(5);
    });

    it('should throw InvalidVersionException when value < 1', () => {
      expect(() => new BaseVersion(0)).toThrow(InvalidVersionException);
    });

    it('should throw InvalidVersionException when value is negative', () => {
      expect(() => new BaseVersion(-1)).toThrow(InvalidVersionException);
    });

    it('should include correct values in the error message', () => {
      expect(() => new BaseVersion(0)).toThrow('Invalid version value: 0');
    });
  });

  describe('equals()', () => {
    it('should return true for two versions with the same value', () => {
      const a = new BaseVersion(3);
      const b = new BaseVersion(3);
      expect(a.equals(b)).toBe(true);
    });

    it('should return false for two versions with different values', () => {
      const a = new BaseVersion(1);
      const b = new BaseVersion(2);
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('MIN_VALUE', () => {
    it('should be 1', () => {
      expect(BaseVersion.MIN_VALUE).toBe(1);
    });
  });
});
