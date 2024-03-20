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
import { SearchManager } from './searchManager'
import { SkillManager } from './skillManager'
import { EventManager } from './eventManager'
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
    let data =await ctx.database.get('ap01', session.userId);
    const methodExecutor = new Tools.MethodExecutor();
    if(data==null||data.length<1){
      initCreateChara(methodExecutor);
    }else{
      switch (data[0].locat) {
        case '图书馆':
          initLib(methodExecutor);break;
        case '餐厅':
          initRestaurant(methodExecutor);break;
        case 'MIEMIE':
        initBath(methodExecutor);break;
        case 'BATTLE9影城':
        initCinema(methodExecutor);break;
        case '喷泉广场':
        initFountain(methodExecutor);break;
        case '健身房':
        initGym(methodExecutor);break;
        default:
          init(methodExecutor);
      }
    }
    return methodExecutor.executeMethod(extractCommand(str), session, ctx);
  })
}
function initCreateChara(methodExecutor:Tools.MethodExecutor): void {
  methodExecutor.addMethod("/创建角色", createChara);
  methodExecutor.addMethod("/决定名字", decideName);
  methodExecutor.addMethod("/种族列表", getRaceList);
  methodExecutor.addMethod("/选择种族", selectRace);
  methodExecutor.addMethod("/选择性别", selectGender);
  methodExecutor.addMethod("/完成角色创建", complete);
  methodExecutor.addMethod("/背包", inventory);
  methodExecutor.addMethod("/醒来", wakeUp);
  methodExecutor.addMethod("/睡觉", sleep);
  methodExecutor.addMethod("/查看", info);
  methodExecutor.addMethod("/猜拳", rockPaperScissors);
  methodExecutor.addMethod("/属性", parameter);
}
function init(methodExecutor:Tools.MethodExecutor): void {
  methodExecutor.addMethod("/创建角色", createChara);
  methodExecutor.addMethod("/决定名字", decideName);
  methodExecutor.addMethod("/种族列表", getRaceList);
  methodExecutor.addMethod("/选择种族", selectRace);
  methodExecutor.addMethod("/选择性别", selectGender);
  methodExecutor.addMethod("/完成角色创建", complete);
  methodExecutor.addMethod("/背包", inventory);
  methodExecutor.addMethod("/醒来", wakeUp);
  methodExecutor.addMethod("/睡觉", sleep);
  methodExecutor.addMethod("/查看", info);
  methodExecutor.addMethod("/猜拳", rockPaperScissors);
  methodExecutor.addMethod("/属性", parameter);
  methodExecutor.addMethod("#属性", parameter);  
  methodExecutor.addMethod("#EROS", erosParameter);  
  methodExecutor.addMethod("#装饰", decoration);
  methodExecutor.addMethod("#装备", equipment);
  methodExecutor.addMethod("#战斗属性", battleInfo);
  methodExecutor.addMethod("#购买", startsWithPurchase);
  methodExecutor.addMethod("#卖出", startsWithSell);
  methodExecutor.addMethod("#去", startsWithGo);
  methodExecutor.addMethod("#使用", use);
  methodExecutor.addMethod("#战斗", battle);
  methodExecutor.addMethod("#技能", SkillManager.skill);
  methodExecutor.addMethod("#逃跑", run);
  methodExecutor.addMethod("#选择", select);
  methodExecutor.addMethod("#背包", inventory);
  methodExecutor.addMethod("#醒来", wakeUp);
  methodExecutor.addMethod("#睡觉", sleep);
  methodExecutor.addMethod("#查看", info);
  methodExecutor.addMethod("#地图", map);
 //methodExecutor.addMethod("#离开", goOut);
  methodExecutor.addMethod("#help", help);
  methodExecutor.addMethod("#使用", use);
  methodExecutor.addMethod("#抱起", pickup);
  methodExecutor.addMethod("#打工", WorkManager.work);
  methodExecutor.addMethod("#跳舞", WorkManager.work);
  //methodExecutor.addMethod("#就餐", EatManager.eat);
  methodExecutor.addMethod("#出售列表", sellList);
  methodExecutor.addMethod("#援交", sex);
  methodExecutor.addMethod("#自慰", SexManager.masturbation);
  methodExecutor.addMethod("#卖春", SexManager.prostitution);
  methodExecutor.addMethod("#脱下", takeoff);
  methodExecutor.addMethod("#时间经过", timeSkip);
  methodExecutor.addMethod("#探索", SearchManager.search);
  methodExecutor.addMethod("#阅读", EventManager.event1);
}
function initLib(methodExecutor:Tools.MethodExecutor): void {
  methodExecutor.addMethod("#地图", map);
  methodExecutor.addMethod("#属性", parameter); 
  methodExecutor.addMethod("#去", startsWithGo);
  methodExecutor.addMethod("#醒来", wakeUp);
  methodExecutor.addMethod("#睡觉", sleep);
  methodExecutor.addMethod("#自慰", SexManager.masturbation);
  methodExecutor.addMethod("#杂志（宠物特辑）", EventManager.event1);
  methodExecutor.addMethod("#历史类的书", EventManager.event2);
  methodExecutor.addMethod("#哲学书", EventManager.event3);
  methodExecutor.addMethod("#杂志（炽天使特辑）", EventManager.event4);
  methodExecutor.addMethod("#恋爱小说", EventManager.event5);
  methodExecutor.addMethod("#绘本", EventManager.event6);
  methodExecutor.addMethod("#杂志（泳装写真特辑）", EventManager.event7);
  methodExecutor.addMethod("#轻小说", EventManager.event8);
  methodExecutor.addMethod("#医学书籍", EventManager.event9);
  methodExecutor.addMethod("#杂志（神秘现象特辑）", EventManager.event10);
  methodExecutor.addMethod("#随笔", EventManager.event11);
  methodExecutor.addMethod("#自我成长书籍", EventManager.event12);
}
function initRestaurant(methodExecutor:Tools.MethodExecutor): void {
  methodExecutor.addMethod("#地图", map);
  methodExecutor.addMethod("#属性", parameter); 
  methodExecutor.addMethod("#去", startsWithGo);
  methodExecutor.addMethod("#醒来", wakeUp);
  methodExecutor.addMethod("#睡觉", sleep);
  methodExecutor.addMethod("#自慰", SexManager.masturbation);
  methodExecutor.addMethod("#披萨", EatManager.food1);
  methodExecutor.addMethod("#热狗堡", EatManager.food2);
  methodExecutor.addMethod("#汉堡", EatManager.food3);
  methodExecutor.addMethod("#口粮饼干", EatManager.food4);
  methodExecutor.addMethod("#刀削面", EatManager.food5);
  methodExecutor.addMethod("#麻婆豆腐", EatManager.food6);
  methodExecutor.addMethod("#意式奶酪", EatManager.food7);
  methodExecutor.addMethod("#珍珠奶茶", EatManager.food8);
  methodExecutor.addMethod("#椰果", EatManager.food9);
  methodExecutor.addMethod("#黄金炒饭", EatManager.food10);
  methodExecutor.addMethod("#粽子", EatManager.food11);
  methodExecutor.addMethod("#饭团", EatManager.food12);
}

