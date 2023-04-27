"use strict";
exports.__esModule = true;
exports.Mps = void 0;
var mutation_1 = require("@/store/logi/production/mps/mutation");
var action_1 = require("@/store/logi/production/mps/action");
var Mps = /** @class */ (function () {
    function Mps() {
        this.contractDetailList = [];
    }
    return Mps;
}());
exports.Mps = Mps;
var Production = {
    namespaced: true,
    state: new Mps(),
    mutations: mutation_1["default"],
    actions: action_1["default"]
};
exports["default"] = Production;
