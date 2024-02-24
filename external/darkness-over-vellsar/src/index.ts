import { Session } from 'inspector'
import { Context, Schema,h } from 'koishi'
import { DB } from './database'
import { ItemMaster } from './itemMaster'
import { ShopMaster } from './shopMaster'
import { WorkManager } from './workManager'
import { Tools } from './tools'
import { pathToFileURL } from 'url'
import { resolve } from 'path'
import { EatManager } from './eatManager'
import { SexManager } from './sexManager'
export const name = 'darkness-over-vellsar'
export interface Config {}
export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.middleware(async (session,next)=>{
    console.log(session.content);
    let str='';
    if(session.content.startsWith('<at id="8503773913771718566"/>')){
      str=extractContentAfterSecondSpace(session.content);
     }else if(session.content.startsWith('#')){
      str=session.content;
     }else{
      return next();
     }
    ctx.on('ready', async () => {
      await DB.initTable(ctx)
    })

    
    const methodExecutor = new Tools.MethodExecutor();
    init(methodExecutor)
    return methodExecutor.executeMethod(extractCommand(str), session, ctx);
  })
}

function init(methodExecutor:Tools.MethodExecutor): void {
  methodExecutor.addMethod("/创建角色", createChara);
  methodExecutor.addMethod("/决定名字", decideName);
  methodExecutor.addMethod("/种族列表", getRaceList);
  methodExecutor.addMethod("/选择种族", selectRace);
  methodExecutor.addMethod("/选择性别", selectGender);
  methodExecutor.addMethod("/完成角色创建", complete);
  methodExecutor.addMethod("/属性", parameter);
  methodExecutor.addMethod("#属性", parameter);  
  methodExecutor.addMethod("#装饰", decoration);
  methodExecutor.addMethod("#装备", equipment);
  methodExecutor.addMethod("#战斗属性", battleInfo);
  methodExecutor.addMethod("#购买", startsWithPurchase);
  methodExecutor.addMethod("#卖出", startsWithSell);
  methodExecutor.addMethod("#去", startsWithGo);
  methodExecutor.addMethod("#使用", use);
  methodExecutor.addMethod("#战斗", battle);
  methodExecutor.addMethod("#逃跑", run);
  methodExecutor.addMethod("#选择", select);
  methodExecutor.addMethod("#背包", inventory);
  methodExecutor.addMethod("#醒来", wakeUp);
  methodExecutor.addMethod("#睡觉", sleep);
  methodExecutor.addMethod("#查看", info);
  methodExecutor.addMethod("#地图", map);
  methodExecutor.addMethod("#离开", goOut);
  methodExecutor.addMethod("#help", help);
  methodExecutor.addMethod("/背包", inventory);
  methodExecutor.addMethod("/醒来", wakeUp);
  methodExecutor.addMethod("/睡觉", sleep);
  methodExecutor.addMethod("/查看", info);
  methodExecutor.addMethod("/猜拳", rockPaperScissors);
  methodExecutor.addMethod("#使用", use);
  methodExecutor.addMethod("#抱起", pickup);
  methodExecutor.addMethod("#工作", WorkManager.work);
  methodExecutor.addMethod("#跳舞", WorkManager.work);
  methodExecutor.addMethod("#就餐", EatManager.eat);
  methodExecutor.addMethod("#出售列表", sellList);
  //methodExecutor.addMethod("#援交", sex);
  methodExecutor.addMethod("#自慰", SexManager.masturbation);
  methodExecutor.addMethod("#卖春", SexManager.prostitution);
  methodExecutor.addMethod("#脱下", takeoff);
  methodExecutor.addMethod("#时间经过", timeSkip);
}

