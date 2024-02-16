import { Context } from "koishi";
import { Tools } from './tools'
export module SexManager {
    //自慰
    export async function masturbation(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
      let check=Tools.sexCheck(data);
      if(check!=''){
        return check;
      };
      if(data[0].acme<100){
        return '你现在没有这个心情';
      }
      await ctx.database.set('ap01', session.userId, {
        stamina:data[0].stamina-5,
        spirit:data[0].spirit-5,
        hunger:data[0].hunger-5,
        acme:0,
        evalue:data[0].evalue+1,
        estrus:0
      });
      let liquid;
      if(data[0].gender=='男'){
        liquid='白浊液';
      }else{
        liquid='圣水';
      }
      Tools.get(ctx,session.userId,liquid,data[0].acme/10);
      return '你开始摩擦你的私处。\n（呀。。。啊。。。嗯~♡还。。想要。。。更多的。。。舒服的~♡）\n你获得了'+data[0].acme/10+'ml'
            +liquid
            +'。\n体力-5，精神-5，饱食-5，性感值-'
            +data[0].acme
            +',EROS+1。';
    }
    //売春
    export async function prostitution(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
      let check=Tools.sexCheck(data);
      if(check!=''){
        return check;
      };
      if(data[0].estrus!=1&&data[0].virgn==0){
        return '你突然对自己的行为感到强烈的羞耻，你阻止了自己。';
      }
      let num=Tools.generateRandomNumber(0, 100);
      let pregNum=Tools.generateRandomNumber(0, 30);
      let preg=0;
      if((pregNum==1||data[0].preg)&&data[0].gender!='男'){
        preg=1;
      }
      let money=num*50
      await ctx.database.set('ap01', session.userId, {
        stamina:data[0].stamina-40,
        spirit:data[0].spirit-40,
        hunger:data[0].hunger-40,
        acme:0,
        evalue:data[0].evalue+1,
        estrus:0,
        goldc:data[0].goldc+money,
        virgn:1,
        preg:preg
      });
      let times=Math.floor(num/10);
      Tools.get(ctx,session.userId,'白浊液',data[0].acme);
      let str='你抓住店长大叔的胳膊，两眼爱心得看着他，店长大叔将你带到了地下室。\n（嗯。。。啊。。。进来了~♡最里面。。。顶。。到了。。好舒服~♡）'
      str+='\n绝顶次数+'+times;
      str+='\n生挿入+3\n你获得了'+num+'ml白浊液。\n体力-40，精神-40，饱食-40，性感值-'
            +data[0].acme+'，金币+'+num*100
            +'，EROS+1。';
      if(pregNum==1&&data[0].gender!='男'){
        str+='\n你感觉你的肚子有点不对劲。'
      }
      return str;
    }
}