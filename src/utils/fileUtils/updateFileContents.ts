import * as fs from 'fs';
import * as path from 'path';

import { capitalize } from '../stringUtils/capitalize';
import { upperCase } from '../stringUtils/upperCase';
import { replaceInFiles } from './replaceInFiles';

export function updateFileContents(
  newModule: string,
  sourceResourceName: string,
  newResourceName: string,
): void {
  const newDir = path.join('./src', newModule);

  const updateFilesRecursively = (dir: string) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);

      if (fs.statSync(filePath).isDirectory()) {
        updateFilesRecursively(filePath);
      } else {
        replaceInFiles(filePath, sourceResourceName, newResourceName);
        replaceInFiles(filePath, capitalize(sourceResourceName), capitalize(newResourceName));
        replaceInFiles(filePath, upperCase(sourceResourceName), upperCase(newResourceName));
      }
    });
  };

  updateFilesRecursively(newDir);
}
