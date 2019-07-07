"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var commander = require("commander");
var fs = require("fs-extra");
var path_1 = require("path");
var transform_1 = require("./transform");
exports.createRenameCommander = function () {
    return commander
        .option('-p, --path <path>', 'Target relative path')
        .option('-f, --find <pattern>', 'Pattern to find against')
        .option('--flags <flags>', 'RegExp flags', '')
        .option('-r, --replace <pattern>', 'Replacement pattern')
        .option('-t, --transformations <array>', 'Array of transformations to be applied in order', JSON.parse, {})
        .option('-R, --recursive', 'Perform recursive rename')
        .parse(process.argv);
};
exports.configureRename = function (_a) {
    var find = _a.find, flags = _a.flags, replace = _a.replace, transformations = _a.transformations;
    return function (currentDirectory) { return function (path) {
        var absolutePath = path_1.join(currentDirectory, path);
        fs.rename(absolutePath, path_1.join(currentDirectory, path.replace(new RegExp(find, flags), transform_1.transform(replace)(transformations))));
    }; };
};
exports.renameRecursively = function (rename) { return function (currentDirectory) { return function (path) {
    var absolutePath = path_1.join(currentDirectory, path);
    if (fs.lstatSync(absolutePath).isDirectory()) {
        fs.readdirSync(absolutePath).forEach(exports.renameRecursively(rename)(absolutePath));
    }
    else {
        rename(currentDirectory)(path);
    }
}; }; };
__export(require("./spyOn"));
__export(require("./transform"));
