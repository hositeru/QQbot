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
  // methodExecutor.addMethod("旅馆", hotel);
  // methodExecutor.addMethod("龙人酒吧", bar);
  // methodExecutor.addMethod("娼馆", brothel);
}
async function fulishe(session: any,ctx: Context,data: Pick<ap01, Keys<ap01, any>>[]):Promise<string> {
  if(data[0].timestage!='早晨'&&data[0].timestage!='上午'&&data[0].timestage!='正午'&&data[0].timestage!='下午'&&data[0].timestage!='傍晚'&&data[0].timestage!='深夜'){
     return '现在还没有开业，请稍后再来。';
   }
   let str='你在福利社工作了一会儿。';
   str+='\n体力-30，精力-30，饱食度-30，GP+5000';
   let incap=0;
   if(data[0].stamina<40||data[0].spirit<40||data[0].hunger<40){
    incap=1;
    str+='\n你体力不支晕倒了，被人抬去了旅馆房间。';
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
async function hotel(session: any,ctx: Context,data: Pick<ap01, Keys<ap01, any>>[]):Promise<string> {
  if(data[0].timestage!='早晨'&&data[0].timestage!='正午'&&data[0].timestage!='傍晚'){
     return '现在还没有开业，请稍后再来。';
   }
   let str='店长大叔给了你一份服务员的临时工作。';
   let data02 =await ctx.database.get('ap02', session.userId);
   let flg=false;
   if(data02!=null&&data02.length>=1){
     data02.forEach(item=>{
       if(item.name=="男式服务员制服"||item.name=="女式服务员制服"){
         flg=true;
       }
     })
   }
   str+='\n店长大叔：'
   let cloth=data[0].gender+'式服务员制服';
   if(!flg){
     if(data[0].gender=='女'){
       str+='小姑娘挺可爱的，'
       await ctx.database.create('ap02', { id: session.userId, name: '女式服务员制服' ,def:'可爱的女式服务员制服，裙子好像有点太短了',type:'衣服',quantity:1});
     }else{
       await ctx.database.create('ap02', { id: session.userId, name: '男式服务员制服' ,def:'一般的男式服务员制服，感觉跟自己有点不搭',type:'衣服',quantity:1});
     }
     str+='你第一次来，我给你发一套服务员制服吧。';

   }else{
     str+='今天也拜托你了哦。';
   }
   str+='\n你换上了服务员制服';
   if(data[0].gender=='女'){
   str+='，裙子短得感觉会被看到胖次';
   }
   str+='。';
   str+='你在旅馆工作了一会儿。';
   if(data[0].gender=='女'){
     str+='\n客人：哇！今天新来的女孩子好可爱啊！啊～看着她感觉我也充满活力了啊～！';
   }
   let sexP=0;
   let sexSts1=Tools.generateRandomNumber(1, 3);
   if(sexSts1==1){
    str+='\n（你被一位客人摸了一下屁股。性感值+10）';
    sexP+=10;
   }
   let sexSts2=Tools.generateRandomNumber(1, 3);
   if(sexSts2==1){
    str+='\n（你被一位客人摸了一下胸。性感值+10）';
    sexP+=10;
   }
   let sexSts3=Tools.generateRandomNumber(1, 3);
   if(sexSts3==1){
    str+='\n（你被一位客人摸了一下私处。性感值+20）';
    sexP+=20;
   }
   str+='\n店长大叔：真是帮大忙了！这是你的薪水！';
   str+='\n体力-30，精力-30，饱食度-30，GP+480';
   let incap=0;
   if(data[0].stamina<40||data[0].spirit<40||data[0].hunger<40){
    incap=1;
    str+='\n你体力不支晕倒了，被人抬去了旅馆房间。';
   }
   await ctx.database.set('ap01', session.userId, {
    stamina:data[0].stamina-30,
    spirit:data[0].spirit-30,
    hunger:data[0].hunger-30,
    incap:incap,
    goldc:data[0].goldc+480,
    cloth:cloth,
    timestage:Tools.getNextTime(data[0].timestage),
    acme:data[0].acme+sexP
  });
  return str;
}

async function bar(session: any,ctx: Context,data: Pick<ap01, Keys<ap01, any>>[]):Promise<string> {
  if(data[0].timestage!='深夜'&&data[0].timestage!='凌晨'){
     return '现在还没有开业，请稍后再来。';
   }
   let str='';
   let data02 =await ctx.database.get('ap02', session.userId);
   let flg=false;
   if(data02!=null&&data02.length>=1){
     data02.forEach(item=>{
       if(item.name=="兔女郎服"){
         flg=true;
       }
     })
   }
   str+='\n酒吧老板：'
   let cloth='兔女郎服';
   if(!flg){
     return '想在我们这里打工，你需要一件兔女郎服。'
   }else{
     str+='今天也拜托你了哦。';
   }
   str+='\n你换上了兔女郎服，感觉十分害羞。\n';
   str+='你开始在酒吧跳舞。';
   if(data[0].gender=='女'){
     str+='\n客人：哦！是新来的舞者啊！真是大饱眼福啊！';
   }
   let num=Tools.generateRandomNumber(0, 100);
   let times=Math.floor(num/10);
   let sanity=data[0].sanity;
   for(let i=0;i<times;i++){
    str+='\n你被一位客人灌了酒。理智-10';
    sanity-=10;
   }
  let sextimes=0;
  let EROS=0;
  if(sanity<=50){
    str+='\n你喝醉了。';
    if(data[0].estrus==1||data[0].virgn!=0){
      str+='\n客人们把喝醉了的你围了起来。';
      let sexnum=Tools.generateRandomNumber(0, 100);
      sextimes=Math.floor(sexnum/10);
      str+='\n生挿入+'+sextimes;
      str+='\n性感值+'+sextimes*10;
      str+='\n你获得了'+sexnum+'ml白浊液。\n'
       +'EROS+1。';
       Tools.get(ctx,session.userId,'白浊液',sexnum);
      EROS=1;
    }
  }

  let money=800+sextimes*500;
   str+='\n酒吧老板：作为新人来讲干得很不错啊！这是你今天的薪水！';
   str+='\n体力-40，精力-40，饱食度-40，GP+'+money;
   let incap=0;
   let locatUpd='龙人酒吧';
   if(data[0].stamina<60||data[0].spirit<60||data[0].hunger<60){
    incap=1;
    str+='\n你体力不支晕倒了，被人抬去了旅馆房间。';
    locatUpd='旅馆';
   }
   await ctx.database.set('ap01', session.userId, {
    stamina:data[0].stamina-40,
    spirit:data[0].spirit-40,
    hunger:data[0].hunger-40,
    sanity:sanity,
    incap:incap,
    evalue:data[0].evalue+EROS,
    goldc:data[0].goldc+money,
    cloth:cloth,
    timestage:Tools.getNextTime(data[0].timestage),
    acme:data[0].acme+sextimes*10,
    locat:locatUpd
  });
  return str;
}
async function brothel(session: any,ctx: Context,data: Pick<ap01, Keys<ap01, any>>[]):Promise<string> {
  if(data[0].timestage!='深夜'){
     return '现在还没有开业，请稍后再来。';
   }
   if(data[0].elevel<4){
     return '你感到非常的羞耻，对自己为什么会想来这里打工而感到震惊，你满脸通红地离开了。（LIMIT需达到4）';
   }
}