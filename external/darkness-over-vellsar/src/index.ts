import { Session } from 'inspector'
import { Context, Schema,h } from 'koishi'
import { DB } from '../src/database'
export const name = 'darkness-over-vellsar'
export interface Config {}
export const inject = ['database']
export const Config: Schema<Config> = Schema.object({})
// 假设 Tables 类型包含 'foo' 这个键


export function apply(ctx: Context) {

  ctx.on('ready', async () => {
    await DB.initTable(ctx)
})
  // write your plugin here
  ctx.middleware(async (session,next)=>{
    if((session.content)=='查询作者'){
      //const TABLE = 1 === 1 ? 'bauserJP' : 1 === 1 ? 'bauserIN' : 'bauserCN'
      let name1 = await ctx.database.get('ap01', [1], ['name']);
      //ctx.database.getUser(platform, userId, fields);
      // Keys<Person, string>
      return (String(h('at',{id:(session.userId)}))+'ID：1的名字叫:'+name1[0].name);
    }
    if((session.content)=='序言'){
      //const TABLE = 1 === 1 ? 'bauserJP' : 1 === 1 ? 'bauserIN' : 'bauserCN'
      //let name1 = await ctx.database.get('ap01', [1], ['name']);
      //ctx.database.getUser(platform, userId, fields);
      // Keys<Person, string>
      return ('“威尔萨”是一个充满利爪、獠牙和战斗的漆黑世界。\n为了争夺沉睡中的\n“黑暗之王”绝对者的王座，\n魑魅魍魉陷入了无尽的冲突。\n永恒之夜即将结束，\n觉醒的时刻会到来吗？');
    }
    if((session.content)=='你好'){
      //const TABLE = 1 === 1 ? 'bauserJP' : 1 === 1 ? 'bauserIN' : 'bauserCN'
      //let name1 = await ctx.database.get('ap01', [1], ['name']);
      //ctx.database.getUser(platform, userId, fields);
      // Keys<Person, string>
      return (' …轮回吧…巡行吧…嗯哼哼～');
    }
    return next();
  })
}