function formatDate(): string {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

function currentTime(): string {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const currentHour = currentDate.getHours().toString().padStart(2, '0');
  return `${year}${month}${day}${currentHour}`;
}

function splitStringBySpace(input: string): string[] {
  // 使用 split 方法将字符串按空格分割成数组
  return input.split(' ');
}

function extractCommand(input: string): string | null {
  // 使用正则表达式匹配第一个空格之前的内容
  const match = input.match(/^(\S+)\s/);

  if (match) {
      // 如果匹配成功，返回提取到的指令
      return match[1];
  } else {
      // 如果没有匹配到空格，返回 null 或者你认为合适的默认值
      return input;
  }
}
function extractContentAfterSecondSpace(input: string): string | null {
  // 使用正则表达式匹配第二个空格之后的所有字符
  const match = input.match(/[^ ]* [^ ]* (.+)/);

  if (match) {
      // 如果匹配成功，返回提取到的内容
      return match[1];
  } else {
      // 如果没有匹配到，返回 null 或者你认为合适的默认值
      return null;
  }
}

function getRockPaperScissorsStr(num: number): string {
  switch (num) {
    case 1:
      return '剪刀';
    case 2:
      return '石头';
    case 3:
      return '布';
    default:
      return '';
  }
}
function getRockPaperScissorsNum(str: string): number {
  switch (str) {
    case '剪刀':
      return 1;
    case '石头':
      return 2;
    case '布':
      return 3;
    default:
      return 0;
  }
}
// 被艾特时的通用功能
async function rockPaperScissors(session: any,ctx: Context): Promise<string> {
  const match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
  if(match.length>1&&match[1]!=''){
    let message='';
    let userChoice=getRockPaperScissorsNum(match[1]);
    if(userChoice==0){
      return '嗯哼哼～耍赖可不行哦，我愚蠢的孩子。'
    }
    let computerChoice =Tools.generateRandomNumber(1, 3);
    message+='我出的是'+getRockPaperScissorsStr(computerChoice)+'。\n';
    if (userChoice === computerChoice) {
      return message+="真厉害，竟然跟我平局...";
    } else if (
        (userChoice === 1 && computerChoice === 3) ||
        (userChoice === 2 && computerChoice === 1) ||
        (userChoice === 3 && computerChoice === 2)
    ) {
      return message+="！！没想到，我竟然输了...是我低估了你。";
    } else {
      return message+="一切都在我的预测之中，是我赢了呢，嗯哼哼～";
    }
  }else{
    return '想跟我猜拳？可以试一试哦，反正我也很闲。（例:输入@弗洛洁斯 猜拳 剪刀/石头/布）';
  }
}

// /创建角色
async function createChara(session: any,ctx: Context): Promise<string> {
    let data = await ctx.database.get('ap01', session.userId);
    if(data!=null&&data.length>0){
      return '你已经创建过角色了';
    }else{
      return '欢迎来到威尔萨，请发送 /决定名字 XXX 来决定你的角色名字。\n一经决定无法更改。';
    }
}

// /决定名字
async function decideName(session: any,ctx: Context): Promise<string> {
   const match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
   if(match.length>1&&match[1]!=''){
    let data =await ctx.database.get('ap01', session.userId, ['name'])
    if(data!=null&&data.length>0){
      return '你已经决定过你的名字了。你的名字叫'+data[0].name+'。';
    }
    let data_name =await ctx.database.get('ap01', {name:match[1]})
    if(data_name!=null&&data_name.length>0){
      return '重名了。';
    }
    await ctx.database.create('ap01', { id: session.userId, name: match[1] ,bday:formatDate(),locat:'自己的房间'});
    await ctx.database.create('ap02', { id: session.userId, name: '面包' ,def:'普通的面包，味道一般般',type:'食物',quantity:1});
    await ctx.database.create('ap02', { id: session.userId, name: '初始服装' ,def:'随身携带的私服，穿起来最让人安心',type:'衣服',quantity:1});
    return ('你的名字叫'+match[1]+'\n请发送 /种族列表 来查看所有种族\n请发送 /选择种族 XXX 来选择你的种族');
    
   }else{
    return '请告诉我你的名字（/决定名字 XXX）';
   }
}

// /种族列表
async function getRaceList(session: any,ctx: Context): Promise<string> {
  return '【怨灵】\n人族已经灭绝，其怨灵现在附着于遗物之中。'+
  '\n\n\n【妖狐】\n妖狐是纯粹的魔力聚合体。曾经，九尾妖狐独自形成一支独特的妖族，其强大的魔力成为其他妖族垂涎不已的对象。后来，她遭到众多妖族的共同讨伐，其象征着强大魔力的尾巴从本体分离，演变成了独立具有意识的个体。'+
  '\n\n\n【人狼】\n人狼是妖族中的种族斗争中脱颖而出的胜者，也是在九尾妖狐被讨伐时的主要势力。现如今，他们正全力搜寻分裂后的妖狐，并打算将其吞噬。'+
  '\n\n\n【龙人】\n在威尔萨，龙人是最庞大的族群，拥有明确的社会层级结构。这个族群的领导者是一位年轻而威严的龙人，广大族人都尊称他为少主。'+
  '\n\n\n【吸血鬼】\n强大的不死种族——吸血鬼，遭受其他种族的联合讨伐，几近灭绝。';
}

// /选择种族
async function selectRace(session: any,ctx: Context): Promise<string> {
  const match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
  if(match.length>1&&match[1]!=''){
      let data =await ctx.database.get('ap01', session.userId, ['race'])
      if(data==null||data.length<1){
        return '你还没决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
      }
      if(data[0].race!=null&&data[0].race.length>0){
        return '你已经选择过你的种族了。你的种族是'+data[0].race+'。';
      }else{
        const allowedValues = ['怨灵', '妖狐', '人狼', '龙人', '吸血鬼'];
        if (allowedValues.includes(match[1])) {
          await ctx.database.set('ap01', session.userId, {
            race: match[1],
          })
          await ctx.database.set('ap01', session.userId, {
            locat:getBirtArea(match[1])
          })
          return ('你的种族是'+match[1]+'\n请发送 /选择性别 （男/女） 来选择你的性别');
        } else {
          return '这里不存在这样的种族';
        }
      }
  }else{
    return '请告诉我你的种族（/选择种族 XXX）';
  }
}

// /选择性别
async function selectGender(session: any,ctx: Context): Promise<string> {
  const match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
  if(match.length>1&&match[1]!=''){
      let data =await ctx.database.get('ap01', session.userId, ['gender'])
      if(data==null||data.length<1){
        return '你还没决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
      }
      if(data[0].gender!=null&&data[0].gender.length>0){
        return '你已经选择过你的性别了。';
      }else{
        const allowedValues = ['男', '女'];
        if (allowedValues.includes(match[1])) {
          await ctx.database.set('ap01', session.userId, {
            gender: match[1],
          })
          return ('你的性别是'+match[1]+'\n请发送 /完成角色创建');
        } else {
          return '这里不存在这样的性别';
        }
      }
  } else {
    return '请告诉我你的性别（/选择性别 （男/女））';
  }
}

// /完成角色创建
async function complete(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId)
      if(data==null||data.length<1){
        return '你还没决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
      }
      if(data[0].race==null||data[0].race.length<1){
        return '你还没决定过你的种族。\n请发送 /种族列表 来查看所有种族\n请发送 /选择种族 XXX 来选择你的种族';
      }
      if(data[0].gender==null||data[0].gender.length<1){
        return '你还没决定过你的性别。\n请发送 /选择性别 XX 来选择你的性别（男/女）';
      }
      return '恭喜你完成角色创建\n请发送 /属性 来查看你的人物属性';
  }

