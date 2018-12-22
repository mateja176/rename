// fs throws when node types are unavailable in the current directory
import * as fs from "fs-extra";
import * as commander from "commander";
import transform from "./utils/transform";

commander
  .option("-m, --match <pattern>", "Pattern to match against", ".+")
  .option("-f, --flags <flags>", "Pattern to match against", "")
  .option("-r, --replace <pattern>", "Replacement pattern", "$&")
  .option(
    "-t, --transformations <array>",
    "Array of transformations to be applied in order",
    "[]"
  )
  .parse(process.argv);

const { match, flags, replace, transformations } = commander;

const transformationsArray = JSON.parse(transformations);

const currentDirectory = process.cwd();

fs.readdirSync(currentDirectory).forEach(node =>
  fs.rename(
    `${currentDirectory}/${node}`,
    `${currentDirectory}/${node.replace(
      new RegExp(match, flags),
      transformationsArray.length
        ? transform(replace)(transformationsArray)
        : replace
    )}`
  )
);
