"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const isEmail_1 = __importDefault(require("./isEmail"));
(0, globals_1.describe)("utils", function () {
    (0, globals_1.test)("should check email validity", function () {
        (0, globals_1.expect)((0, isEmail_1.default)("some@email.com")).toBe(true);
        (0, globals_1.expect)((0, isEmail_1.default)("some@email")).toBe(false);
    });
});