// /属性
async function parameter(session: any,ctx: Context): Promise<string> {
    let data =await ctx.database.get('ap01', session.userId);
    if(data==null||data.length<1){
      return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
    }
    if(data[0].gender==null||data[0].gender==''){
      return '请告诉我你的性别（/选择性别 （男/女））';
    }
    if(data[0].race==null||data[0].race==''){
      return '请告诉我你的种族（/选择种族 XXX）';
    }
    if(data[0].sleep==1&&data[0].hunger<0){
      wakeUp(session, ctx);
      return '你被饿醒了。';
    }
    let str='';
    str='lv.'
      +data[0].level+' '
      +data[0].name
    //更新睡觉时的体精饥
    let count=0;
    let hunger=data[0].hunger;
    let timestage=data[0].timestage;
    let updSpirit=data[0].spirit;
    let updStamina=data[0].stamina;
    if(data[0].sleep==1){
      let time=calculateHourDifference(data[0].logindate,currentTime());
      str+='\n已入睡'+time+'小时';
      if(time>0){
        if(time<8){
          count=time*10;
        }else if(time>=8&&time<=24){
          count=100;
        }else if(time<=72){
          count=80;
        }else{
          count=50;
        }
      }

      if(count>data[0].spirit){
        updSpirit=count;
      }
      if(count>data[0].stamina){
        updStamina=count;
      }
      if(data[0].hunger-(10*time)<-100){
        hunger=-100;
      }else{
        hunger=(data[0].hunger-(10*time));
      }
      let skipTime=Math.floor(time/4);
      for(let i=0;i<skipTime;i++){
        timestage=Tools.getNextTime(timestage);
      }
    }
    let virgn='处'+data[0].gender;
    str+='\n'+'============================'+'\n'
    +'种族：'+(data[0].locat=='勒比卢'?'人类':data[0].race)+'\n'
    +'性别：'+data[0].gender+'\n'
    +'金币：'+data[0].goldc+'\n' 
    +((data[0].race=='吸血鬼'&&data[0].locat!='勒比卢')?('吸血冲动：'+(100-hunger)):('饱食度：'+hunger))+'\n'
    +'体力：'+updStamina+'\n'
    +'精力：'+updSpirit+'\n'
    +'健康度：'+data[0].health+'\n'
    +'理智：'+data[0].sanity+'\n'
    +'羞耻心：'+data[0].shame+'\n'
    +'堕落度：'+data[0].corpt+'\n'
    +'EROS：'+data[0].evalue+'\n'
    +'性感值：'+data[0].acme+'\n'
    +'LIMIT：'+data[0].elevel+'\n'
    +virgn+'/非'+virgn+'：'+(data[0].virgn==1?('非'+virgn):virgn)+'\n'
    +'异常状态：';
    let flg=true;
    if(data[0].sleep==1){
      str+='睡眠 ';
      flg=false;
    } 
    if(data[0].incap==1){
      str+='行动不能 ';
      flg=false;
    } 
    if(data[0].paras==1){
      str+='寄生 ';
      flg=false;
    } 
    if(data[0].preg==1){
      str+='怀孕 ';
      flg=false;
    } 
    if(data[0].estrus==1){
      str+='发情 ';
      flg=false;
    } 
    if(data[0].addctn==1){
      str+='上瘾 ';
      flg=false;
    } 
    if(data[0].restra==1){
      str+='拘束 ';
      flg=false;
    } 
    if(data[0].tsubm==1){
      str+='完全屈服 ';
      flg=false;
    } 
    if(data[0].snsup==1){
      str+='感度上升 ';
      flg=false;
    }
    if(data[0].burn==1){
      str+='灼热 ';
      flg=false;
    } 
    if(data[0].frozen==1){
      str+='严寒 ';
      flg=false;
    } 
    if(data[0].mpois==1){
      str+='魔力中毒 ';
      flg=false;
    } 
    if(data[0].berse==1){
      str+='狂化 ';
      flg=false;
    } 
    if(data[0].dimm==1){
      str+='即死无效 ';
      flg=false;
    } 
    if(data[0].fpois==1){
      str+='食物中毒 ';
      flg=false;
    } 
    if(data[0].hypno==1){
      str+='催眠 ';
      flg=false;
    } 
    if(data[0].blind==1){
      str+='失明 ';
      flg=false;
    } 
    if(data[0].charm==1){
      str+='魅惑 ';
      flg=false;
    } 
    if(flg){
      str+='无';
    }

    str+='\n'+'----------------------------'+'\n'
    +'头饰：'+(data[0].head==null?'裸':data[0].head)+'\n' 
    +'衣服：'+(data[0].cloth==null?'裸':data[0].cloth)+'\n' 
    +'内裤：'+(data[0].pants==null?'裸':data[0].pants)+'\n' 
    +'脚部：'+(data[0].foot==null?'裸':data[0].foot)+'\n'  
    +'鞋：'+(data[0].shoes==null?'裸':data[0].shoes)  
    str+='\n'+'============================'+'\n';
    str+='所在地点：'+data[0].locat+'\n';
    str+='时间：'+timestage;
    if(data[0].pickupid!=null&&data[0].pickupid!=''){
      let item =await ctx.database.get('ap01', data[0].pickupid);
      str+='\n抱着'+item[0].name;
    }
    return str;  
}

