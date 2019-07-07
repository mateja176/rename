"use strict";
exports.__esModule = true;
var ramda_1 = require("ramda");
var transformMatch = function (transformations) { return function (match) {
    if (transformations && transformations.length) {
        return transformations.reduce(function (transformedMatch, transformation) { return transformedMatch[transformation](); }, match);
    }
    else {
        return match;
    }
}; };
exports.transform = function (replacement) { return function (transformations) { return function (match) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var wholeString = ramda_1.last(args);
    var transformedWholeString = transformMatch(transformations['$-1'])(wholeString);
    var transformedMatch = transformMatch(transformations['$&'])(match);
    var matches = args.slice(0, -2);
    var transformedMatches = matches.map(function (match, i) {
        return transformMatch(transformations["$" + i])(match);
    });
    var replacementResult = replacement
        .replace(/\$0/g, transformedWholeString)
        .replace(/\$&/g, transformedMatch)
        .replace(/\$(\d)/g, function (_, groupNumber) {
        var transformedCurrentMatch = transformedMatches[groupNumber - 1];
        if (transformedCurrentMatch) {
            return transformedCurrentMatch;
        }
        else {
            throw new Error("'" + groupNumber + "' does not represent a captured group number from 1 to '" + matches.length + "'\nReplacement pattern '" + replacement + "'\nCaptured groups '" + matches + "'");
        }
    });
    return replacementResult;
}; }; };
