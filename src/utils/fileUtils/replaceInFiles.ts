import * as fs from 'fs';

export function replaceInFiles(
  filePath: string,
  sourceResourceName: string,
  newResourceName: string,
): void {
  const data = fs.readFileSync(filePath, 'utf8');
  const result = data.replace(new RegExp(sourceResourceName, 'g'), newResourceName);

  fs.writeFileSync(filePath, result, 'utf8');
}