// /装饰
async function decoration(session: any,ctx: Context): Promise<string> {
  return '暂无';
}
// /装备
async function equipment(session: any,ctx: Context): Promise<string> {
  return '暂无';
}

// /战斗配置
async function battleInfo(session: any,ctx: Context): Promise<string> {
  return '暂无';
}

// /购买
async function startsWithPurchase(session: any,ctx: Context): Promise<string> {

  let data =await ctx.database.get('ap01', session.userId);
  let check=Tools.actionCheck(data);
  if(check!=''){
    return check;
  };
  let match = splitStringBySpace(session.content);
  if(match.length<3||match[1]==''||match[2]==''){
    return String(h('at',{id:(session.userId)}))+'请告诉你要买的东西和数量（#购买 XXX 数量）';
  }
  let numericValue: number = parseFloat(match[2]);

  if (isNaN(numericValue)) {
    return ("我听不懂你想买几个");
  } 
  if(data[0].locat=='服装店'){
    let shopItem=ShopMaster.getClothShopItem(match[1]);
    if(!shopItem){
      return '没有这件物品';
    }
    if(data[0].goldc>shopItem.price*numericValue){
      let itemMaster=ItemMaster.getItem(match[1]);
      let str='你买下了'+match[2]+'个'+match[1]
      await ctx.database.set('ap01', session.userId, {
        goldc:data[0].goldc-shopItem.price*numericValue
      });
      let item =await ctx.database.get('ap02', {id: [session.userId],name:match[1]});
      if(item==null||item.length<1){
        await ctx.database.create('ap02', { id: session.userId, name: itemMaster.name ,def:itemMaster.def,type:itemMaster.type,quantity:numericValue});
      }else{
        await ctx.database.set('ap02', {
          id:session.userId,name:match[1]
        }, {
          quantity:item[0].quantity+numericValue
        });
      }
      return str;
    }
    return '你买不起该商品。';
  }
  return '这里没有能买的东西。'
}
startsWithSell
// /卖出
async function startsWithSell(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  let check=Tools.actionCheck(data);
  if(check!=''){
    return check;
  };
  if(data[0].locat=='奴隶市场'){
    let match=[];
    match = splitStringBySpace(session.content);
    if(match.length<2||match[1]==''){
      return String(h('at',{id:(session.userId)}))+'请告诉我你要卖出的奴隶名字（#卖出 XXX）';
    }
    // 卖出对象
    let data_name =await ctx.database.get('ap01', {name:match[1],locat:'奴隶市场'})
    if(data_name==null&&data_name.length<0){
      return '在附件没找到该对象人物。';
    }
    if(data_name[0].masterid!=null&&data_name[0].masterid!=''){
      return '该奴隶已有主人。';
    }
    let data_dorei_shop =await ctx.database.get('ap03', {name:match[1]})
    if(data_dorei_shop!=null&&data_dorei_shop.length>0){
      return '该奴隶正在出售中。';
    }

    await ctx.database.create('ap03', { id: data_name[0].id, name: data_name[0].name ,gender:data_name[0].gender,race:data_name[0].race,price:10000});
    await ctx.database.set('ap01', {
      id:data_name[0].id
    }, {
      tsubm:1
    });
    await ctx.database.set('ap01', {
      id:session.userId
    }, {
      goldc:data[0].goldc+5000
    });
    return data_name[0].name+'已被卖进奴隶市场。(金币+5000)';
  }

}

