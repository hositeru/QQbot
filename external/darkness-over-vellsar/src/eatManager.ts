import { Context } from "koishi";
import { Tools } from './tools'
export module EatManager {
    export async function eat(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
      if(data==null||data.length<1){
        return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
      }
    
      if(data[0].locat=='旅馆'){
        if(data[0].hunger>100){
          return '你太饱了，已经什么都吃不下了';
        }
        if(data[0].goldc<10){
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+10
          });
          return '你没有钱了。店长大叔看你可怜，端上来了一份剩菜。（饱食度+10）';
        }
        let num=Tools.generateRandomNumber(0, 2);
        switch (num) {
          case 0:
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+60,goldc:data[0].goldc-20
            });
            return '店长大叔端上来了一份魔红番茄三明治。\n魔红番茄三明治：夹着切片恶魔红番茄的精心制作的轻食。(金币-20，饱食度+60)';
          case 1:
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+40,spirit:data[0].spirit+20,goldc:data[0].goldc-20,
            });
            return '店长大叔端上来了一份布鲁噗噜噗噜。\n布鲁噗噜噗噜：使用了阿莫纳茨酱制作成的甜点。(金币-20，饱食度+40，精神+20)';
          case 2:
            await ctx.database.set('ap01', session.userId, {
              acme:data[0].acme+100,goldc:data[0].goldc-20,estrus:1
            });
            return '店长大叔端上来了一份奇怪饮料。\n你喝完之后身体变得有点奇怪，感觉热热的。(金币-20，性感值+100)';
          default:return '店长大叔不见了。';
        }
      }
      return '你所在地点无法就餐';
    }

}