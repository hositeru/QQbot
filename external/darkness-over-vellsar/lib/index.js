"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.inject = exports.name = void 0;
const koishi_1 = require("koishi");
const database_1 = require("../src/database");
exports.name = 'darkness-over-vellsar';
exports.inject = ['database'];
exports.Config = koishi_1.Schema.object({});
// 假设 Tables 类型包含 'foo' 这个键
function apply(ctx) {
    ctx.on('ready', async () => {
        await database_1.DB.initTable(ctx);
    });
    // write your plugin here
    ctx.middleware(async (session, next) => {
        if ((session.content) == '你好') {
            //const TABLE = 1 === 1 ? 'bauserJP' : 1 === 1 ? 'bauserIN' : 'bauserCN'
            let name1 = await ctx.database.get('ap01', [1], ['name']);
            //ctx.database.getUser(platform, userId, fields);
            // Keys<Person, string>
            return (String((0, koishi_1.h)('at', { id: (session.userId) })) + name1[0].name);
        }
        return next();
    });
}
exports.apply = apply;
