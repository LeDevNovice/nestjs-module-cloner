import { checkArguments } from '../src/utils/checkArguments';

describe('checkArguments', () => {
  it('should not throw an error when the correct number of arguments is passed', () => {
    expect(() =>
      checkArguments(['nmc', 'sourceModule', 'sourceResource', 'newModule', 'newResource']),
    ).not.toThrow();
  });

  it('should throw an error when less than 4 arguments are passed', () => {
    expect(() => checkArguments(['nmc', 'sourceModule', 'sourceResource'])).toThrow(Error);
    expect(() => checkArguments(['nmc', 'sourceModule'])).toThrow(Error);
    expect(() => checkArguments(['nmc'])).toThrow(Error);
  });

  it('should throw an error with the correct message when less than 4 arguments are passed', () => {
    const args = ['nmc', 'sourceModule', 'sourceResource'];
    expect(() => checkArguments(args)).toThrow(
      'Usage: nmc <sourceModule> <sourceResourceName> <newModule> <newResourceName>',
    );
  });
});
