import { Session } from 'inspector'
import { Context, Schema,h } from 'koishi'
import { DB } from './database'
export const name = 'darkness-over-vellsar'
export interface Config {}
export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.middleware(async (session,next)=>{
    if(!session.content.startsWith('#')){
     return next();
    }
    ctx.on('ready', async () => {
      await DB.initTable(ctx)
    })

    if(session.content=='#创建角色'){
      let data = await ctx.database.get('ap01', session.userId);
      if(data!=null&&data.length>0){
        return '你已经创建过角色了';
      }else{
        return '欢迎来到威尔萨，请发送 #决定名字 XXX 来决定你的角色名字。\n一经决定无法更改。';
      }
    }

    ctx.command('#决定名字 <name:string>').action(async ({session},...args)=>{
      let data =await ctx.database.get('ap01', session.userId, ['name'])
      if(data!=null&&data.length>0){
        return '你已经决定过你的名字了。';
      }else{
        await ctx.database.create('ap01', { id: session.userId, name: args[0] ,logindate:formatDate(),bday:formatDate()});
        return ('你的名字叫'+args[0]+'\n请发送 #种族列表 来查看所有种族\n请发送 #选择种族 XXX 来选择你的种族');
      }
    })

    if(session.content=='#种族列表'){
      return '【人族】\n已经灭绝\n\n\n【妖族】\n能细分为众多种族，甚至单一个体，统称为妖族,常年内战\n\n\n【龙人】\n威尔萨最大的族群，有明确的上下关系\n\n\n【吸血鬼】\n被其他种族合力讨伐，几乎绝迹';

    }

    ctx.command('#选择种族 <name:string>').action(async ({session},...args)=>{
      let data =await ctx.database.get('ap01', session.userId, ['race'])
      if(data==null||data.length<1){
        return '你还没决定过你的名字。\n请发送 #决定名字 XXX 来决定你的角色名字。';
      }
      if(data[0].race!=null&&data[0].race.length>0){
        return '你已经选择过你的种族了。'+data[0].race;
      }else{
        const allowedValues = ['人族', '妖族', '龙人', '吸血鬼'];
        if (allowedValues.includes(args[0])) {
          await ctx.database.set('ap01', session.userId, {
            race: args[0],
          })
          return ('你的种族是'+args[0]+'\n请发送 #选择性别 来选择你的性别（男/女）');
        } else {
          return '这里不存在这样的种族';
        }
      }
    })

    ctx.command('#选择性别 <name:string>').action(async ({session},...args)=>{
      let data =await ctx.database.get('ap01', session.userId, ['gender'])
      if(data==null||data.length<1){
        return '你还没决定过你的名字。\n请发送 #决定名字 XXX 来决定你的角色名字。';
      }
      if(data[0].gender!=null&&data[0].gender.length>0){
        return '你已经选择过你的性别了。';
      }else{
        const allowedValues = ['男', '女'];
        if (allowedValues.includes(args[0])) {
          await ctx.database.set('ap01', session.userId, {
            gender: args[0],
          })
          return ('你的性别是'+args[0]+'\n请发送 #完成角色创建');
        } else {
          return '这里不存在这样的性别';
        }
      }
    })
    if(session.content=='#完成角色创建'){
      let data =await ctx.database.get('ap01', session.userId)
      if(data==null||data.length<1){
        return '你还没决定过你的名字。\n请发送 #决定名字 XXX 来决定你的角色名字。';
      }
      if(data[0].race==null||data[0].race.length<1){
        return '你还没决定过你的种族。\n请发送 #种族列表 来查看所有种族\n请发送 #选择种族 XXX 来选择你的种族';
      }
      if(data[0].gender==null||data[0].gender.length<1){
        return '你还没决定过你的性别。\n请发送 #选择性别 XX 来选择你的性别（男/女）';
      }
      return '恭喜你完成角色创建\n请发送 #常用指令一览 来查看常用指令';
    }
    if(session.content=='#常用指令一览'){
      return '#属性\n#装饰\n#装备\n#战斗配置\n#购买n个XXX\n#卖出n个XXX\n#去XXX\n#仓库\n#醒来\n#睡觉';
    }
    if(session.content=='#属性'){
      let data =await ctx.database.get('ap01', session.userId)
      let str='';
      str='lv.'
      +data[0].level
      +data[0].name+'（';
      
      
      if(data[0].virgn!=0){
        str+='非';
      }
      str+='处'+data[0].gender+'）'
      +'\n'+'============================'+'\n'
      +'种族：'+data[0].race+'\n'
      +'性别：'+data[0].gender+'\n'
      +'饥饿度：'+data[0].hunger+'\n'
      +'精神值：'+data[0].spirit+'\n'
      +'健康度：'+data[0].health+'\n'
      +'理智：'+data[0].sanity+'\n'
      +'羞耻心：'+data[0].shame+'\n'
      +'堕落度：'+data[0].evalue+'\n'
      +'H数值：'+data[0].evalue+'\n'
      +'H等级：'+data[0].elevel+'\n'
      +'异常状态：无';
      return str;  
    }
    if(session.content=='#装饰'){

    }
    if(session.content=='#装备'){

    }
    if(session.content=='#战斗配置'){

    }
    if(session.content.startsWith('#购买')){

    }
    if(session.content.startsWith('#卖出')){

    }
    if(session.content.startsWith('#去')){

    }
    if(session.content=='#战斗'){

    }
    if(session.content=='#仓库'){

    }
    if(session.content=='#醒来'){

    }
    if(session.content=='#睡觉'){

    }
    return next();
  })
}
function formatDate(): string {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}