import { capitalize } from '../src/utils/stringUtils/capitalize';

describe('capitalize', () => {
  it('should capitalize the first letter of a single word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should capitalize the first letter of a sentence', () => {
    expect(capitalize('hello world')).toBe('Hello world');
  });

  it('should return an empty string when given an empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should not change a string that is already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should capitalize the first letter only', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });

  it('should not handle strings with leading spaces', () => {
    expect(capitalize('  hello')).toBe('  hello');
  });

  it('should not handle strings with special characters', () => {
    expect(capitalize('@hello')).toBe('@hello');
    expect(capitalize('1hello')).toBe('1hello');
  });
});
