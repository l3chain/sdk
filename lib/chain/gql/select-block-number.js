"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectBlockNumber = void 0;
var selectBlockNumber = function () { return "\n{\n  blocks(orderDirection: desc, orderBy: number, first: 1) {\n    number\n  }\n}\n"; };
exports.selectBlockNumber = selectBlockNumber;
