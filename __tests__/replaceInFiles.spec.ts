import * as fs from 'fs';
import { replaceInFiles } from '../src/utils/fileUtils/replaceInFiles';

jest.mock('fs');

describe('replaceInFiles', () => {
  const filePath = 'mockFilePath';
  const sourceResourceName = 'oldName';
  const newResourceName = 'newName';
  const fileContent = 'This is the oldName content. oldName is here.';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should replace the source resource name with the new resource name in the file content', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue(fileContent);
    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

    replaceInFiles(filePath, sourceResourceName, newResourceName);

    const expectedContent = 'This is the newName content. newName is here.';
    expect(writeFileSyncMock).toHaveBeenCalledWith(filePath, expectedContent, 'utf8');
  });

  it('should throw an error if readFileSync fails', () => {
    jest.spyOn(fs, 'readFileSync').mockImplementation(() => {
      throw new Error('Failed to read file');
    });

    expect(() => {
      replaceInFiles(filePath, sourceResourceName, newResourceName);
    }).toThrow('Failed to read file');
  });

  it('should throw an error if writeFileSync fails', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue(fileContent);
    jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
      throw new Error('Failed to write file');
    });

    expect(() => {
      replaceInFiles(filePath, sourceResourceName, newResourceName);
    }).toThrow('Failed to write file');
  });
});