function initBath(methodExecutor:Tools.MethodExecutor): void {
  methodExecutor.addMethod("#地图", map);
  methodExecutor.addMethod("#属性", parameter); 
  methodExecutor.addMethod("#去", startsWithGo);
  methodExecutor.addMethod("#醒来", wakeUp);
  methodExecutor.addMethod("#睡觉", sleep);
  methodExecutor.addMethod("#自慰", SexManager.masturbation);
  methodExecutor.addMethod("#露天泳池", EventManager.event13);
  methodExecutor.addMethod("#桑拿", EventManager.event14);
  methodExecutor.addMethod("#泡泡按摩浴", EventManager.event15);
  methodExecutor.addMethod("#蒸气桑拿", EventManager.event16);
  methodExecutor.addMethod("#冷水浴池", EventManager.event17);
  methodExecutor.addMethod("#喷射按摩池", EventManager.event18);
  methodExecutor.addMethod("#岩盘浴", EventManager.event19);
  methodExecutor.addMethod("#搓澡", EventManager.event20);
  methodExecutor.addMethod("#电气浴池", EventManager.event21);
  methodExecutor.addMethod("#浊汤", EventManager.event22);
  methodExecutor.addMethod("#瀑布浴", EventManager.event23);
  methodExecutor.addMethod("#足浴", EventManager.event24);
}

