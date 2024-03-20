import { Context, Keys } from "koishi";
import { Tools } from './tools'
import { ap01 } from "./database";
export module WorkManager {
    export async function work(session: any,ctx: Context):Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
      Tools.actionCheck(data);
      if(data[0].hunger<=0){
        return '你太饿了，提不起力气工作。'
      }
      if(data[0].spirit<=0){
        return '你太困了，没有精力工作。'
      }
      if(data[0].stamina<=0){
        return '你太累了，没有力气工作。'
      }
      const methodExecutor = new Tools.MethodExecutor();
      workInit(methodExecutor);
      return methodExecutor.executeMethod(data[0].locat, session,ctx,data);
    }
}

function workInit(methodExecutor: Tools.MethodExecutor) {
  methodExecutor.addMethod("福利社", fulishe);
}
async function fulishe(session: any,ctx: Context,data: Pick<ap01, Keys<ap01, any>>[]):Promise<string> {
  if(data[0].timestage!='早晨'&&data[0].timestage!='上午'&&data[0].timestage!='正午'&&data[0].timestage!='下午'&&data[0].timestage!='傍晚'&&data[0].timestage!='深夜'){
     return '现在还没有开业，请稍后再来。';
   }
   let str='你在福利社工作了一会儿。';
   str+='\n体力-30，精力-30，饱食度-30，GP+5000';
   let incap=0;
   if(data[0].stamina<30||data[0].spirit<30||data[0].hunger<30){
    incap=1;
    str+='\n你体力不支晕倒了。';
   }
   await ctx.database.set('ap01', session.userId, {
    stamina:data[0].stamina-30,
    spirit:data[0].spirit-30,
    hunger:data[0].hunger-30,
    incap:incap,
    goldc:data[0].goldc+5000,
    timestage:Tools.getNextTime(data[0].timestage),
  });
  return str;
}