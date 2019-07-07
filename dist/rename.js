#!/usr/bin/env node
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var utils_1 = require("./utils");
var _a = utils_1.createRenameCommander(), path = _a.path, recursive = _a.recursive, renameConfig = __rest(_a, ["path", "recursive"]);
var rename = utils_1.configureRename(renameConfig);
var currentDirectory = process.cwd();
if (recursive) {
    utils_1.renameRecursively(rename)(currentDirectory)(path);
}
else {
    rename(currentDirectory)(path);
}
