import { Context } from "koishi";
import { Tools } from './tools'
export module EatManager {

          // let num=Tools.generateRandomNumber(0, 2);
        // switch (num) {
        //   case 0:
        //     await ctx.database.set('ap01', session.userId, {
        //       hunger:data[0].hunger+100,goldc:data[0].goldc-1000
        //     });
        //     return '你点了一份披萨。\n(GP-1000，饱食度+100，精神+30)';
        //   case 1:
        //     await ctx.database.set('ap01', session.userId, {
        //       hunger:data[0].hunger+40,spirit:data[0].spirit+20,goldc:data[0].goldc-500,
        //     });
        //     return '你点了一份热狗堡。\n(GP-500，饱食度+40，精神+20)';
        //   case 2:
        //     await ctx.database.set('ap01', session.userId, {
        //       hunger:data[0].hunger+50,spirit:data[0].spirit+10,goldc:data[0].goldc-500,
        //     });
        //     return '你点了一份汉堡。\n(GP-500，饱食度+50，精神+10)';
        //   default:;
        // }

        // 披萨
    export async function food1(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
        if(data[0].hunger>100){
          return '你太饱了，已经什么都吃不下了';
        }
        if(data[0].goldc<10){
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+10
          });
          return '你没有钱了。你要了一份剩菜。（饱食度+10）';
        }
        let str='';
        str+='（披萨！我要像怜怜看齐，一个人吃掉一整块！）'
        +'\n（刻意不切，把一整张拿起来吃吧，感觉好奢侈喔）'
        +'\n（。。。咀嚼咀嚼）'
        +'\n（迟迟吃不到料。。。像在吃一个温温的面包。。。）'
        +'\n（而且这个吃法很不方便耶。。。）'
        +'\n（纯真上升1）'
        +'\n（呼~吃得好满足）'
        +'\n(GP-1000，饱食度+100，精神+30)';
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger+100,goldc:data[0].goldc-1000,spirit:data[0].spirit+30,innocence:data[0].innocence+1
        });
        return str;
    }

    // 热狗堡
    export async function food2(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
        if(data[0].hunger>100){
          return '你太饱了，已经什么都吃不下了';
        }
        if(data[0].goldc<10){
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+10
          });
          return '你没有钱了。你要了一份剩菜。（饱食度+10）';
        }
        let str='';
        str+='（就点热狗堡吧。顺便来挑战看看能吃多快）'
        +'\n（速吃还有国际比赛，据说把面包和热狗拆开来吃的方式，就叫做东京式吃法）'
        +'\n（我也来试试看吧）'
        +'\n这样还能叫热狗堡吗！就是合起来才好吃吧！'
        +'\n（还是用一般的吃法吧）'
        +'\n（纯真上升1）'
        +'\n（呼~吃得好满足）'
        +'\n(GP-500，饱食度+40，精神+20)';
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger+40,goldc:data[0].goldc-500,spirit:data[0].spirit+20,innocence:data[0].innocence+1
        });
        return str;
    }

       // 汉堡
    export async function food3(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);
        if(data[0].hunger>100){
          return '你太饱了，已经什么都吃不下了';
        }
        if(data[0].goldc<10){
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+10
          });
          return '你没有钱了。你要了一份剩菜。（饱食度+10）';
        }
        let str='';
        str+='（这世上最好吃的汉堡，就是简单朴素的那款）'
        +'\n（隐藏点法是酸黄瓜和洋葱多一点，还有番茄酱增量）'
        +'\n（咀嚼咀嚼。。。好吃！）'
        +'\n（汉堡就是最美味的垃圾食物之一）'
        +'\n（本来想这么说，但提到「最」却有好几个项目的这个句子真的很讨厌！！用了「最」就不需要「之一」啦！！）'
        +'\n（纯真上升1）'
        +'\n（呼~吃得好满足）'
        +'\n(GP-500，饱食度+50，精神+10)';
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger+50,goldc:data[0].goldc-500,spirit:data[0].spirit+10,innocence:data[0].innocence+1
        });
        return str;
    }
    
       // 口粮饼干
       export async function food4(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
          if(data[0].hunger>100){
            return '你太饱了，已经什么都吃不下了';
          }
          if(data[0].goldc<10){
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+10
            });
            return '你没有钱了。你要了一份剩菜。（饱食度+10）';
          }
          let str='';
          str+='（好，我来吃吃看口粮饼干吧）'
          +'\n（它好像是防灾应急用的储备粮食。。。）'
          +'\n（咀嚼咀嚼。。。）'
          +'\n（虽然嘴巴里的水分都被它吸走了，但和普通的饼干一样好吃呢）'
          +'\n（可是吃多了还是会腻。。。）'
          +'\n（好想抹上奶油或是果酱喔。。。）'
          +'\n（咦？那我直接吃面包不就好了？）'
          +'\n（好想吃面包！）'
          +'\n（纯真上升1）'
          +'\n（呼~吃得好满足）'
          +'\n(GP-200，饱食度+40)';
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+40,goldc:data[0].goldc-200,innocence:data[0].innocence+1
          });
          return str;
      }

        // 刀削面
        export async function food5(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
          if(data[0].hunger>100){
            return '你太饱了，已经什么都吃不下了';
          }
          if(data[0].goldc<10){
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+10
            });
            return '你没有钱了。你要了一份剩菜。（饱食度+10）';
          }
          let str='';
          str+='（刀削面在呼唤着我。。。！）'
          +'\n（这个弹牙的口感真让人受不了~）'
          +'\n（来多少碗都吃得下！）'
          +'\n（不过削面的师傅还真厉害啊。每条面的宽度和长度都差不多）'
          +'\n（这就是专家的技术吗。。。我是不是努力下看看也能做到呢？）'
          +'\n（纯真上升1）'
          +'\n（呼~吃得好满足）'
          +'\n(GP-1000，饱食度+100，体力+30)';
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+100,goldc:data[0].goldc-1000,stamina:data[0].stamina+30,innocence:data[0].innocence+1
          });
          return str;
      }

      // 麻婆豆腐
      export async function food6(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
          if(data[0].hunger>100){
            return '你太饱了，已经什么都吃不下了';
          }
          if(data[0].goldc<10){
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+10
            });
            return '你没有钱了。你要了一份剩菜。（饱食度+10）';
          }
          let str='';
          str+='（这时就该选正宗麻婆豆腐！）'
          +'\n（奇怪，比我预期的还要辣！？）'
          +'\n（该怎么说呢。。。似乎听到了什么。。。似乎感觉到了什么。。。！）'
          +'\n（现在我的内心颤动不已。。。！）'
          +'\n（呼~）'
          +'\n（我会说声，能吃到麻婆豆腐真是太好了。。。）'
          +'\n（纯真上升1）'
          +'\n（呼~吃得好满足）'
          +'\n(GP-1000，饱食度+80，体力+18，精力+18)';
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+100,goldc:data[0].goldc-1000,stamina:data[0].stamina+18,spirit:data[0].spirit+18,innocence:data[0].innocence+1
          });
          return str;
      }
      // 意式奶酪
      export async function food7(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
          if(data[0].hunger>100){
            return '你太饱了，已经什么都吃不下了';
          }
          if(data[0].goldc<10){
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+10
            });
            return '你没有钱了。你要了一份剩菜。（饱食度+10）';
          }
          let str='';
          str+='（意式奶酪是什么啊？吃吃看吧）'
          +'\n（哦。。。用奶油和草莓酱来分层，超时髦的哎）'
          +'\n（在汤勺上抖动的弹嫩甜点。。。啊姆）'
          +'\n（我的奶奶啊，意式奶酪超好吃）'
          +'\n（完蛋，这样搞得像是我讲了一个超冷的笑话！）'
          +'\n（好像没被别人听到。。。）'
          +'\n（很好，安全通过。。。）'
          +'\n（纯真上升1）'
          +'\n（呼~吃得好满足）'
          +'\n(GP-5000，饱食度+100，精力+100)';
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+100,goldc:data[0].goldc-5000,spirit:data[0].spirit+100,innocence:data[0].innocence+1
          });
          return str;
      }
      // 珍珠奶茶
      export async function food8(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
          if(data[0].hunger>100){
            return '你太饱了，已经什么都吃不下了';
          }
          if(data[0].goldc<10){
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+10
            });
            return '你没有钱了。你要了一份剩菜。（饱食度+10）';
          }
          let str='';
          str+='（珍珠奶茶以外的东西都入不了我的眼！我好想喝一次看看啊）'
          +'\n（喔喔，这就是珍珠吗，好软Q。。。是可以享受口感的东西吗）'
          +'\n（我有看过照片，以前好像还流行过放在胸部上面的喝法。。。）'
          +'\n（这种程度对我轻轻松松。。。奇怪，放不上去？）'
          +'\n（哭哭！）'
          +'\n（我这样的大小不行吗。。。）'
          +'\n（等等？那就靠角度。。。喔喔，我也办到了！）'
          +'\n（纯真上升1）'
          +'\n（呼~喝得好满足）'
          +'\n(GP-500，饱食度+20，精力+10)';
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+20,goldc:data[0].goldc-500,spirit:data[0].spirit+10,innocence:data[0].innocence+1
          });
          return str;
      }
      // 椰果
      export async function food9(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
          if(data[0].hunger>100){
            return '你太饱了，已经什么都吃不下了';
          }
          if(data[0].goldc<10){
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+10
            });
            return '你没有钱了。你要了一份剩菜。（饱食度+10）';
          }
          let str='';
          str+='（选椰果吧。我想感受那个Q弹的口感）'
          +'\n（椰果这东西好像跟什么都很搭呢。。。）'
          +'\n（那试试看沾酱油吃吧）'
          +'\n（。。。。。。）'
          +'\n（好像乌贼生鱼片。是有甜味的乌贼生鱼片）'
          +'\n（只要有椰果。就算乌贼全部灭绝也能吃到乌贼生鱼片！）'
          +'\n（纯真上升1）'
          +'\n（呼~吃得好满足）'
          +'\n(GP-500，饱食度+20，精力+10)';
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+20,goldc:data[0].goldc-500,spirit:data[0].spirit+10,innocence:data[0].innocence+1
          });
          return str;
      }
      // 黄金炒饭
      export async function food10(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
          if(data[0].hunger>100){
            return '你太饱了，已经什么都吃不下了';
          }
          if(data[0].goldc<10){
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+10
            });
            return '你没有钱了。你要了一份剩菜。（饱食度+10）';
          }
          let str='';
          str+='（这是只有蛋和米的炒饭来着吗）'
          +'\n（正是因为简单，才更不能蒙混过关的究极炒饭）'
          +'\n（来吧，开动！）'
          +'\n（咀嚼咀嚼。。。）'
          +'\n（这是！明明很湿润的米饭，却在口中松开，变得粒粒分明！）'
          +'\n（同时，温和的咸味和鸡蛋的风味在口中蔓延！）'
          +'\n（可是中式炒饭和日式炒饭到底差在哪里啊？）'
          +'\n（算了，好吃就好）'
          +'\n（纯真上升1）'
          +'\n（呼~吃得好满足）'
          +'\n(GP-800，饱食度+100)';
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+100,goldc:data[0].goldc-800,innocence:data[0].innocence+1
          });
          return str;
      }
      // 粽子
      export async function food11(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
          if(data[0].hunger>100){
            return '你太饱了，已经什么都吃不下了';
          }
          if(data[0].goldc<10){
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+10
            });
            return '你没有钱了。你要了一份剩菜。（饱食度+10）';
          }
          let str='';
          str+='（粽子。。。是用竹叶包住糯米蒸煮的料理吧）'
          +'\n（竹子的香气真能激发食欲啊）'
          +'\n我开动了。'
          +'\n（喔喔~Q弹的感觉真让人欲罢不能。它好像很耐饿，所以应该也可以当作随身粮食）'
          +'\n（但是。。。）'
          +'\n（日式点心里面也有粽子，但完全不一样呢）'
          +'\n（算了，反正两种都很好吃）'
          +'\n（纯真上升1）'
          +'\n（呼~吃得好满足）'
          +'\n(GP-400，饱食度+50)';
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+50,goldc:data[0].goldc-400,innocence:data[0].innocence+1
          });
          return str;
      }
      // 饭团
      export async function food12(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
          if(data[0].hunger>100){
            return '你太饱了，已经什么都吃不下了';
          }
          if(data[0].goldc<10){
            await ctx.database.set('ap01', session.userId, {
              hunger:data[0].hunger+10
            });
            return '你没有钱了。你要了一份剩菜。（饱食度+10）';
          }
          let str='';
          str+='（饭团啊。。。小藏有做给我吃过）'
          +'\n（吃吃看吧）'
          +'\n（外表跟小藏做得一模一样。。。味道的话）'
          +'\n（咀嚼咀嚼。。。）'
          +'\n（有盐味和脆海苔的风味。。。味道一样）'
          +'\n（但是。。。米饭很松软，没有嚼劲）'
          +'\n（虽然这也很好吃，却让我意识到再也吃不到她的饭团了。。。）'
          +'\n（纯真上升1）'
          +'\n（呼~吃得好满足）'
          +'\n(GP-400，饱食度+50)';
          await ctx.database.set('ap01', session.userId, {
            hunger:data[0].hunger+50,goldc:data[0].goldc-400,innocence:data[0].innocence+1
          });
          return str;
      }
}
