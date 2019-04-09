#!/usr/bin/env ts-node
"use strict";
exports.__esModule = true;
var fs = require("fs-extra");
var commander = require("commander");
var transform_1 = require("./utils/transform");
commander
    .option("-m, --match <pattern>", "Pattern to match against", ".+")
    .option("-f, --flags <flags>", "Pattern to match against", "")
    .option("-r, --replace <pattern>", "Replacement pattern", "$&")
    .option("-t, --transformations <array>", "Array of transformations to be applied in order", "[]")
    .option("-R, --recursive", "Perform recursive rename")
    .parse(process.argv);
var match = commander.match, flags = commander.flags, replace = commander.replace, transformations = commander.transformations, recursive = commander.recursive;
var transformationsArray = JSON.parse(transformations);
var currentDirectory = process.cwd();
var rename = function (currentDirectory) { return function (node) {
    return fs.rename(currentDirectory + "/" + node, currentDirectory + "/" + node.replace(new RegExp(match, flags), transform_1["default"](replace)(transformationsArray)));
}; };
var renameRecursively = function (currentDirectory) { return function (node) {
    var fullPathToNode = currentDirectory + "/" + node;
    if (fs.lstatSync(fullPathToNode).isDirectory()) {
        fs.readdirSync(fullPathToNode).forEach(renameRecursively(fullPathToNode));
    }
    else {
        rename(currentDirectory)(node);
    }
}; };
fs.readdirSync(currentDirectory).forEach(recursive ? renameRecursively(currentDirectory) : rename(currentDirectory));
