import { plusOneDemo } from '../lib/helpers';

describe('plusOneDemo', () => {
  it('should return 2 when given 1', () => {
    expect(plusOneDemo(1)).toBe(2);
  });
});
