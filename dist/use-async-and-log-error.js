"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncAndLogError = void 0;
const use_async_with_handler_1 = require("./use-async-with-handler");
function useAsyncAndLogError(fn) {
    return use_async_with_handler_1.useAsyncWithHandler(fn, {
        onRejected: (error) => console.error(error),
    });
}
exports.useAsyncAndLogError = useAsyncAndLogError;
