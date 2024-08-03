import * as fs from 'fs';
import * as path from 'path';

export function checkSourceModuleExists(sourceModule: string): void {
  const modulePath = path.join('./src', sourceModule);

  if (!fs.existsSync(modulePath)) {
    throw new Error(`Source module ${modulePath} does not exist`);
  }
}
