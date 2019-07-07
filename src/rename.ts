#!/usr/bin/env ts-node

import * as commander from 'commander';
import * as fs from 'fs-extra'; // fs throws when node types are unavailable in the current directory
import { parseTransformations, transform } from './utils';

commander
  .option('-f, --find <pattern>', 'Pattern to find against', '.+')
  .option('--flags <flags>', 'Pattern to find against', '')
  .option('-r, --replace <pattern>', 'Replacement pattern', '$&')
  .option(
    '-t, --transformations <array>',
    'Array of transformations to be applied in order',
    parseTransformations,
  )
  .option('-R, --recursive', 'Perform recursive rename')
  .parse(process.argv);

const { find, flags, replace, transformations, recursive } = commander;

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
