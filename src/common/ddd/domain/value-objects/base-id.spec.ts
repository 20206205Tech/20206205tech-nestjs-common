import { BaseId } from './base-id';

// Concrete subclass để test abstract BaseId
class TestId extends BaseId {
  public static create(): TestId {
    return new TestId(BaseId['generateUuid']());
  }
}

const VALID_UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('BaseId', () => {
  describe('constructor — validation', () => {
    it('should create an ID with a valid UUID string', () => {
      const id = new TestId(VALID_UUID);
      expect(id.value).toBe(VALID_UUID);
    });

    it('should throw an error for an empty string', () => {
      expect(() => new TestId('')).toThrow('Invalid ID format');
    });

    it('should throw an error for a non-UUID string', () => {
      expect(() => new TestId('not-a-uuid')).toThrow('Invalid ID format');
    });

    it('should throw an error for a partial UUID', () => {
      expect(() => new TestId('550e8400-e29b-41d4')).toThrow(
        'Invalid ID format',
      );
    });
  });

  describe('create()', () => {
    it('should generate a valid UUID', () => {
      const id = TestId.create();
      expect(id.value).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      );
    });

    it('should generate a unique UUID on each call', () => {
      const id1 = TestId.create();
      const id2 = TestId.create();
      expect(id1.value).not.toBe(id2.value);
    });
  });

  describe('equals()', () => {
    it('should return true for two IDs with the same UUID', () => {
      const a = new TestId(VALID_UUID);
      const b = new TestId(VALID_UUID);
      expect(a.equals(b)).toBe(true);
    });

    it('should return false for two IDs with different UUIDs', () => {
      const a = TestId.create();
      const b = TestId.create();
      expect(a.equals(b)).toBe(false);
    });
  });
});
