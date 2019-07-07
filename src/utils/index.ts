import * as commander from 'commander';
import * as fs from 'fs-extra';
import { join } from 'path';
import { RenameCommanderParams, SimpleRenameCommanderParams } from '../models';
import { transform } from './transform';

export const createRenameCommander = () =>
  (commander
    .option('-p, --path <path>', 'Target relative path')
    .option('-f, --find <pattern>', 'Pattern to find against')
    .option('--flags <flags>', 'RegExp flags', '')
    .option('-r, --replace <pattern>', 'Replacement pattern')
    .option(
      '-t, --transformations <array>',
      'Array of transformations to be applied in order',
      JSON.parse,
      {},
    )
    .option('-R, --recursive', 'Perform recursive rename')
    .parse(process.argv) as unknown) as RenameCommanderParams;

export const configureRename = ({
  find,
  flags,
  replace,
  transformations,
}: SimpleRenameCommanderParams) => (currentDirectory: string) => (
  path: string,
) => {
  const absolutePath = join(currentDirectory, path);

  fs.rename(
    absolutePath,
    join(
      currentDirectory,
      path.replace(
        new RegExp(find, flags),
        transform(replace)(transformations),
      ),
    ),
  );
};

export type Rename = ReturnType<typeof configureRename>;

export const renameRecursively = (rename: Rename) => (
  currentDirectory: string,
) => (path: string) => {
  const absolutePath = join(currentDirectory, path);

  if (fs.lstatSync(absolutePath).isDirectory()) {
    fs.readdirSync(absolutePath).forEach(
      renameRecursively(rename)(absolutePath),
    );
  } else {
    rename(currentDirectory)(path);
  }
};

export * from './spyOn';
export * from './transform';
