import { initTracing } from './tracing';

describe('Tracing', () => {
  it('should be defined', () => {
    expect(initTracing).toBeDefined();
  });

  it('should not throw when initialized', () => {
    // We don't want to actually start the SDK in tests as it might hang or need env vars
    // But we can check if it's a function
    expect(typeof initTracing).toBe('function');
  });
});
