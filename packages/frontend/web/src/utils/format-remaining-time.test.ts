import { describe, expect, it } from 'vitest';

import { formatRemainingTime } from './format-remaining-time';

describe('Format remaining time', () => {
  it('now should returns feed me!', () => {
    const date = new Date();
    const result = formatRemainingTime(date);
    expect(result).toBe('Feed me!');
  });

  it('now+2min should returns 2 m 0 s', () => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 2);

    const result = formatRemainingTime(date);
    expect(result).toBe('2 m 0 s');
  });
});
