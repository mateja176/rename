#!/usr/bin/env ts-node

import * as commander from "commander";
import * as fs from "fs-extra"; // fs throws when node types are unavailable in the current directory
import { Transformations } from "./models/transformation";
import transform from "./utils/transform";

const parseTransformations = (transformations: string) =>
  transformations.split(",") as Transformations;

commander
  .option("-m, --match <pattern>", "Pattern to match against", ".+")
  .option("-f, --flags <flags>", "Pattern to match against", "")
  .option("-r, --replace <pattern>", "Replacement pattern", "$&")
  .option(
    "-t, --transformations <array>",
    "Array of transformations to be applied in order",
    parseTransformations,
  )
  .option("-R, --recursive", "Perform recursive rename")
  .parse(process.argv);

const { match, flags, replace, transformations, recursive } = commander;

const currentDirectory = process.cwd();

const rename = (currentDirectory: string) => (node: string) =>
  fs.rename(
    `${currentDirectory}/${node}`,
    `${currentDirectory}/${node.replace(
      new RegExp(match, flags),
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
