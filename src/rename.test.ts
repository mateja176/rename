// fs throws when node types are unavailable in the current directory
import * as commander from 'commander';
import * as fs from 'fs-extra';
import { transform } from './utils';

commander
  .option('-m, --match <pattern>', 'Pattern to match against', '.+')
  .option('-f, --flags <flags>', 'Pattern to match against', '')
  .option('-r, --replace <pattern>', 'Replacement pattern', '$&')
  .option(
    '-t, --transformations <array>',
    'Array of transformations to be applied in order',
    '[]',
  )
  .option('-R, --recursive', 'Perform recursive rename')
  .parse(process.argv);

const { match, flags, replace, transformations, recursive } = commander;

const transformationsArray = JSON.parse(transformations);

const currentDirectory = process.cwd();

const rename = (currentDirectory: string) => (node: string) =>
  fs.rename(
    `${currentDirectory}/${node}`,
    `${currentDirectory}/${node.replace(
      new RegExp(match, flags),
      transform(replace)(transformationsArray),
    )}`,
  );

const renameRecursively = (currentDirectory: string) => (node: string) => {
  const fullPathToNode = `${currentDirectory}/${node}`;

  if (fs.lstatSync(fullPathToNode).isDirectory()) {
    fs.readdirSync(fullPathToNode).forEach(renameRecursively(fullPathToNode));
  } else {
    rename(currentDirectory)(node);
  }
};

fs.readdirSync(currentDirectory).forEach(
  recursive ? renameRecursively(currentDirectory) : rename(currentDirectory),
);
