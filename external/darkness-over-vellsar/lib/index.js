"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.name = void 0;
const koishi_1 = require("koishi");
exports.name = 'darkness-over-vellsar';
exports.Config = koishi_1.Schema.object({});
function apply(ctx) {
    // write your plugin here
    ctx.middleware(async (session, next) => {
        if ((session.content) == '你好') {
            return (String((0, koishi_1.h)('at', { id: (session.userId) })) + '你好');
        }
        return next();
    });
}
exports.apply = apply;
