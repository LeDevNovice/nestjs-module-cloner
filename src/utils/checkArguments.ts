export function checkArguments(args: string[]): void {
  if (args.length < 4) {
    throw new Error('Usage: nmc <sourceModule> <sourceResourceName> <newModule> <newResourceName>');
  }
}