// /去
async function startsWithGo(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  let check=Tools.moveCheck(data);
  if(check!=''){
    return check;
  };
  let match=[];
  match = splitStringBySpace(session.content);
  if(match.length<2||match[1]==''){
    return String(h('at',{id:(session.userId)}))+'请告诉我去的地方（#去 XXX）';
  }
  let maplist =mapInit();
  let map=maplist.get(match[1]);
  if(map==null){
    return '不存在该区域';
  }else{
    await ctx.database.set('ap01', session.userId, {
      locat: match[1],
    })
    if(data[0].pickupid!=null&&data[0].pickupid!=''){
      await ctx.database.set('ap01', data[0].pickupid, {
        locat: match[1],
      })
      let item =await ctx.database.get('ap01', data[0].pickupid);
      await ctx.database.set('ap01', session.userId, {
        pickupid: '',
      })

      return '你抱着'+item[0].name+'到达了'+match[1]+map;
    }
    return '你到达了'+match[1]+map;
  }
}

// /使用
async function use(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  let check=Tools.actionCheck(data);
  if(check!=''){
    return check;
  };
  let match=[];
  match = splitStringBySpace(session.content);
  if(match.length<2||match[1]==''){
    return String(h('at',{id:(session.userId)}))+'请告诉我你要使用的物品（#使用 XXX）';
  }
  let item =await ctx.database.get('ap02', {id: [session.userId],name:match[1]});
  if(item==null||item.length<1){
    return '你没有该物品。';
  }
  if(item[0].type=='衣服'){
    await ctx.database.set('ap01', session.userId, {
      cloth:match[1]
    });
    return '你穿上了'+match[1];
  }
  if(item[0].type=='头饰'){
    await ctx.database.set('ap01', session.userId, {
      head:match[1]
    });
    return '你穿上了'+match[1];
  }
  if(item[0].type=='脚部'){
    await ctx.database.set('ap01', session.userId, {
      foot:match[1]
    });
    return '你穿上了'+match[1];
  }
  if(item[0].type=='鞋'){
    await ctx.database.set('ap01', session.userId, {
      shoes:match[1]
    });
    return '你穿上了'+match[1];
  }
  if(item[0].type=='内裤'){
    await ctx.database.set('ap01', session.userId, {
      pants:match[1]
    });
    return '你穿上了'+match[1];
  }
  return '暂无';
}
async function pickup(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  let check=Tools.actionCheck(data);
  if(check!=''){
    return check;
  };
  let match=[];
  match = splitStringBySpace(session.content);
  if(match.length<2||match[1]==''){
    return String(h('at',{id:(session.userId)}))+'请告诉我你要抱起的人的名字（#抱起 XXX）';
  }
  let item =await ctx.database.get('ap01', {name:match[1],locat:data[0].locat});
  if(item==null||item.length<1){
    return '你在'+data[0].locat+'没有看到'+match[1];
  }
  if(item[0].locat=='旅馆'){
    return '在这里，你完全没有机会下手。';
  }
  if(item[0].stamina<0||item[0].spirit<0||item[0].hunger<0){
    await ctx.database.set('ap01', session.userId, {
      pickupid:item[0].id
    });
    return match[1]+'使不上一点劲，只能眼睁睁地被你抱起。';
  }
  if(item[0].sleep==1){
    await ctx.database.set('ap01', session.userId, {
      pickupid:item[0].id
    });
    return match[1]+'睡得很香，完全没有察觉到被你抱来了。';
  }
  return '你被'+match[1]+'推开了，还被瞪了一眼。';
}
// /脱下
async function takeoff(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  let check=Tools.actionCheck(data);
  if(check!=''){
    return check;
  };
  let match=[];
  match = splitStringBySpace(session.content);
  if(match.length<2||match[1]==''){
    return String(h('at',{id:(session.userId)}))+'请告诉我你要脱下的部位（#脱下 XXX）';
  }
  let cloth='';
  if(match[1]=='衣服'){
    if(data[0].cloth==null||data[0].cloth=='裸'){
      return '你该部位是裸着的';
    }
    if(data[0].shame>0){
      return '你脱衣服脱到一半突然感受到了强烈的羞耻感，你害羞得把脱到一半的衣服又穿了回去。（羞耻心需达到0）';
    }
    cloth=data[0].cloth;
    await ctx.database.set('ap01', session.userId, {
      cloth:'裸'
    });
  }
  if(match[1]=='脚部'){
    if(data[0].foot==null||data[0].foot=='裸'){
      return '你该部位是裸着的';
    }
    cloth=data[0].foot;
    await ctx.database.set('ap01', session.userId, {
      foot:'裸'
    });
  }
  if(match[1]=='头饰'){
    if(data[0].head==null||data[0].head=='裸'){
      return '你该部位是裸着的';
    }
    cloth=data[0].head;
    await ctx.database.set('ap01', session.userId, {
      head:'裸'
    });
  }
  if(match[1]=='鞋'){
    if(data[0].shoes==null||data[0].shoes=='裸'){
      return '你该部位是裸着的';
    }
    cloth=data[0].shoes;
    await ctx.database.set('ap01', session.userId, {
      shoes:'裸'
    });
  }
  if(match[1]=='内裤'){
    if(data[0].pants==null||data[0].pants=='裸'){
      return '你该部位是裸着的';
    }
    cloth=data[0].pants;
    await ctx.database.set('ap01', session.userId, {
      pants:'裸'
    });
  }
  return '你脱下了'+cloth;

}

