import * as fs from 'fs';
import * as path from 'path';
import { updateFileContents } from '../src/utils/fileUtils/updateFileContents'; // Adjust the path based on your structure
import { replaceInFiles } from '../src/utils/fileUtils/replaceInFiles';
import { capitalize } from '../src/utils/stringUtils/capitalize';
import { upperCase } from '../src/utils/stringUtils/upperCase';

jest.mock('fs');
jest.mock('../src/utils/fileUtils/replaceInFiles');
jest.mock('../src/utils/stringUtils/capitalize');
jest.mock('../src/utils/stringUtils/upperCase');

describe('updateFileContents', () => {
  const newModule = 'mockNewModule';
  const sourceResourceName = 'oldName';
  const newResourceName = 'newName';
  const mockFilePath = path.join('./src', newModule, 'file.txt');
  const mockDirPath = path.join('./src', newModule, 'subdir');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update file contents with new resource names', () => {
    const files = ['file.txt'];
    const dirPath = path.join('./src', newModule);

    (fs.readdirSync as jest.Mock).mockReturnValue(files);
    (fs.statSync as jest.Mock).mockReturnValue({ isDirectory: () => false });
    (capitalize as jest.Mock).mockImplementation(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    );
    (upperCase as jest.Mock).mockImplementation((word) => word.toUpperCase());

    updateFileContents(newModule, sourceResourceName, newResourceName);

    expect(replaceInFiles).toHaveBeenCalledWith(mockFilePath, sourceResourceName, newResourceName);
    expect(replaceInFiles).toHaveBeenCalledWith(mockFilePath, 'OldName', 'NewName');
    expect(replaceInFiles).toHaveBeenCalledWith(mockFilePath, 'OLDNAME', 'NEWNAME');
  });

  it('should recursively update file contents in subdirectories', () => {
    const files = ['file.txt', 'subdir'];
    const dirPath = path.join('./src', newModule);

    (fs.readdirSync as jest.Mock).mockImplementation((dir: string) => {
      return dir === dirPath ? files : ['nestedFile.txt'];
    });
    (fs.statSync as jest.Mock).mockImplementation((filePath: string) => {
      return {
        isDirectory: () => filePath === mockDirPath,
      };
    });

    updateFileContents(newModule, sourceResourceName, newResourceName);

    expect(replaceInFiles).toHaveBeenCalledWith(mockFilePath, sourceResourceName, newResourceName);
    expect(replaceInFiles).toHaveBeenCalledWith(
      path.join(mockDirPath, 'nestedFile.txt'),
      sourceResourceName,
      newResourceName,
    );
  });

  it('should handle empty directories gracefully', () => {
    const files: string[] = [];

    (fs.readdirSync as jest.Mock).mockReturnValue(files);

    updateFileContents(newModule, sourceResourceName, newResourceName);

    expect(replaceInFiles).not.toHaveBeenCalled();
  });

  it('should throw an error if readdirSync fails', () => {
    (fs.readdirSync as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to read directory');
    });

    expect(() => {
      updateFileContents(newModule, sourceResourceName, newResourceName);
    }).toThrow('Failed to read directory');
  });

  it('should throw an error if statSync fails', () => {
    const files = ['file.txt'];

    (fs.readdirSync as jest.Mock).mockReturnValue(files);
    (fs.statSync as jest.Mock).mockImplementation(() => {
      throw new Error('Failed to read file stats');
    });

    expect(() => {
      updateFileContents(newModule, sourceResourceName, newResourceName);
    }).toThrow('Failed to read file stats');
  });
});
