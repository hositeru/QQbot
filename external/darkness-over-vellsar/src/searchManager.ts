import { Context, Keys } from "koishi";
import { Tools } from './tools'
import { ap01 } from "./database";
import { EventMaster } from "./eventMaster";
export module SearchManager {
    export async function search(session: any,ctx: Context):Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
      Tools.actionCheck(data);
      const methodExecutor = new Tools.MethodExecutor();
      searchInit(methodExecutor);
      return methodExecutor.executeMethod(data[0].locat, session,ctx,data);
    }
}



function searchInit(methodExecutor: Tools.MethodExecutor) {
  methodExecutor.addMethod("地下街", undergroundStreets);
}

async function undergroundStreets(session: any,ctx: Context,data: Pick<ap01, Keys<ap01, any>>[]):Promise<string> {
const eventlist=EventMaster.getEventList('H','地下街',data[0].elevel);
let sts=Tools.generateRandomNumber(0, eventlist.length);
let event=eventlist[sts];
let str=event.def;
let incap=0;
if(event.quantity>0){
  Tools.get(ctx,session.userId,event.item,event.quantity);
}
let preg=data[0].preg;
if(event.item=='白浊液'){
  let pregSts=Tools.generateRandomNumber(0, 30);
  if(pregSts==0){
    preg=1;
    str+='\n你感觉肚子有点奇怪。';
  }
}
if(data[0].stamina<=0||data[0].spirit<=0||data[0].hunger<=0){
  incap=1;
  str+='\n你气绝了。';
 }
await ctx.database.set('ap01', session.userId, {
  stamina:data[0].stamina-5,
  spirit:data[0].spirit-5,
  hunger:data[0].hunger-5,
  incap:incap,
  evalue:data[0].evalue+1,
  preg:preg,
  acme:data[0].acme+event.acme
});
return event.def;







  
  // if(data[0].timestage!='早晨'&&data[0].timestage!='正午'&&data[0].timestage!='傍晚'){
  //    return '现在还没有开业，请稍后再来。';
  //  }
  //  let str='店长大叔给了你一份服务员的临时工作。';
  //  let data02 =await ctx.database.get('ap02', session.userId);
  //  let flg=false;
  //  if(data02!=null&&data02.length>=1){
  //    data02.forEach(item=>{
  //      if(item.name=="男式服务员制服"||item.name=="女式服务员制服"){
  //        flg=true;
  //      }
  //    })
  //  }
  //  str+='\n店长大叔：'
  //  let cloth=data[0].gender+'式服务员制服';
  //  if(!flg){
  //    if(data[0].gender=='女'){
  //      str+='小姑娘挺可爱的，'
  //      await ctx.database.create('ap02', { id: session.userId, name: '女式服务员制服' ,def:'可爱的女式服务员制服，裙子好像有点太短了',type:'衣服',quantity:1});
  //    }else{
  //      await ctx.database.create('ap02', { id: session.userId, name: '男式服务员制服' ,def:'一般的男式服务员制服，感觉跟自己有点不搭',type:'衣服',quantity:1});
  //    }
  //    str+='你第一次来，我给你发一套服务员制服吧。';

  //  }else{
  //    str+='今天也拜托你了哦。';
  //  }
  //  str+='\n你换上了服务员制服';
  //  if(data[0].gender=='女'){
  //  str+='，裙子短得感觉会被看到胖次';
  //  }
  //  str+='。';
  //  str+='你在旅馆工作了一会儿。';
  //  if(data[0].gender=='女'){
  //    str+='\n客人：哇！今天新来的女孩子好可爱啊！啊～看着她感觉我也充满活力了啊～！';
  //  }
  //  let sexP=0;
  //  let sexSts1=Tools.generateRandomNumber(1, 3);
  //  if(sexSts1==1){
  //   str+='\n（你被一位客人摸了一下屁股。性感值+10）';
  //   sexP+=10;
  //  }
  //  let sexSts2=Tools.generateRandomNumber(1, 3);
  //  if(sexSts2==1){
  //   str+='\n（你被一位客人摸了一下胸。性感值+10）';
  //   sexP+=10;
  //  }
  //  let sexSts3=Tools.generateRandomNumber(1, 3);
  //  if(sexSts3==1){
  //   str+='\n（你被一位客人摸了一下私处。性感值+20）';
  //   sexP+=20;
  //  }
  //  str+='\n店长大叔：真是帮大忙了！这是你的薪水！';
  //  str+='\n体力-30，精力-30，饱食度-30，金币+480';
  //  let incap=0;
  //  if(data[0].stamina<40||data[0].spirit<40||data[0].hunger<40){
  //   incap=1;
  //   str+='\n你体力不支晕倒了，被人抬去了旅馆房间。';
  //  }
  //  await ctx.database.set('ap01', session.userId, {
  //   stamina:data[0].stamina-30,
  //   spirit:data[0].spirit-30,
  //   hunger:data[0].hunger-30,
  //   incap:incap,
  //   goldc:data[0].goldc+480,
  //   cloth:cloth,
  //   timestage:Tools.getNextTime(data[0].timestage),
  //   acme:data[0].acme+sexP
  // });
  // return str;
}
