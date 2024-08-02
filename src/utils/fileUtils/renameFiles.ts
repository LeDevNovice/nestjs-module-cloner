import * as fs from 'fs';
import * as path from 'path';

export function renameFiles(
  newModule: string,
  sourceResourceName: string,
  newResourceName: string,
): void {
  const newDir = path.join('./src', newModule);

  const files = fs.readdirSync(newDir);

  files.forEach((file) => {
    const oldFilePath = path.join(newDir, file);
    const newFilePath = path.join(
      newDir,
      file.replace(new RegExp(sourceResourceName, 'g'), newResourceName),
    );

    try {
      fs.renameSync(oldFilePath, newFilePath);
    } catch (error) {
      throw new Error(
        `Failed to rename file ${oldFilePath} to ${newFilePath}: ${(error as Error).message}`,
      );
    }
  });
}
