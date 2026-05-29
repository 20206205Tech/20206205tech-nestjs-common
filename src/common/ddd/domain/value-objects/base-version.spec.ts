import { BaseVersion } from './base-version';
import { InvalidVersionException } from '../exceptions/invalid-version.exception';

describe('BaseVersion', () => {
  describe('constructor — validation', () => {
    it('should create a version with value = 0 (MIN_VALUE)', () => {
      const v = new BaseVersion(0);
      expect(v.value).toBe(0);
    });

    it('should create a version with value = 1', () => {
      const v = new BaseVersion(1);
      expect(v.value).toBe(1);
    });

    it('should create a version with value > 1', () => {
      const v = new BaseVersion(5);
      expect(v.value).toBe(5);
    });

    it('should throw InvalidVersionException when value is negative', () => {
      expect(() => new BaseVersion(-1)).toThrow(InvalidVersionException);
    });

    it('should include correct values in the error message', () => {
      expect(() => new BaseVersion(-1)).toThrow('Invalid version value: -1');
    });
  });

  describe('equals()', () => {
    it('should return true for two versions with the same value', () => {
      const a = new BaseVersion(3);
      const b = new BaseVersion(3);
      expect(a.equals(b)).toBe(true);
    });

    it('should return false for two versions with different values', () => {
      const a = new BaseVersion(0);
      const b = new BaseVersion(1);
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('MIN_VALUE', () => {
    it('should be 0', () => {
      expect(BaseVersion.MIN_VALUE).toBe(0);
    });
  });
});
