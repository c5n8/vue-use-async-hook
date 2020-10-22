"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAsyncIgnoringError = void 0;
const use_async_with_handler_1 = require("./use-async-with-handler");
function useAsyncIgnoringError(fn) {
    return use_async_with_handler_1.useAsyncWithHandler(fn, {
        onRejected: () => { },
    });
}
exports.useAsyncIgnoringError = useAsyncIgnoringError;
