"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncLogError = void 0;
const use_async_handler_1 = require("./use-async-handler");
function useAsyncLogError(fn) {
    return use_async_handler_1.useAsyncHandler(fn, {
        onRejected: (error) => console.error(error),
    });
}
exports.useAsyncLogError = useAsyncLogError;
