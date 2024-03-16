import { Context } from "koishi";
import { Tools } from './tools'
export module EatManager {
    export async function eat(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
      if(data==null||data.length<1){
        return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
      }
    
      if(data[0].locat=='餐厅'){
        if(data[0].hunger>100){
          return '你太饱了，已经什么都吃不下了';
        }
        if(data[0].goldc<10){
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+10
          });
          return '你没有钱了。你要了一份剩菜。（饱食度+10）';
        }
        let num=Tools.generateRandomNumber(0, 2);
        switch (num) {
          case 0:
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+100,goldc:data[0].goldc-1000
            });
            return '你点了一份披萨。\n(GP-1000，饱食度+100，精神+30)';
          case 1:
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+40,spirit:data[0].spirit+20,goldc:data[0].goldc-500,
            });
            return '你点了一份热狗堡。\n(GP-500，饱食度+40，精神+20)';
          case 2:
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+50,spirit:data[0].spirit+10,goldc:data[0].goldc-500,
            });
            return '你点了一份汉堡。\n(GP-500，饱食度+50，精神+10)';
          default:;
        }
      }
      return '你所在地点无法就餐';
    }

}