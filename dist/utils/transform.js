"use strict";
exports.__esModule = true;
var transform = function (replacement) { return function (transformations) { return function () {
    var config = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        config[_i] = arguments[_i];
    }
    var _a = config.slice(-2), offset = _a[0], string = _a[1];
    var matches = config.slice(0, -2);
    var transformedMatches = transformations.map(function (transformation, i) {
        return matches[i][transformation]();
    });
    var allMatches = transformedMatches.concat(matches.slice(transformedMatches.length));
    return replacement
        .replace(/\$&/g, string)
        .replace(/\$(\d)/g, function (_, groupNumber) {
        var match = allMatches[groupNumber];
        if (match) {
            return match;
        }
        else {
            throw new Error("Replacement pattern '" + replacement + "' uses at least one group more than the number of captured groups\nWhere captured groups are '" + matches + "'");
        }
    });
}; }; };
exports["default"] = transform;
