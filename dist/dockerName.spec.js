"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const dockerName_1 = __importDefault(require("./dockerName"));
(0, globals_1.describe)("dockerName", () => {
    (0, globals_1.test)("should return the correct name", () => {
        (0, globals_1.expect)((0, dockerName_1.default)("-")).toBeDefined();
    });
});