function initCinema(methodExecutor:Tools.MethodExecutor): void {
  methodExecutor.addMethod("#地图", map);
  methodExecutor.addMethod("#属性", parameter); 
  methodExecutor.addMethod("#去", startsWithGo);
  methodExecutor.addMethod("#醒来", wakeUp);
  methodExecutor.addMethod("#睡觉", sleep);
  methodExecutor.addMethod("#自慰", SexManager.masturbation);
  methodExecutor.addMethod("#动作电影", EventManager.event25);
  methodExecutor.addMethod("#恋爱电影", EventManager.event26);
  methodExecutor.addMethod("#动物电影", EventManager.event27);
  methodExecutor.addMethod("#科幻电影", EventManager.event28);
  methodExecutor.addMethod("#恐怖电影", EventManager.event29);
  methodExecutor.addMethod("#喜剧电影", EventManager.event30);
  methodExecutor.addMethod("#青春电影", EventManager.event31);
  methodExecutor.addMethod("#灾难电影", EventManager.event32);
  methodExecutor.addMethod("#鲨鱼电影", EventManager.event33);
  methodExecutor.addMethod("#科幻恐怖电影", EventManager.event34);
  methodExecutor.addMethod("#悬疑电影", EventManager.event35);
  methodExecutor.addMethod("#侠义电影", EventManager.event36);
}
function initFountain(methodExecutor:Tools.MethodExecutor): void {
  methodExecutor.addMethod("#地图", map);
  methodExecutor.addMethod("#属性", parameter); 
  methodExecutor.addMethod("#去", startsWithGo);
  methodExecutor.addMethod("#醒来", wakeUp);
  methodExecutor.addMethod("#睡觉", sleep);
  methodExecutor.addMethod("#自慰", SexManager.masturbation);
  methodExecutor.addMethod("#筷子卷", EventManager.event37);
  methodExecutor.addMethod("#御座候", EventManager.event38);
  methodExecutor.addMethod("#蛋仙贝", EventManager.event39);
  methodExecutor.addMethod("#默剧", EventManager.event40);
  methodExecutor.addMethod("#杂耍", EventManager.event41);
  methodExecutor.addMethod("#叫卖香蕉", EventManager.event42);
  methodExecutor.addMethod("#摇滚乐", EventManager.event43);
  methodExecutor.addMethod("#抒情歌", EventManager.event44);
  methodExecutor.addMethod("#激情硬核", EventManager.event45);
  methodExecutor.addMethod("#发面纸", EventManager.event46);
  methodExecutor.addMethod("#街头问卷调查", EventManager.event47);
  methodExecutor.addMethod("#演讲", EventManager.event48);
}
function initGym(methodExecutor:Tools.MethodExecutor): void {
  methodExecutor.addMethod("#地图", map);
  methodExecutor.addMethod("#属性", parameter); 
  methodExecutor.addMethod("#去", startsWithGo);
  methodExecutor.addMethod("#醒来", wakeUp);
  methodExecutor.addMethod("#睡觉", sleep);
  methodExecutor.addMethod("#自慰", SexManager.masturbation);
  methodExecutor.addMethod("#伸展运动", EventManager.event37);
  methodExecutor.addMethod("#卧推", EventManager.event38);
  methodExecutor.addMethod("#跑步机", EventManager.event39);
  methodExecutor.addMethod("#热瑜伽", EventManager.event40);
  methodExecutor.addMethod("#哑铃", EventManager.event41);
  methodExecutor.addMethod("#飞轮车", EventManager.event42);
  methodExecutor.addMethod("#有氧舞蹈", EventManager.event43);
  methodExecutor.addMethod("#腿部推举机", EventManager.event44);
  methodExecutor.addMethod("#划船机", EventManager.event45);
  methodExecutor.addMethod("#拳击训练", EventManager.event46);
  methodExecutor.addMethod("#深蹲", EventManager.event47);
  methodExecutor.addMethod("#腹部训练机", EventManager.event48);
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
  return '【人类】\n世界上仅存少数真正的普通的人类'+
  '\n\n\n【人类？】\n自我认知为人类，但本身隐藏着很多秘密';
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
        const allowedValues = ['人类', '人类？'];
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
      if(data[0].locat!='宿舍'){
        updSpirit/=2;
        updStamina/=2;
      }
    }
    str+='\n'+'============================'+'\n'
    +'种族：'+(data[0].locat=='勒比卢'?'人类':data[0].race)+'\n'
    +'性别：'+data[0].gender+'\n'
    +'GP：'+data[0].goldc+'\n' 
    +'饱食度：'+hunger+'\n'
    +'体力：'+updStamina+'\n'
    +'精力：'+updSpirit+'\n'
    +'健康度：'+data[0].health+'\n'
    +'理智：'+data[0].sanity+'\n'
    +'度量：'+data[0].measure+'\n'
    +'温柔：'+data[0].gentle+'\n'
    +'心理韧性：'+data[0].mental+'\n'
    +'纯真：'+data[0].innocence+'\n'
    +'疯狂：'+data[0].crazy+'\n'
    +'领袖魅力：'+data[0].charisma+'\n'
    +'状态：';
    let flg=true;
    if(data[0].sleep==1){
      str+='睡眠 ';
      flg=false;
    } 
    if(data[0].incap==1){
      str+='行动不能 ';
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
    if(data[0].blind==1){
      str+='失明 ';
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

// EROS属性
async function erosParameter(session: any,ctx: Context): Promise<string> {
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
  str='limit.'
    +data[0].elevel+' '
    +data[0].name
  let virgn='处'+data[0].gender;
  str+='\n'+'============================'+'\n'
  +'种族：'+data[0].race+'\n'
  +'性别：'+data[0].gender+'\n'
  +'羞耻心：'+data[0].shame+'\n'
  +'堕落度：'+data[0].corpt+'\n'
  +'EROS：'+data[0].evalue+'\n'
  +'性感值：'+data[0].acme+'\n'
  +virgn+'/非'+virgn+'：'+(data[0].virgn==1?('非'+virgn):virgn)+'\n'
  +'EROS状态：';
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
    return data_name[0].name+'已被卖进奴隶市场。(GP+5000)';
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
    // let data =await ctx.database.get('ap01', session.userId);
    // if(data==null||data.length<1){
    //   return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
    // }
    // let maplist =getMap();
    // let map=maplist.get(data[0].locat);
    // if(map==null){
    //   return '你所在区域（'+data[0].locat+'）无法查看地图';
    // }else{
    //   return map;
    // }
    let str='【学园基地】';
    str+='\n'+'============================'+'\n';
    str+='学园基地\n特色街\n宿舍入口\n交仪厅\n教学大楼入口\n福利社\n图书馆\n宿舍\n教学大楼\n宿舍前\n教学大楼前\n练团室\n健身房\n商店\n纳比广场\n钟楼\n钟楼展望台\n竞技场\n餐厅\n殡仪馆\nMIEMIE\nBATTLE9影城\n喷泉广场\n服装店'
    return str;
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
  // 地图初始化
  function mapInit(): Map<string,string> {
    let myMap = new Map();
    // 向 Map 中添加键值对
    myMap.set(
      '学园基地', ''
    );
    myMap.set(
      '特色街', ''
    );
    // 宿舍
    myMap.set(
      '宿舍入口', ''
    );
    myMap.set(
      '交仪厅', ''
    );
    // 教学大楼
    myMap.set(
      '教学大楼入口', ''
    );
    myMap.set(
      '福利社', '\n\n#出售列表\n#打工'
    );
    // #杂志宠物特辑 #历史类的书 #哲学书
    myMap.set(
      '图书馆', '\n\n#杂志（宠物特辑）\n#历史类的书\n#哲学书\n#杂志（炽天使特辑）\n#恋爱小说\n#绘本\n#杂志（泳装写真特辑）\n#轻小说\n#医学书籍\n#杂志（神秘现象特辑）\n#随笔\n#自我成长书籍'
    );
    // 学园基地
    myMap.set(
      '宿舍', '\n\n#睡觉'
    );
    myMap.set(
      '教学大楼', ''
    );
    myMap.set(
      '宿舍前', ''
    );
    myMap.set(
      '教学大楼前', ''
    );
    myMap.set(
      '练团室', '\n\n#睡午觉\n#发声练习\n#主持练习'
    );
    myMap.set(
      '健身房', '\n\n#伸展运动\n#卧推\n#跑步机\n#热瑜伽\n#哑铃\n#飞轮车\n#有氧舞蹈\n#腿部推举机\n#划船机\n#拳击训练\n#深蹲\n#腹部训练机'
    );
    myMap.set(
      '商店', '\n\n#出售列表'
    );
    myMap.set(
      '纳比广场', '\n\n#画纳比\n#调查纳比\n#观察纳比'
    );
    myMap.set(
      '钟楼', ''
    );
    myMap.set(
      '钟楼展望台', ''
    );
    myMap.set(
      '竞技场', ''
    );
    myMap.set(
      '餐厅', '\n\n#披萨\n#热狗堡\n#汉堡\n#口粮饼干\n#刀削面\n#麻婆豆腐\n#意式奶酪\n#珍珠奶茶\n#椰果\n#黄金炒饭\n#粽子\n#饭团'
    );
    myMap.set(
      '殡仪馆', ''
    );
    // 特色街
    // 三温暖：芬兰式蒸汽浴
    myMap.set(
      'MIEMIE', '\n\n#露天泳池\n#桑拿\n#泡泡按摩浴\n#蒸气桑拿\n#冷水浴池\n#喷射按摩池\n#岩盘浴\n#搓澡\n#电气浴池\n#浊汤\n#瀑布浴\n#足浴'
    );
    // 动作电影 恋爱电影 动物电影
    myMap.set(
      'BATTLE9影城', '\n\n#动作电影\n#恋爱电影\n#动物电影\n#科幻电影\n#恐怖电影\n#喜剧电影\n#青春电影\n#灾难电影\n#鲨鱼电影\n#科幻恐怖电影\n#悬疑电影\n#侠义电影'
    );
    // 小卖部 筷子卷　御座候（味道像今川烧） 蛋仙贝
    myMap.set(
      '喷泉广场', '\n\n#筷子卷\n#御座候\n#蛋仙贝\n#默剧\n#杂耍\n#叫卖香蕉\n#摇滚乐\n#抒情歌\n#激情硬核\n#发面纸\n#街头问卷调查\n#演讲'
    );
    // myMap.set(
    //   '龙人都市', String(h.image(pathToFileURL(resolve(__dirname, 'map/龙人都市.png')).href))
    //   );
    // myMap.set(
    //   '威尔萨-郊外', String(h.image(pathToFileURL(resolve(__dirname, 'map/威尔萨-郊外.png')).href))
    // );
    // myMap.set(
    //   '龙人酒吧', '\n这是一家龙人经营的酒吧。里面挤满了各个种族的酒客。\n\n#跳舞'+String(h.image(pathToFileURL(resolve(__dirname, 'map/龙人酒吧.png')).href))
    // );
    // myMap.set(
    //   '废弃宅邸', String(h.image(pathToFileURL(resolve(__dirname, 'map/废弃宅邸.png')).href))
    // );
    // myMap.set(
    //   '妖怪旅馆', String(h.image(pathToFileURL(resolve(__dirname, 'map/妖怪旅馆.png')).href))
    // );
    // myMap.set(
    //   '破碎战场', String(h.image(pathToFileURL(resolve(__dirname, 'map/破碎战场.png')).href))
    // );
    // myMap.set(
    //   '荒野', String(h.image(pathToFileURL(resolve(__dirname, 'map/荒野.png')).href))
    // );
    // myMap.set(
    //   '幽暗小巷', String(h.image(pathToFileURL(resolve(__dirname, 'map/幽暗小巷.png')).href))
    // );
    // myMap.set(
    //   '黑暗之塔', String(h.image(pathToFileURL(resolve(__dirname, 'map/黑暗之塔.png')).href))
    // );
    // myMap.set(
    //   '旅馆', '\n这是一家位于龙人都市的正规旅馆，吸引了各种族的旅客。这里提供多样化的风味餐饮和舒适住宿，让来自不同地方的客人能够在这里共享愉快的时光。\n\n#工作\n#就餐\n#卖春'
    // );
    myMap.set(
      '服装店', '\n\n#出售列表\n#购买 xxx 数量'
    );
    // myMap.set(
    //   '娼馆', '\n这是一家名叫「夜遊び」的娼馆。微弱灯光渲染出房间的华丽，舞池中美丽的舞姬翩翩起舞。在柔和的氛围中，笑容妩媚的女性邀请玩家品味夜晚的妖艳与欢愉。\n\n#工作'
    // );
    // myMap.set(
    //   '奴隶市场', '\n露天市场上，生人拖曳着镣铐，目光中充满无奈。拍卖师高声宣布每个奴隶的特长，而买主们面无表情地检视这些被摆在架子上的人。市场上充斥着沉重的氛围，暴露了这个虚伪而残酷的一面。\n\n#出售列表\n#卖出 xxx\n#购买 xxx 数量'
    // );
    // myMap.set(
    //   '地下街', '\n这里是地下街，治安混乱、暴力横行。\n\n#探索'
    // );
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
    if(data[0].locat!='宿舍'){
      updSpirit/=2;
      updStamina/=2;
      updSanity/=2;
    }
    await ctx.database.set('ap01', session.userId, {
      sleep: 0,logindate:currentTime(),spirit:updSpirit,stamina:updStamina,sanity:updSanity,incap:incap,hunger:hunger,timestage:timestage
    });
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
      sleep: 1,logindate:currentTime()
    });
    return '你闭上了眼，渐渐进入了梦乡。';
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
      str+=item.name+'     '+item.price+'GP\n'
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