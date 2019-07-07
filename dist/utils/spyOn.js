"use strict";
exports.__esModule = true;
var value = function (label) { return function (a) {
    console.log(label + ":", a);
    return a;
}; };
exports.value = value;
var result = function (label) { return function (f) { return function () {
    var as = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        as[_i] = arguments[_i];
    }
    var result = f.apply(void 0, as);
    console.log(label + ":", result);
    return result;
}; }; };
exports.result = result;
var args = function (label) { return function (f) { return function () {
    var as = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        as[_i] = arguments[_i];
    }
    console.log(label + ":", as);
    return f.apply(void 0, as);
}; }; };
exports.args = args;
var valueDefault = value("value");
exports.valueDefault = valueDefault;
var resultDefault = result("result");
exports.resultDefault = resultDefault;
var argsDefault = args("args");
exports.argsDefault = argsDefault;
