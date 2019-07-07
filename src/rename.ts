#!/usr/bin/env ts-node

import * as fs from 'fs-extra'; // fs throws when node types are unavailable in the current directory
import { createRenameCommander, transform } from './utils';

const {
  find,
  flags,
  replace,
  transformations,
  recursive,
} = createRenameCommander();

const currentDirectory = process.cwd();

const rename = (currentDirectory: string) => (node: string) =>
  fs.rename(
    `${currentDirectory}/${node}`,
    `${currentDirectory}/${node.replace(
      new RegExp(find, flags),
      transform(replace)(transformations),
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
