// fs throws when node types are unavailable in the current directory
import * as fs from 'fs-extra';
import { createRenameCommander, transform } from './utils';

const {
  find,
  flags,
  replace,
  transformations,
  recursive,
} = createRenameCommander();

const transformationsArray = JSON.parse(transformations);

const currentDirectory = process.cwd();

const rename = (currentDirectory: string) => (node: string) =>
  fs.rename(
    `${currentDirectory}/${node}`,
    `${currentDirectory}/${node.replace(
      new RegExp(find, flags),
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
