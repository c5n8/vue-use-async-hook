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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncWithHandler = void 0;
const use_async_1 = __importDefault(require("./use-async"));
function useAsyncWithHandler(fn, { onFulfilled, onRejected, onSettled, }) {
    const [_call, snapshot] = (0, use_async_1.default)(fn);
    function call(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                result = yield _call(...args);
            }
            catch (error) {
                onRejected === null || onRejected === void 0 ? void 0 : onRejected(error);
                return undefined;
            }
            finally {
                onSettled === null || onSettled === void 0 ? void 0 : onSettled();
            }
            onFulfilled === null || onFulfilled === void 0 ? void 0 : onFulfilled(result);
            return result;
        });
    }
    return [call, snapshot];
}
exports.useAsyncWithHandler = useAsyncWithHandler;
