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
const composition_api_1 = require("@vue/composition-api");
const vue_extend_reactive_1 = require("vue-extend-reactive");
exports.default = useAsync;
function useAsync(fn) {
    const state = composition_api_1.reactive({
        error: undefined,
        result: undefined,
        status: 'standby',
    });
    const getters = composition_api_1.reactive({
        isStandby: composition_api_1.computed(() => state.status === 'standby'),
        isPending: composition_api_1.computed(() => state.status === 'pending'),
        isSettled: composition_api_1.computed(() => state.status === 'fulfilled' || state.status === 'rejected'),
        isFulfilled: composition_api_1.computed(() => getters.isSettled ? state.status === 'fulfilled' : undefined),
        isRejected: composition_api_1.computed(() => getters.isSettled ? state.status === 'rejected' : undefined),
        hasResult: composition_api_1.computed(() => getters.isSettled ? state.result != null : undefined),
        hasError: composition_api_1.computed(() => getters.isSettled ? state.error != null : undefined),
    });
    function start(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            state.error = undefined;
            state.result = undefined;
            state.status = 'pending';
            let result;
            try {
                result = yield fn(...args);
            }
            catch (error) {
                state.error = error;
                state.status = 'rejected';
                throw error;
            }
            state.error = null;
            state.result = result;
            state.status = 'fulfilled';
            return result;
        });
    }
    return vue_extend_reactive_1.extend(vue_extend_reactive_1.extend(state, getters), {
        start,
    });
}
exports.useAsync = useAsync;
