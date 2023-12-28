import { Session } from 'inspector'
import { Context, Schema,h } from 'koishi'

export const name = 'darkness-over-vellsar'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  // write your plugin here
  ctx.middleware(async (session,next)=>{
    if((session.content)=='你好'){
      return (String(h('at',{id:(session.userId)}))+'你好');
    }
    return next();
  })
}
