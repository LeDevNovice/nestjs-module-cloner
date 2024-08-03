import { checkArguments } from './utils/checkArguments';
import { checkSourceModuleExists } from './utils/fileUtils/checkSourceModuleExists';
import { copyModule } from './utils/fileUtils/copyModule';
import { renameFiles } from './utils/fileUtils/renameFiles';
import { updateFileContents } from './utils/fileUtils/updateFileContents';

function main(): void {
  const args = process.argv.slice(2);
  const [sourceModule, sourceResourceName, newModule, newResourceName] = args;

  try {
    checkArguments(args);
    checkSourceModuleExists(sourceModule);
    copyModule(sourceModule, newModule);
    renameFiles(newModule, sourceResourceName, newResourceName);
    updateFileContents(newModule, sourceResourceName, newResourceName);

    console.log(
      `Module ${sourceModule} duplicated and renamed to ${newModule} with resource names replaced.`,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
}

main();