// /战斗
async function battle(session: any,ctx: Context): Promise<string> {
  return '暂无';
}

// /逃跑
async function run(session: any,ctx: Context): Promise<string> {
  return '暂无';
}

// /选择
async function select(session: any,ctx: Context): Promise<string> {
  return '暂无';
}

// /选择
async function help(session: any,ctx: Context): Promise<string> {
  return '#属性\n#装饰\n#装备\n#战斗属性\n#购买\n#卖出\n#去\n#使用\n#战斗\n#逃跑\n#选择\n#背包\n#查看\n#醒来\n#睡觉';
}
// /背包
async function inventory(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap02', {id: [session.userId]});
  if(data==null||data.length<1){
    return String(h('at',{id:(session.userId)}))+'的背包'+'\n空无一物';
  }

  let str= String(h('at',{id:(session.userId)}))+'的背包'+'\n';
  let count=0;
  data.forEach(item => {
    count++;
    str+=item.name+' '+item.quantity;
    if(item.type=='宠物'){
      str+='只';
    }else if(item.type=='药水'){
      str+='瓶';
    }else if(item.type=='装备'||item.type=='衣服'||item.type=='武器'){
      str+='件';
    }else if(item.type=='液体'){
      str+='ml';
    }else{
      str+='个';
    }
    if(count!=data.length){
      str+='，';
    }
  });
  return str;  
}
  // /查看物品信息
