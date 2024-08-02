import { upperCase } from '../src/utils/stringUtils/upperCase';

describe('upperCase', () => {
  it('should convert a lowercase string to uppercase', () => {
    expect(upperCase('hello')).toBe('HELLO');
  });

  it('should convert a mixed case string to uppercase', () => {
    expect(upperCase('hElLo')).toBe('HELLO');
  });

  it('should return an empty string when given an empty string', () => {
    expect(upperCase('')).toBe('');
  });

  it('should not change an already uppercase string', () => {
    expect(upperCase('HELLO')).toBe('HELLO');
  });

  it('should handle strings with leading and trailing spaces', () => {
    expect(upperCase('  hello  ')).toBe('  HELLO  ');
  });

  it('should handle strings with special characters', () => {
    expect(upperCase('@hello')).toBe('@HELLO');
    expect(upperCase('1hello')).toBe('1HELLO');
  });
});
