import * as fs from 'fs';
import * as path from 'path';
import { copyModule } from '../src/utils/fileUtils/copyModule';

jest.mock('fs');

describe('copyModule', () => {
  const sourceModule = 'mockSourceModule';
  const newModule = 'mockNewModule';
  const sourceDir = path.join('./src', sourceModule);
  const newDir = path.join('./src', newModule);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should copy the module successfully when the source module exists', () => {
    jest.spyOn(fs, 'existsSync').mockImplementation((path) => {
      if (path === newDir) return true;
      return true;
    });

    const cpSyncMock = jest.spyOn(fs, 'cpSync').mockImplementation(() => {});

    expect(() => copyModule(sourceModule, newModule)).not.toThrow();
    expect(cpSyncMock).toHaveBeenCalledWith(sourceDir, newDir, { recursive: true });
  });

  it('should throw an error when fs.cpSync fails', () => {
    const errorMessage = 'mock error';
    jest.spyOn(fs, 'cpSync').mockImplementation(() => {
      throw new Error(errorMessage);
    });

    expect(() => copyModule(sourceModule, newModule)).toThrow(
      `Failed to copy module ${sourceDir} to ${newDir}: ${errorMessage}`,
    );
  });

  it('should throw an error when the new module directory does not exist after copying', () => {
    jest.spyOn(fs, 'existsSync').mockImplementation((path) => {
      if (path === newDir) return false;
      return true;
    });

    jest.spyOn(fs, 'cpSync').mockImplementation(() => {});

    expect(() => copyModule(sourceModule, newModule)).toThrow(
      `Failed to copy module ${sourceDir} to ${newDir}`,
    );
  });
});
