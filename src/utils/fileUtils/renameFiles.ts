import * as fs from 'fs';
import * as path from 'path';

export function renameFiles(
  newModule: string,
  sourceResourceName: string,
  newResourceName: string,
): void {
  const newDir = path.join('./src', newModule);

  const renameFilesRecursively = (dir: string) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        renameFilesRecursively(filePath);
      } else {
        const newFileName = file.replace(new RegExp(sourceResourceName, 'g'), newResourceName);
        const newFilePath = path.join(dir, newFileName);

        fs.renameSync(filePath, newFilePath);
      }
    });
  };

  renameFilesRecursively(newDir);
}