async function info(session: any,ctx: Context): Promise<string> {
  let match=[];
  if(session.content.startsWith('#')){
    match = splitStringBySpace(session.content);
  }else{
    match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
  }
  if(match.length<2||match[1]==''){
    return String(h('at',{id:(session.userId)}))+'请告诉我你要查看的背包里的物品（/查看 XXX）';
  }
  let data =await ctx.database.get('ap02', {id: [session.userId],name: [match[1]]});
  if(data==null||data.length<1){
    return String(h('at',{id:(session.userId)}))+'你没有该物品';
  }else{
    return '【'+data[0].type+'】'+data[0].name+'\n'+data[0].def;
  }
}

  // /查看地图
  async function map(session: any,ctx: Context): Promise<string> {
    let data =await ctx.database.get('ap01', session.userId);
    if(data==null||data.length<1){
      return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
    }
    let maplist =getMap();
    let map=maplist.get(data[0].locat);
    if(map==null){
      return '你所在区域（'+data[0].locat+'）无法查看地图';
    }else{
      return map;
    }
  }

    // /离开
    async function goOut(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      if(data[0].sleep==1){
        return '你在梦里离开了威尔萨，你见到了对着这个世界蠢蠢欲动的【安宁】的管理者';
      }
      if(data[0].stamina<0||data[0].spirit<0||data[0].hunger<0){
        return '你使不上一点劲，哪里都去不了。';
      }
      if(data[0].tsubm==1){
        return '你正在被奴役中。';
      }
      if(data[0].locat=='威尔萨-郊外'){
        return '你所在区域（'+data[0].locat+'）无法离开';
      }else{
        await ctx.database.set('ap01', session.userId, {
          locat:'威尔萨-郊外'
        });
        return '你已到达威尔萨-郊外'+String(h.image(pathToFileURL(resolve(__dirname, 'map/威尔萨-郊外.png')).href));
      }
    }
    // /查看物品信息
    function goOutInit(): Map<string,string> {
      let myMap = new Map();
      // 向 Map 中添加键值对
      myMap.set(
        '自己的房间', '旅馆二楼'
        );
      myMap.set(
        '旅馆二楼', '旅馆一楼'
        );
      myMap.set(
        '旅馆一楼', '龙人都市-南区'
        );
      myMap.set(
        '龙人都市-南区', '威尔萨-郊外'
        );
      return myMap;
  }
    // 地图初始化
    function getMap(): Map<string,string> {
      let myMap = new Map();
      // 向 Map 中添加键值对
      myMap.set(
        '龙人都市', String(h.image(pathToFileURL(resolve(__dirname, 'map/龙人都市-地图.png')).href))
        );
      return myMap;
  }
  // 地图初始化
  function mapInit(): Map<string,string> {
    let myMap = new Map();
    // 向 Map 中添加键值对
    myMap.set(
      '龙人都市', String(h.image(pathToFileURL(resolve(__dirname, 'map/龙人都市.png')).href))
      );
    myMap.set(
      '威尔萨-郊外', String(h.image(pathToFileURL(resolve(__dirname, 'map/威尔萨-郊外.png')).href))
    );
    myMap.set(
      '龙人酒吧', '\n这是一家龙人经营的酒吧。里面挤满了各个种族的酒客。\n\n#跳舞'+String(h.image(pathToFileURL(resolve(__dirname, 'map/龙人酒吧.png')).href))
    );
    myMap.set(
      '废弃宅邸', String(h.image(pathToFileURL(resolve(__dirname, 'map/废弃宅邸.png')).href))
    );
    myMap.set(
      '妖怪旅馆', String(h.image(pathToFileURL(resolve(__dirname, 'map/妖怪旅馆.png')).href))
    );
    myMap.set(
      '破碎战场', String(h.image(pathToFileURL(resolve(__dirname, 'map/破碎战场.png')).href))
    );
    myMap.set(
      '荒野', String(h.image(pathToFileURL(resolve(__dirname, 'map/荒野.png')).href))
    );
    myMap.set(
      '幽暗小巷', String(h.image(pathToFileURL(resolve(__dirname, 'map/幽暗小巷.png')).href))
    );
    myMap.set(
      '黑暗之塔', String(h.image(pathToFileURL(resolve(__dirname, 'map/黑暗之塔.png')).href))
    );
    myMap.set(
      '旅馆', '\n这是一家位于龙人都市的正规旅馆，吸引了各种族的旅客。这里提供多样化的风味餐饮和舒适住宿，让来自不同地方的客人能够在这里共享愉快的时光。\n\n#工作\n#就餐\n#卖春'
    );
    myMap.set(
      '服装店', '\n这是一家名为“时尚之梦”的服装店，黑白设计的店面展示着各类潮流服饰。店内灯光温馨，音乐轻快，货架上陈列着各式时尚单品。\n\n#出售列表\n#购买 xxx 数量'
    );
    myMap.set(
      '娼馆', '\n这是一家名叫「夜遊び」的娼馆。微弱灯光渲染出房间的华丽，舞池中美丽的舞姬翩翩起舞。在柔和的氛围中，笑容妩媚的女性邀请玩家品味夜晚的妖艳与欢愉。\n\n#工作'
    );
    myMap.set(
      '奴隶市场', '\n露天市场上，生人拖曳着镣铐，目光中充满无奈。拍卖师高声宣布每个奴隶的特长，而买主们面无表情地检视这些被摆在架子上的人。市场上充斥着沉重的氛围，暴露了这个虚伪而残酷的一面。\n\n#出售列表\n#卖出 xxx\n#购买 xxx 数量'
    );
    return myMap;
}
  // 出生地
  function getBirtArea(area: string): string {
    let myMap = new Map();
    // 向 Map 中添加键值对
    myMap.set(
      '龙人', '龙人都市-南区'
      );
    myMap.set(
      '妖狐', '幽暗小巷'
      );
    myMap.set(
      '怨灵', '妖怪旅馆'
      );
    myMap.set(
      '吸血鬼', '龙人酒吧'
      );
    myMap.set(
      '狼人', '废弃宅邸'
      );
    return myMap.get(area);
}
// /醒来
async function wakeUp(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  if(data==null||data.length<1){
    return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
  }
  // 醒来更新体,精,饥,时间,状态
  let stamina=0;
  let str;
  let timestage=data[0].timestage;
  if(data[0].sleep==1){
    let time=calculateHourDifference(data[0].logindate,currentTime());
    if(time>0){
      if(time<8){
        stamina=time*10;
        str='你睡醒了，你觉得睡得有点不够，观察四周大致判断了一下时间，睡了'+time+'个小时。';
      }else if(time>=8&&time<=24){
        stamina=100;
        str='你睡醒了，你觉得睡得很足，观察四周大致判断了一下时间，睡了'+time+'个小时。';
      }else if(time<=72){
        stamina=80;
        str='你睡醒了很久，观察四周大致判断了一下时间，至少睡了24个小时以上，你感觉到了疲劳。';
      }else{
        stamina=50;
        await ctx.database.set('ap01', session.userId, {
          sleep: 0,logindate:currentTime(),spirit:stamina,stamina:stamina,hunger:-100
        });
        return '你昏睡了三天以上，周围环境已经对不上记忆，你感觉到了虚弱。';
      }
      let skipTime=Math.floor(time/4);
      for(let i=0;i<skipTime;i++){
        timestage=Tools.getNextTime(timestage);
      }
    }else{
      str='才过了不到一会儿...你完全没睡着！';
    }
    let updSpirit=stamina;
    let updStamina=stamina;
    let updSanity=stamina;
    if(stamina<data[0].spirit){
      updSpirit=data[0].spirit;
    }
    if(stamina<data[0].stamina){
      updStamina=data[0].stamina;
    }
    if(stamina<data[0].sanity){
      updSanity=data[0].sanity;
    }
    let hunger=0;
    if(data[0].hunger-(10*time)<-100){
      hunger=-100;
    }else{
      hunger=(data[0].hunger-(10*time));
    }
    let incap=0;
    if(updSpirit<=0||updStamina<=0){
      incap=1;
    }
    await ctx.database.set('ap01', session.userId, {
      sleep: 0,logindate:currentTime(),spirit:updSpirit,stamina:updStamina,sanity:updSanity,incap:incap,hunger:hunger,timestage:timestage,locat:'旅馆'
    });
    str+='\n你回到了威尔萨。';
    return str;
  }else{
    return '你没有在睡觉，你大喊了一声“快醒过来！”，觉得自己的决心更加坚定了。';
  }
}

