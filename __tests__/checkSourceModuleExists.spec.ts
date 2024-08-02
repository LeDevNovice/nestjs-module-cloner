import * as fs from 'fs';
import * as path from 'path';

import { checkSourceModuleExists } from '../src/utils/fileUtils/checkSourceModuleExists';

jest.mock('fs');

describe('checkSourceModuleExists', () => {
  const sourceModule = 'mockModule';
  const expectedPath = path.join('./src', sourceModule); // Construct the expected path

  it('should not throw an error when the source module exists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    expect(() => checkSourceModuleExists(sourceModule)).not.toThrow();
  });

  it('should throw an error when the source module does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    expect(() => checkSourceModuleExists(sourceModule)).toThrow(Error);
  });

  it('should throw an error with the correct message when the source module does not exist', () => {
    const expectedErrorMessage = `Source module ${expectedPath} does not exist`;
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    expect(() => checkSourceModuleExists(sourceModule)).toThrow(expectedErrorMessage);
  });
});
