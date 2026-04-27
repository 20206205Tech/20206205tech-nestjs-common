import { helloWorld } from './demo';

describe('helloWorld', () => {
  it('should return a greeting message', () => {
    expect(helloWorld('NPM Library')).toBe('Hello, NPM Library!');
  });
});