// /睡觉
async function sleep(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  if(data==null||data.length<1){
    return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
  }
  if(data[0].sleep==1){
    return '你正在睡觉。';
  }  else if(data[0].hunger<0){
    return '你太饿了，根本睡不着。';
  }else{
    await ctx.database.set('ap01', session.userId, {
      sleep: 1,logindate:currentTime(),locat:'勒比卢'
    });
    return '你保持着决心，渐渐进入了梦乡。\n朦胧中，你感觉你来到了一个陌生的世界。'+'\n'+'============================'+'\n你来到了勒比卢。在那里，尘土飞扬， 一个充满枪支、魔法和决斗的世界。';
  }

}
// /时间经过
async function timeSkip(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  if(data==null||data.length<1){
    return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
  }
  if(data[0].sleep==1){
    return '你正在睡觉。';
  }
  await ctx.database.set('ap01', session.userId, {
    timestage:Tools.getNextTime(data[0].timestage),hunger:(data[0].hunger-10)
  });
  return '你度过了'+data[0].timestage+',时间来到了'+Tools.getNextTime(data[0].timestage)
}
function calculateHourDifference(yyyymmddhh1: string, yyyymmddhh2: string): number | null {
  // 解析输入字符串
  const year1 = parseInt(yyyymmddhh1.substr(0, 4), 10);
  const month1 = parseInt(yyyymmddhh1.substr(4, 2), 10) - 1; // 月份从0开始
  const day1 = parseInt(yyyymmddhh1.substr(6, 2), 10);
  const hour1 = parseInt(yyyymmddhh1.substr(8, 2), 10);

  const year2 = parseInt(yyyymmddhh2.substr(0, 4), 10);
  const month2 = parseInt(yyyymmddhh2.substr(4, 2), 10) - 1;
  const day2 = parseInt(yyyymmddhh2.substr(6, 2), 10);
  const hour2 = parseInt(yyyymmddhh2.substr(8, 2), 10);

  // 创建 Date 对象
  const date1 = new Date(year1, month1, day1, hour1);
  const date2 = new Date(year2, month2, day2, hour2);

  // 检查日期是否有效
  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    console.error("无效的日期");
    return null;
  }

  // 计算小时差
  const hourDifference = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60);

  return hourDifference;
}

 async function sellList(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  if(data==null||data.length<1){
    return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
  }
  if(data[0].locat=='服装店'){
    let itemMaster=ShopMaster.getClothItemMaster();
    let str='出售列表【'+data[0].locat+'】\n';
    str+='\n'+'============================'+'\n';
    itemMaster.forEach(item=>{
      str+=item.name+'     '+item.price+'金币\n'
    })
    return str;
  }
  if(data[0].locat=='奴隶市场'){
    let data_ap03 =await ctx.database.get('ap03',{});
    let str='出售列表【'+data[0].locat+'】\n';
    str+='\n'+'============================'+'\n';
    if(data_ap03!=null&&data_ap03.length>0){
      data_ap03.forEach(item=>{
        str+=item.name+'     '
        +item.race+'     '
        +item.gender+'     '
        +item.price
        +'\n'
      })
    }

    return str;
  }
  return '这里没有能买的东西。'

}


// /援交
async function sex(session: any,ctx: Context): Promise<string> {
  let data =await ctx.database.get('ap01', session.userId);
  let check=Tools.actionCheck(data);
  if(check!=''){
    return check;
  };
  return '你援了个爽，但是没收钱。'
}
// // /自慰
// async function masturbation(session: any,ctx: Context): Promise<string> {
//   if(){

//   }
//   let data =await ctx.database.get('ap01', session.userId);
//   Tools.actionCheck(data);
//   return '你援了个爽，但是没收钱。'
// }