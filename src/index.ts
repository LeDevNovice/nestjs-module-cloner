import * as fs from 'fs';
import * as path from 'path';

function checkArguments(args: string[]) {
  if (args.length < 4) {
    console.error(
      'Usage: nestjs-module-cloner <sourceModule> <sourceResourceName> <newModule> <newResourceName>',
    );
    process.exit(1);
  }
}

function checkSourceModuleExists(sourceModule: string) {
  if (!fs.existsSync(`./src/${sourceModule}`)) {
    console.error(`Error: Source module ./src/${sourceModule} does not exist`);
    process.exit(1);
  }
}

function copyModule(sourceModule: string, newModule: string) {
  const sourceDir = `./src/${sourceModule}`;
  const newDir = `./src/${newModule}`;

  fs.cpSync(sourceDir, newDir, { recursive: true });

  if (!fs.existsSync(newDir)) {
    console.error(`Failed to copy module ./src/${sourceModule} to ./src/${newModule}`);
    process.exit(1);
  }
}

function renameFiles(newModule: string, sourceResourceName: string, newResourceName: string) {
  const newDir = `./src/${newModule}`;

  const files = fs.readdirSync(newDir);

  files.forEach((file) => {
    const newFile = file.replace(new RegExp(sourceResourceName, 'g'), newResourceName);
    fs.renameSync(path.join(newDir, file), path.join(newDir, newFile));
  });
}

function replaceInFiles(filePath: string, sourceResourceName: string, newResourceName: string) {
  const data = fs.readFileSync(filePath, 'utf8');
  const result = data.replace(new RegExp(sourceResourceName, 'g'), newResourceName);
  fs.writeFileSync(filePath, result, 'utf8');
}

function updateFileContents(
  newModule: string,
  sourceResourceName: string,
  newResourceName: string,
) {
  const newDir = `./src/${newModule}`;
  const files = fs.readdirSync(newDir);

  files.forEach((file) => {
    const filePath = path.join(newDir, file);

    if (fs.statSync(filePath).isFile()) {
      replaceInFiles(filePath, sourceResourceName, newResourceName);
      replaceInFiles(filePath, capitalize(sourceResourceName), capitalize(newResourceName));
      replaceInFiles(filePath, upperCase(sourceResourceName), upperCase(newResourceName));
    }
  });
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function upperCase(word: string): string {
  return word.toUpperCase();
}

function main() {
  const args = process.argv.slice(2);
  const [sourceModule, sourceResourceName, newModule, newResourceName] = args;

  checkArguments(args);
  checkSourceModuleExists(sourceModule);
  copyModule(sourceModule, newModule);
  renameFiles(newModule, sourceResourceName, newResourceName);
  updateFileContents(newModule, sourceResourceName, newResourceName);

  console.log(
    `Module ${sourceModule} duplicated and renamed to ${newModule} with resource names replaced.`,
  );
}

main();
