import { describe, expect, it } from 'vitest';

import { formatNumber } from './number-formatter';

describe('number formatter', () => {
  it('1.000.010.200 should return 1B', () => {
    const firstNumber = 1000000000;
    const result = formatNumber(firstNumber);
    expect(result).toBe('1B');
  });

  it('1.000.000 should return 1M', () => {
    const firstNumber = 1000000;
    const result = formatNumber(firstNumber);
    expect(result).toBe('1M');
  });

  it('999.999 should return 999.9K', () => {
    const firstNumber = 999999;
    const result = formatNumber(firstNumber);
    expect(result).toBe('999.9K');
  });

  it('coucou should return null', () => {
    //@ts-expect-error - should be a number but test with string
    const firstNumber = 'coucou' as number;
    const result = formatNumber(firstNumber);
    expect(result).toBeUndefined();
  });

  it('coucou should return null', () => {
    const firstNumber = -5000;
    const result = formatNumber(firstNumber);
    expect(result).toBeUndefined();
  });
});
