import * as fs from 'fs';
import * as path from 'path';

export function copyModule(sourceModule: string, newModule: string): void {
  const sourceDir = path.join('./src', sourceModule);
  const newDir = path.join('./src', newModule);

  try {
    fs.cpSync(sourceDir, newDir, { recursive: true });
  } catch (error) {
    throw new Error(`Failed to copy module ${sourceDir} to ${newDir}: ${(error as Error).message}`);
  }

  if (!fs.existsSync(newDir)) {
    throw new Error(`Failed to copy module ${sourceDir} to ${newDir}`);
  }
}
