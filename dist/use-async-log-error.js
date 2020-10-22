"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncLogError = void 0;
const use_async_with_handler_1 = require("./use-async-with-handler");
function useAsyncLogError(fn) {
    return use_async_with_handler_1.useAsyncWithHandler(fn, {
        onRejected: (error) => console.error(error),
    });
}
exports.useAsyncLogError = useAsyncLogError;
