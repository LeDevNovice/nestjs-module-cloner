export function checkArguments(args: string[]): void {
  if (args.length < 4) {
    throw new Error(
      'Usage: nestjs-module-cloner <sourceModule> <sourceResourceName> <newModule> <newResourceName>',
    );
  }
}
