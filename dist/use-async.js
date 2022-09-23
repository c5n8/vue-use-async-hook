"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsync = void 0;
const vue_1 = require("vue");
const vue_extend_reactive_1 = require("vue-extend-reactive");
exports.default = useAsync;
function useAsync(fn) {
    const state = (0, vue_1.reactive)({
        status: 'standby',
        result: undefined,
        error: undefined,
    });
    const getters = (0, vue_1.reactive)({
        isStandby: (0, vue_1.computed)(() => state.status === 'standby'),
        isPending: (0, vue_1.computed)(() => state.status === 'pending'),
        isSettled: (0, vue_1.computed)(() => state.status === 'fulfilled' || state.status === 'rejected'),
        isFulfilled: (0, vue_1.computed)(() => getters.isSettled ? state.status === 'fulfilled' : undefined),
        isRejected: (0, vue_1.computed)(() => getters.isSettled ? state.status === 'rejected' : undefined),
        hasResult: (0, vue_1.computed)(() => getters.isSettled ? state.result != null : undefined),
        hasError: (0, vue_1.computed)(() => getters.isSettled ? state.error != null : undefined),
    });
    function fnReactive(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            state.status = 'pending';
            state.result = undefined;
            state.error = undefined;
            try {
                const result = yield fn(...args);
                state.status = 'fulfilled';
                state.result = result;
                state.error = null;
                return result;
            }
            catch (error) {
                state.status = 'rejected';
                state.error = error;
                throw error;
            }
        });
    }
    return [
        fnReactive,
        (0, vue_extend_reactive_1.extend)((0, vue_1.reactive)({
            status: (0, vue_1.computed)(() => state.status),
            result: (0, vue_1.computed)(() => state.result),
            error: (0, vue_1.computed)(() => state.error),
        }), getters),
    ];
}
exports.useAsync = useAsync;
