import { Context } from "koishi";
import { Tools } from './tools'
export module EventManager {
    //杂志宠物特刊
    export async function event1(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（世界都变成这样了，杂志到底是谁发行的啊？等等，是军方吗！？是军方在出版杂志吗！？）'
      +'\n（而且还是宠物特辑，这世道哪能养什么猫猫狗狗啊！但是照片好可爱喔！简直是折磨人！）'
      +'\n（但是。。。好奇妙喔。。。）'
      +'\n（只是读着这本杂志，心情就像有养宠物一样。。。原来有这种效果啊。。。）'
      +'\n（哈啊。。。整个人都被治愈了）'
      +'\n白虎：“吼。。。”'
      +'\n（白虎在图书馆里！？）'
      +'\n苍井 绘梨花：“嗯，很怀念吧，白虎。这是你小时候的照片喔”'
      +'\n（她们再看宠物特辑！原来那只猫是小时候的白虎啊！）'
      +'\n白虎：“吼。。。”'
      +'\n（苍井和白虎一起看杂志，真是温馨的景象。。。）'
      +'\n（度量上升1）'
      +'\n（呼~长知识了）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }

    //历史类的书
    export async function event2(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（好，难得来了，就来学习历史吧）'
      +'\n（既然背负着人类的命运，那了解人类的过去也是很重要的事）'
      +'\n（总之。。。先从超古代文明开始吧）'
      +'\n。。。。。。。。。。。。'
      +'\n怎么会这样！苏美文明竟然是外星人带来的！'
      +'\n（原来也有善良的外星人啊。。。）'
      +'\n（度量上升1）'
      +'\n（呼~长知识了）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }
    //哲学书
    export async function event3(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（来读读哲学书好了。了解人类的本质，应该能让我脱胎换骨）'
      +'\n（苏格拉底？我好像有听过。总之先读这本吧）'
      +'\n。。。。。。。。。。。。'
      +'\n。。。。。。嗯！完全不懂！'
      +'\n（这就是所谓的「只有神知道」啊）'
      +'\n（。。。。。。苏格拉底大师是不是把解释的责任都丢给别人了啊？）'
      +'\n（度量上升1）'
      +'\n（呼~长知识了）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }
    //杂志（炽天使特辑）
    export async function event4(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（来读军方出版的杂志吧。是炽天使大赛特辑耶！）'
      +'\n（说不定是在解说各种炽天使的战斗形态！）'
      +'\n（我看看喔。。。「我设计的最强炽天使」。。。）'
      +'\n（全长2公里的刀身，还有厚度0.1毫米的坚不可摧盾牌，以及能够轰飞月亮的超远程枪。。。）'
      +'\n（。。。充满了前人们不切实际的梦想，还有无限的想象力）'
      +'\n（度量上升1）'
      +'\n（呼，觉得自己变得有教养了）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }
    //恋爱小说
    export async function event5(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（来读恋爱小说，培养一下感性吧）'
      +'\n（嗯。。。原来这个年纪的女生都在想这些事啊~）'
      +'\n（等等！我也是这个年纪嘛！）'
      +'\n（读完后，我了解到自己是和普通女孩子天差地别的存在。。。）'
      +'\n（突然好想见小希喔。。。因为小希也是那种存在吧。。。）'
      +'\n（度量上升1）'
      +'\n（呼，觉得自己变得有教养了）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }
    //绘本
    export async function event6(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（竟然看绘本，我是小孩子吗？）'
      +'\n（但这也是图书馆的藏书，来读读看吧）'
      +'\n（画好精致！现在都画得这么精致了吗!？）'
      +'\n（背景也很惊人！这是一个人独力创作的吗！？作者处只有一个人名。。。）'
      +'\n（这个作者根本是天才嘛，但如果不是独力完成，就构成欺诈了喔）'
      +'\n（度量上升1）'
      +'\n（呼，觉得自己变得有教养了）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }
    //杂志（泳装写真特辑）
    export async function event7(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（最新一期杂志的特辑是。。。泳装写真！？军方没疯吧！？）'
      +'\n（这一定要好好检阅一下！）'
      +'\n翻阅。。。翻阅。。。'
      +'\n（真是太糟糕了。。。）'
      +'\n（如果让小希来穿，会构成妨害风化）'
      +'\n（唉呀~大饱眼福）'
      +'\n（度量上升1）'
      +'\n（嗯，还有许多我不知道的事呢）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }

    //轻小说
    export async function event8(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（来读充满梦想、希望和中二的奇幻作品，丰富一下想象力吧）'
      +'\n（还有年代久远的轻小说喔）'
      +'\n（唔唔。。。歼灭盗贼，还毫不手软地施放魔法，是个跳脱框架的魔导士啊）'
      +'\n（不过咒语太令人着迷了。。。！）'
      +'\n（这样的炽天使指令或许会很帅气呢！）'
      +'\n（度量上升1）'
      +'\n（嗯，还有许多我不知道的事呢）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }

    //医学书籍
    export async function event9(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（战斗时免不了受伤，学习医学绝对不会吃亏）'
      +'\n（从人体的奥秘开始读吧）'
      +'\n翻阅。。。'
      +'\n（好恶心！内脏的照片超粉红！）'
      +'\n（人类的血管太多了吧！全部连起来的总长度可以绕地球二圈半，真的没搞错！？）'
      +'\n（人体是有40兆个细胞组成的？数字大到我的脑子无法负荷啦！）'
      +'\n（人体的神秘之处多到爆啊。。。为什么我们会动呢？）'
      +'\n（度量上升1）'
      +'\n（嗯，还有许多我不知道的事呢）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }
    //杂志（神秘现象特辑）
    export async function event10(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（来读军方出版的杂志吧。这期的特辑是。。。基地的七大不可思议？）'
      +'\n（居然在这科学最前线的地方，出版什么神秘现象特辑。。。）'
      +'\n翻阅。。。'
      +'\n（钟楼的人影、砖艺桥上的女性、殡仪馆的抽泣声。。。）'
      +'\n（停机坪上不断整修的人影、模拟训练中徒增的队员、餐厅里总是多一个杯子。。。）'
      +'\n（隐藏小径的怪声。。。呃，这大概是指我们吧？）'
      +'\n（虽然没遇到任何一个。。。）'
      +'\n（。。。嗯？监修·柊木梢）'
      +'\n全部都是真的——！'
      +'\n（度量上升1）'
      +'\n（呼，感觉身为人的品格与综合能力都提升了）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }

    //随笔
    export async function event11(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（有资深音乐人的随笔，就读这本吧）'
      +'\n（啊啊。。。我想起了。。。那些音乐界的黑暗面。。。）'
      +'\n（我是自愿离开业界，但还是有继续奋斗的人们啊。。。）'
      +'\n（咦？连这种事情都写出来，真的没关系吗！？不会被冻结吗！？）'
      +'\n（了不起。。。这人是认真的。。。不惜拼上自己的人生，也想改变业界。。。）'
      +'\n（从中获得了勇气，我也要继续努力）'
      +'\n（度量上升1）'
      +'\n（呼，感觉身为人的品格与综合能力都提升了）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }

    
    //自我成长书籍
    export async function event12(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（我想成为能干的人。读些自我成长书籍，提升自己的能力吧）'
      +'\n翻阅。。。'
      +'\n（太多外文，根本看不懂啦）'
      +'\n（这世上的能干领导者，都能熟练地运用这么难的词吗？）'
      +'\n（如果我也学会使用这些词，就能成为更上一层楼的领导者！）'
      +'\n（不对。。。说错了）'
      +'\n（如果me也学会了speak这些phrase，就能成为one up的leader！）'
      +'\n（度量上升1）'
      +'\n（呼，感觉身为人的品格与综合能力都提升了）'
      await ctx.database.set('ap01', session.userId, {
        hunger:data[0].hunger-10,spirit:data[0].spirit-20,stamina:data[0].stamina-10,measure:data[0].measure+1
      });
      return str;
    }

      //露天泳池
      export async function event13(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（和平常的感觉不太一样，有点心跳加速。。。）'
        +'\n（但是，看得到天空的开放感真叫人受不了。。。）'
        +'\n（平日的疲劳都飞走了）'
        +'\n（哎呀。。。真是天堂。。。）'
        +'\n（温柔上升1）'
        +'\n（啊~满足了满足了！）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
        });
        return str;
      }

      
      //桑拿
      export async function event14(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（在桑拿流汗，应该会对身体有好处。。。）'
        +'\n（啊啊，就是这个就是这个。把坏东西排出去。体内就会焕然一新——）'
        +'\n（在这里呆越久，就越有战胜自己的感觉，这也是一种爽快感）'
        +'\n（呼~要把坏东西通通排出去喽——！）'
        +'\n（温柔上升1）'
        +'\n（啊~满足了满足了！）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
        });
        return str;
      }

        //泡泡按摩浴
        export async function event15(session: any,ctx: Context): Promise<string> {
          let data =await ctx.database.get('ap01', session.userId);
    
    
          let check=Tools.actionCheck(data);
          if(check!=''){
            return check;
          };
          let str='';
          str+='（超爽的~！喷出来的泡泡舒缓了僵硬的身体~）'
          +'\n（像是在做全身按摩一样。。。）'
          +'\n（而且泡泡会遮住身体，也能推荐给容易害羞的人）'
          +'\n（真的是欲罢不能。。。好像可以永远泡下去）'
          +'\n（温柔上升1）'
          +'\n（啊~满足了满足了！）'
          await ctx.database.set('ap01', session.userId, {
            goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
          });
          return str;
        }
      //蒸气桑拿
      export async function event16(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（喔，蒸气桑拿的蒸气是暖的呀）'
        +'\n（视野也是一片白茫茫，好好玩）'
        +'\n（从身体深处开始变得暖呼呼的。。。这真舒服啊。。。）'
        +'\n（总觉得肌肤也变得柔韧有弹性。蒸气桑拿真厉害）'
        +'\n（深呼吸一下，喉咙变得超滋润的！）'
        +'\n（温柔上升1）'
        +'\n（啊——神清气爽！）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
        });
        return str;
      }
      //冷水浴池
      export async function event17(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（泡冷水浴池的作用是什么呢？凡事先尝试就对了，去泡看看吧）'
        +'\n伊喔喔喔喔喔！'
        +'\n（冷死我啦冷死我啦冷死我啦！皮肤好痛！心脏好痛！）'
        +'\n（但是静静呆着不动，就觉得身体开始变暖和了。。。？）'
        +'\n（就像是疲劳感渐渐地排到体外一样）'
        +'\n（对冷水浴有点上瘾了。。。）'
        +'\n（温柔上升1）'
        +'\n（啊——神清气爽！）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
        });
        return str;
      }

      //喷射按摩池
      export async function event18(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='哇啊啊啊啊啊啊啊！'
        +'\n（强劲的水流缓解了身体的僵硬——！）'
        +'\n（感觉就像是被热水痛殴了一顿——！）'
        +'\n（水流冲到背部时，紧绷的肌肉都被舒展了——！）'
        +'\n（冲肚子说不定可以锻炼腹肌！）'
        +'\n（我明明是来泡澡的，怎么感觉超级累啊————！）'
        +'\n（温柔上升1）'
        +'\n（啊——神清气爽！）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit-5,stamina:data[0].stamina+15,gentle:data[0].gentle+1
        });
        return str;
      }
      //岩盘浴
      export async function event19(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（来做岩盘浴吧！）'
        +'\n（躺在温暖的石头上，好有趣的体验。。。）'
        +'\n（身体深处开始慢慢地暖和起来了。。。）'
        +'\n（排出了干爽不粘的汗水。。。！这感觉就像身体被净化了。。。！）'
        +'\n（然后。。。好困。。。）'
        +'\n呼噜~'
        +'\n（温柔上升1）'
        +'\n（啊~真是舒服）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
        });
        return str;
      }
      //搓澡
      export async function event20(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（要让对方给我彻底搓一遍身体！让我脱一层皮！）'
        +'\n（喔喔喔喔！开始搓了！明明在搓右脚，却感觉左手麻麻的！？）'
        +'\n（肌肤变得像水煮蛋一样光滑！搓澡好厉害——!）'
        +'\n（又痛又舒服的感觉让人上瘾！）'
        +'\n（温柔上升1）'
        +'\n（啊~真是舒服）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
        });
        return str;
      }
      //电气浴池
      export async function event21(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（泡电气浴池来舒缓全身吧！）'
        +'\n（肌肉、不由自、主、一直震、颤、喔）'
        +'\n（啊、啊、啊、啊~好像被什么抓住了~~）'
        +'\n（感觉像被电流玩弄了。。。！）'
        +'\n（这股震颤感会让人上瘾~！）'
        +'\n（温柔上升1）'
        +'\n（啊~真是舒服）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
        });
        return str;
      }
       //浊汤
       export async function event22(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（看到混浊的温泉水，就会觉得有很多疗效）'
        +'\n（这里面有混入温泉粉吗。。。）'
        +'\n（这里写着源泉直流。。。所以白色的热水是从地底涌出来的吗！？这里是东京耶！？）'
        +'\n（我还以为靠近火山的地方才会涌出温泉）'
        +'\n（在外面看还觉得水很浑浊，从浴池出来一看，水滴却很清澈呢，真是不可思议）'
        +'\n（温柔上升1）'
        +'\n（啊啊~身体都暖起来了）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
        });
        return str;
      }     
      //瀑布浴
      export async function event23(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（好像是要让落下的热水直接冲淋想放松的部位）'
      +'\n（那就先冲肩膀吧）'
      +'\n哦。。。奇怪？再来一次！咦咦？'
      +'\n（没办法对准想冲淋的部位！）'
      +'\n（一点点地。。。小心地调整位置。。）'
      +'\n啊啊啊啊啊啊啊啊~'
      +'\n（利用飞流而下的热水按摩，好舒服喔~）'
      +'\n神崎 阿黛尔海德：“临、兵、斗、者、皆、阵、列、在、前！”'
      +'\n（嗯嗯？隔壁好像在做瀑布修行？）'
      +'\n很好，我也来。临、兵、斗、者、皆、阵、列、在、前！'
      +'\n神崎 阿黛尔海德：“忍法！攀登瀑布之术！”'
      +'\n唦啪啪啪啪啪啪'
      +'\n不会吧！爬上来瀑布浴——！？'
      +'\n真的假的！？难道说我也办得到！？'
      +'\n忍法！攀登瀑布之术！'
      +'\n。。。。。。'
      +'\n绝对不可能——！'
      +'\n（温柔上升1）'
      +'\n（啊啊~身体都暖起来了）'
      await ctx.database.set('ap01', session.userId, {
        goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
      });
      return str;
    } 
      //足浴
      export async function event24(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（真的只要讲脚浸泡在热水里就能温暖全身？我也来试试）'
        +'\n（明明只有浸泡脚部，却全身都热了起来。。。）'
        +'\n（泡再久也不会头晕，可以一直泡下去。。。）'
        +'\n（这种舒服的感觉让人着迷。。。）'
        +'\n（感觉快要睡着了。。。）'
        +'\n呼噜~'
        +'\n（温柔上升1）'
        +'\n（啊啊~身体都暖起来了）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-3000,hunger:data[0].hunger-10,spirit:data[0].spirit+5,stamina:data[0].stamina+5,gentle:data[0].gentle+1
        });
        return str;
      } 
      //动作电影
      export async function event25(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（看部动作表现精彩的电影，嗨一下吧）'
        +'\n（目前上映中的片子是「龙争虎斗」，年代有点久远，却是一部名作）'
        +'\n（不要思考。。。去感觉就好。。。）'
        +'\n（真厉害。。。只是看了电影就觉得自己变强了！）'
        +'\n。。。吼哇————————————！'
        +'\n（疯狂上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
        });
        return str;
      } 
      //恋爱电影
      export async function event26(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（只要了解什么是爱。。。人一定能变强）'
        +'\n（目前上映中的片子是「第六感生死恋」吗？幽灵恋爱类型的经典老片）'
        +'\n。。。。。。'
        +'\n呜呜。。。爱过的人明明一直在自己身边，却看不到，也不能跟他说话。。。'
        +'\n在浴室里起雾的镜子上写字。。。虽然是恐怖片要素，但好催泪。。。'
        +'\n（疯狂上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
        });
        return str;
      } 
    //动物电影
    export async function event27(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（动物类型的电影总是很催泪呢）'
      +'\n（目前上映中的片子是「子猪物语」。。。）'
      +'\n。。。。。。'
      +'\n（真是罪恶的电影呀。。。）'
      +'\n（小猪仔在旅行的时候认识许多动物，不断成长，然后。。。就被端上餐桌）'
      +'\n（不过，所谓的因果真是奇妙啊。。。）'
      +'\n好想吃炸猪排。。。'
      +'\n（疯狂上升1）'
      await ctx.database.set('ap01', session.userId, {
        goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
      });
      return str;
    } 
    //科幻电影
    export async function event28(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（现在就身处相当科幻的世界，看科幻电影多补充点知识吧。。。）'
      +'\n（目前上映中的片子是。。。「阴暗角色 星空效应」？）'
      +'\n（身为阴暗角色的爸爸为了拯救地球飞向宇宙，听说是名作。。。总之就看这部）'
      +'\n（一下子被丢到多重宇宙，一下子又去回溯时空。。。好难懂的电影）'
      +'\n（亲情的部分好感人。。。）'
      +'\n（但这部片还是有够难懂）'
      +'\n（相当值得考据。。。这就是所谓的名作吗？）'
      +'\n（疯狂上升1）'
      await ctx.database.set('ap01', session.userId, {
        goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
      });
      return str;
    } 
    //恐怖电影
    export async function event29(session: any,ctx: Context): Promise<string> {
      let data =await ctx.database.get('ap01', session.userId);


      let check=Tools.actionCheck(data);
      if(check!=''){
        return check;
      };
      let str='';
      str+='（来培养看了恐怖电影也不会害怕的胆量吧）'
      +'\n（上映中的片子是。。。「0.7夜怪谈」。我记得是怨灵会从电视机爬出来的知名作品，就看这部！）'
      +'\n（贞男。。。好恐怖。。。！已经知道剧情还是超恐怖！而且电影的音响又超大声，感官刺激更要命了）'
      +'\n（但是。。。我到结尾都没被吓到喔！嗯，绝对没有！）'
      +'\n（我可是队长耶。。。最好别太小看我喔。。。）'
      +'\n可可怜：“不过，这时的自负就是'+data[0].name+'的致命疏忽。等她注意到刀刃逼近逼近自己的背后，一切都已经太迟了。。。“'
      +'\n不要啊————！这是什么杀人旁白！'
      +'\n可可怜：“嘻——嘻呀哈哈哈哈!!可可怜从你背后登场————！“'
      +'\n可可怜：“反应不错喔！“'
      +'\n你是什么时候站在我背后的？'
      +'\n可可怜：“在你进电影院前，老娘就一直跟着你喽“'
      +'\n天啊！早知道就不选恐怖电影，看其他能让可可怜更开心的电影就好了！'
      +'\n可可怜：“老娘已经很开心喽，憋笑憋到快爆炸了“'
      +'\n虽然看的是恐怖电影，但在你眼中，那应该是喜剧吧？'
      +'\n可可怜：“看到你那拼命压抑着内心恐惧，不停发抖的背影，实在是太滑稽了。“'
      +'\n我身为队长的威严————!'
      +'\n（疯狂上升1）'
      await ctx.database.set('ap01', session.userId, {
        goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
      });
      return str;
    } 
      //喜剧电影
      export async function event30(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（能够轻松观赏，放声大笑的电影比较好）'
        +'\n（目前上映中的片子是。。。「超高速！大名游行」？）'
        +'\n（直到抵达江户都不会停下脚步的大名游行。真是超出常理。。。）'
        +'\n。。。。。。'
        +'\n（剧情发展很热血嘛！这才不是喜剧好吗！）'
        +'\n（智略vs谋略，武打动作加上友情、爱情。。。啊啊，热血沸腾啦！）'
        +'\n（总有一天，我要申请一支只有刀剑类型炽天使的临时部队）'
        +'\n（然后我也要来一个。。。超高速！废域走一回！）'
        +'\n（疯狂上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500, hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
        });
        return str;
      }
      //青春电影
      export async function event31(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（偶尔会想看闪闪发光的青春电影呢）'
        +'\n（目前上映中的片子是「波霸篮球」？这片名太糟糕了吧）'
        +'\n（弱小的篮球社如果赢得大赛冠军，顾问老师就给他们看胸部。。。这剧情真下流）'
        +'\n（。。。不看不行）'
        +'\n（对于胸部的执着很惊人，青春洋溢的感觉也很棒）'
        +'\n（甚至连无法获得冠军的状况也考虑到了，能从完全的准备之中，感受到对胸部的执着）'
        +'\n（总而言之，为了胸部，人就能坚持努力）'
        +'\n（好！去请求司令官吧！只要打倒了星癌体，就让我看她的胸部！）'
        +'\n（被臭骂了一顿。。。）'
        +'\n（疯狂上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
        });
        return str;
      }
      //灾难电影
      export async function event32(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（目前上映中的片子是「海王星号」？）'
        +'\n（剧情是要逃离遭到海啸袭击而180度翻覆的豪华游轮。。。考验人类的极限。就看这部吧）'
        +'\n（怎么这样。。。为了拯救孩子，大人一个接一个地牺牲了。。。）'
        +'\n（但这样一来，未来就有了希望。。。）'
        +'\n（如果我的伙伴为了让我继续前进而牺牲。。。）'
        +'\n（。。。）'
        +'\n（唉。。。不可能发生那种像电影剧情的事吧？）'
        +'\n（真正的发展应该是，我一时得意忘形就冲过头，然后最先领便当）'
        +'\n夏洛特·斯可波夫斯加：“果然，大家都抛下夏洛死去。。。“'
        +'\n（啊，是夏洛）'
        +'\n夏洛特·斯可波夫斯加：“说了会回来，但最终没有任何人能做到。。。“'
        +'\n夏洛特·斯可波夫斯加：“要夏洛先走，她们会随后跟上，但同样没有任何人做到。。。“'
        +'\n（她是不是想起了痛苦的往事。。。）'
        +'\n夏洛特·斯可波夫斯加：“但 夏 洛 记 得 大 家 喔 。。。“'
        +'\n（咦？刚才一瞬间好像成了恐怖电影？）'
        +'\n夏洛特·斯可波夫斯加：“呵呵。。。呵呵呵呵。。。“'
        +'\n（疯狂上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
        });
        return str;
      }
      //鲨鱼电影
      export async function event33(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（「台风飞鲨」。。。？鲨鱼会乘着台风飞过来）'
        +'\n（超莫名其妙的。总之先看再说吧）'
        +'\n（乘着强力台风飞来的鲨鱼，好可怕！那根本躲不掉啊！）'
        +'\n（如果星癌体也像那样，乘着台风飞来。。。）'
        +'\n（不，不会有事的！到时军方能开发出电锯型的炽天使，就能对抗它！）'
        +'\n（下次让樋妹也来看看这部电影吧）'
        +'\n（疯狂上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
        });
        return str;
      }
      //科幻恐怖电影
      export async function event34(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（科幻和恐怖的组合啊，未知的恐怖能刺激到人的感受性呢）'
        +'\n（目前上映中的片子是「恐怖异形」。以太空船为舞台背景，剧情是要逃离未知生物）'
        +'\n（咦，遭到充满谜团的宇宙生物攻击前，剧情还算紧凑刺激，可是。。。）'
        +'\n（主角用拳击击倒敌人了。。。）'
        +'\n（是这种作品吗？恐怖异形——？）'
        +'\n（好像有续集，将来上映了再来看吧）'
        +'\n（疯狂上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
        });
        return str;
      }
      //悬疑电影
      export async function event35(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（目前上映中的片子是「灵异混合感」。这部电影有某个秘密？）'
        +'\n（看我在上映期间，揭露这个秘密）'
        +'\n（不行了。。。我完全投降啦，没想到那个竟然是伏笔！）'
        +'\n（以那种手法使用第六感的部分有点奸诈，而少年的成长让人激动，最后还这么催泪。。。）'
        +'\n（啊——!好想找人分享这份感动喔！）'
        +'\n（但那样做会暴雷，所以什么都不能说！早知道就邀人来一起看了！）'
        +'\n（疯狂上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
        });
        return str;
      }
      //侠义电影
      export async function event36(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（「无伦理之战」正在上映。。。这好像是侠义电影的名作呢）'
        +'\n（侠义电影给人的印象，就是相当重视羁绊，或许有值得学习的地方）'
        +'\n（咦————！这些几乎是真实事件吗！？）'
        +'\n（拿刀又拿枪，前脚逮捕后脚就逃狱，组织斗争加上背叛，然后复仇。。。）'
        +'\n（虽然人与人之间的羁绊很重要，做到这种程度太吓人啦。。。）'
        +'\n黑泽 真希：“有够赞。。。姐的血开始强强滚呐“'
        +'\n啊，是希希。'   
        +'\n这是年代相当久远的老片了，你果然喜欢这种电影？'  
        +'\n黑泽 真希：“嘿呀，姐自古早就有看咧，今嘛搁看就感到怀念。“'   
        +'\n（暴走族果然是那个世界的人啊。。。！）'  
        +'\n黑泽 真希：“这部电影的拍摄地，就在姐家附近咧。“'  
        +'\n原来是当成乡土电影在看吗！'  
        +'\n（疯狂上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger-10,spirit:data[0].spirit-10,crazy:data[0].crazy+1
        });
        return str;
      }
      //筷子卷
      export async function event37(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（来吃筷子卷吧。第一次吃好像是巡演去九州的时候。。。）'
        +'\n（单煎什锦烧的面糊，再把它卷到筷子上，到底是谁想出来的啊）'
        +'\n（但是上面满满的酱汁和美乃滋都好好吃！）'
        +'\n（红姜也超赞的——！）'
        +'\n（度量上升1）'
        +'\n（呼，我也充分享受到现买现吃的乐趣了。。。）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger+10,spirit:data[0].spirit+10,measure:data[0].measure+1
        });
        return str;
      }
      //御座候
      export async function event38(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（御座候？好像武士的语尾喔。这到底是什么食物啊。。。）'
        +'\n（外表不就是今川烧吗！好奇怪的名字）'
        +'\n咀嚼咀嚼。。。'
        +'\n（不就是今川烧吗！就是今川烧是也！）'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger+10,spirit:data[0].spirit+10,measure:data[0].measure+1
        });
        return str;
      }
      //蛋仙贝
      export async function event39(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（来吃蛋仙贝好了！之前巡演到大阪的时候有吃过，我记得很好吃。。。）'
        +'\n（虾饼的酥脆口感，再加上酱汁和美乃滋的咸甜滋味，真叫人受不了！）'
        +'\n（不只是有吃到垃圾食品的满足感，作为平价美食也是一级棒）'
        +'\n（而且竟然还很有饱足感，简直是无可挑剔）'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-500,hunger:data[0].hunger+10,spirit:data[0].spirit+10,measure:data[0].measure+1
        });
        return str;
      }
      //默剧
      export async function event40(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（来挑战默剧吧）'
        +'\n（我记得像是不说话的模仿剧）'
        +'\n（来模仿看看超会弹吉他的吉他手吧）'
        +'\n。。。。。。（弹吉他）'
        +'\n观众：哇~（拍手）'
        +'\n（大家的反应很好。虽然很想说谢谢，但是我得忍耐才行。因为我现在是默剧演员）'
        +'\n。。。。。。（弹吉他）'
        +'\n观众：哇~（拍手）'
        +'\n（想说话却没法说，还真难受耶）'
        +'\n啊，这不是默剧，是空气吉他吧！'
        +'\n。。。啊，不小心出声了。'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-10,measure:data[0].measure+1
        });
        return str;
      }
      //杂耍
      export async function event41(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（挑战看看杂耍抛接球吧，边看教学。。。）'
        +'\n唷、喝、哈。'
        +'\n（嗯。。。只是单纯用手好像有点无聊。。。用脚试试看吧！）'
        +'\n呼、唷、嘿。'
        +'\n（。。。奇怪？这不就是挑球吗？）'
        +'\n（而且内裤绝对被看光光了吧。不过被看到了也没差就是了）'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-10,measure:data[0].measure+1
        });
        return str;
      }
      //叫卖香蕉
      export async function event42(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.sexCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（挑战看看叫卖香蕉吧！）'
        +'\n来呀来呀，走过路过千万别错过！'
        +'\n今天的香蕉很划算喔，老板不赚钱的跳楼大拍卖！'
        +'\n那边的姐姐们如何啊！不来看一下的话香蕉很寂寞耶！'
        +'\n（完全卖不出去。。。）'
        +'\n（没办法，我自己吃掉吧）'
        +'\n（咀嚼咀嚼。。。真好吃）'
        +'\n（好好享受独占这份美味的幸福感吧）'
        +'\n（gp-5000,饱食+500，体力-30，度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          goldc:data[0].goldc-5000,hunger:data[0].hunger+500,stamina:data[0].stamina-30,measure:data[0].measure+1
        });
        return str;
      }
      //摇滚乐
      export async function event43(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
  
  
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（人生就是Rocl and Roll！）'
        +'\n（来场最棒的摇滚演唱会吧！）'
        +'\n你们统统都来给我听歌————！'
        +'\n。。。。。。（演唱）'
        +'\n观众：哇——!哇——!'
        +'\nThank you,Thank you.'
        +'\n（哈啊~唱得真过瘾，神清气爽！）'
        +'\n（就是因为这样才不时想自弹自唱呢）'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-10,measure:data[0].measure+1
        });
        return str;
      }

      //抒情歌
      export async function event44(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（来唱抒情歌吧）'
        +'\n（这里很绿意盎然。。。人也没有很多。。。最重要的是风吹起来很舒服）'
        +'\n（这种气氛应该很适合沉静的歌吧）'
        +'\n用心唱给大家听吧。。。'
        +'\n。。。。。。（演唱）'
        +'\n观众：（拍手）'
        +'\n哎呀~谢谢谢谢~'
        +'\n（偶尔唱一下沉静的歌也不错呢）'
        +'\n（再唱个几首吧。虽然我会的抒情歌也不多）'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-10,measure:data[0].measure+1
        });
        return str;
      }

      //激情硬核
      export async function event45(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（用木吉他做得到吗？）'
        +'\n（就试试看吧。我会让所有人都痛彻心扉的）'
        +'\n吱呀哐当轰隆隆隆~!!'
        +'\n（呼。。。好险。。。我自己差一点要哭出来了。。。）'
        +'\n（不，抒情系，还有激情硬核的人声就是这样的。。。要哭出来才有味道。。。）'
        +'\n（让大家更加深入感受我的这份心情吧！！）'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-10,measure:data[0].measure+1
        });
        return str;
      }
      //发面纸
      export async function event46(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（来发发面纸吧。包包里有随身携带的面纸其实意外地有用呢）'
        +'\n现在正在发送面纸。要不要来一包啊~'
        +'\n。。。。。。'
        +'\n（全部的路人连看都不看我一眼。。。！这里的人。。。不简单！）'
        +'\n（快回想起来。。。在车站前发面纸的大哥大姐们都用什么技巧。。。！）'
        +'\n要不要来一包面纸啊~'
        +'\n路人：（拿）'
        +'\n（好耶！就这样把面纸发完吧！）'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-10,measure:data[0].measure+1
        });
        return str;
      }
      //街头问卷调查
      export async function event47(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（如果是问大家对炽天使部队的一件，搞不好能帮上忙）'
        +'\n我在做简单的问卷调查。不会占用太多时间，请大家帮个忙吧。'
        +'\n。。。。。。'
        +'\n（收集到很多呢。我看看。。。）'
        +'\n（炽天使部队的活跃表现。总是带给我很多勇气。我们补给部队也会加油不输给大家的）'
        +'\n（嗯嗯。。。其他呢。。。）'
        +'\n（因为有你们在前面奋战，我们支援部队才能放心工作。请你们一定要平安归来）'
        +'\n（下一个是。。。）'
        +'\n（希望你们趁休假的时候，能享受一下同龄人的青春。我会开店等着你们的）'
        +'\n（啊啊。。。想让大家看看这个意见呢）'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-10,measure:data[0].measure+1
        });
        return str;
      }
      //演讲
      export async function event48(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（说到可以在街头做的事，就是演讲了）'
        +'\n（呐喊大家说不出口的心事，最终这份共鸣将成为旋风改变世界）'
        +'\n（。。。奇怪？这跟演唱会有什么不同啊。。。？）'
        +'\n（音乐其实是。。。演讲吗。。。？难道我有成为政治家的资质。。。？）'
        +'\n（战争结束后，成立She is Legend党来进军政坛好像也不错）'
        +'\n各位路人朋友！请大家多多支持She is Legend党！'
        +'\n（度量上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-10,measure:data[0].measure+1
        });
        return str;
      }
      //伸展运动
      export async function event49(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（只要够认真伸展，其实就是很好的运动了）'
        +'\n（嗯嗯——!哦哦~！膝盖后面伸展开来好舒服~）'
        +'\n（听说身体变柔软就不容易受伤，真是不错的运动）'
        +'\n（但是手完全碰不到脚尖）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //卧推
      export async function event50(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（卧推。。。巡演的时候为了增加体力好像做过几次）'
        +'\n（听说也有丰胸的效果，但我没兴趣）'
        +'\n（呼。。。呼。。。呼。。。）'
        +'\n（呼~肌肉也开始抖动了，感觉不错）'
        +'\n（我也好想被人家说「简直是巧克力腹肌」！！）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //跑步机
      export async function event51(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（体力就是全部的本钱。为了在战斗中不会累倒，来跑步吧）'
        +'\n哈啊哈啊。。。'
        +'\n（真意外，我好像蛮能跑的啊。。。）'
        +'\n（嗯？这个跑步机，会记录跑步距离然后显示排行榜吗）'
        +'\n（好~以第一名为目标！）'
        +'\n哈啊哈啊。'
        +'\n大岛 六宇亚：“哈啊哈啊，这个机器，我可以跑到天荒地老！好舒服！”'
        +'\n（隔壁跑得好拼命啊）'
        +'\n大岛 六宇亚：“提高速度！提高！提高！”'
        +'\n（时速15公里。。。！？）'
        +'\n大岛 六宇亚：“好腻害！哈啊哈啊！这个跑步机逼着我跑步！我是这台机器的奴隶——！”'
        +'\n（好恐怖！她边跑边说着好恐怖的话！）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //热瑜伽
      export async function event52(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（不愧是热瑜伽，整个房间都很暖和呢。好像很厉害）'
        +'\n（把两手尽量向外伸展，单脚90度弯曲，另一只脚也尽量拉直。。。）'
        +'\n（。。。Virabhadrasana）'
        +'\n（啊啊。。。肩胛骨跟腰真舒服~）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //哑铃
      export async function event53(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（试着用哑铃锻炼漂亮的肱二头肌吧）'
        +'\n（做这种锻炼时，呼吸很重要）'
        +'\n（呼。。。哈——呼。。哈——）'
        +'\n（呜哇——肉眼都看得出来手腕胀起来了！有用有用~！）'
        +'\n（如果做的时候不呼吸会发生什么事啊？）'
        +'\n（完蛋。。。头上的血管感觉要被爆了。做的时候还是好好呼吸吧）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //飞轮车
      export async function event54(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（这个器材好像脚踏车啊）'
        +'\n（配合要骑的路线，荧幕的景色居然会改变，好厉害~）'
        +'\n（有河堤跟街道之类的很多种呢）'
        +'\n（哇~好怀念喔。。。是被星癌体袭击前的风景。。。）'
        +'\n（好想哭。。。第一次锻炼到这么想哭。。。）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //有氧舞蹈
      export async function event55(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（大家聚在一起跳舞真开心！好像踢拳训练喔！）'
        +'\n（配合节奏，一二！一二！）'
        +'\n（让我回想起新兵训练的事啊呢~）'
        +'\n（再一组！）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //腿部推举机
      export async function event56(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（挑战腿部推举机吧！）'
        +'\n（感觉好像乘坐驾驶舱喔。。。）'
        +'\n（以操作机器人的感觉来训练看看。。。）'
        +'\n（累死人啦————！）'
        +'\n（但是肌肉一定不会背叛我的！）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //划船机
      export async function event57(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（这个要怎么操作？坐在这，再拉动拉杆。。。？）'
        +'\n（啊！动作像是在划船）'
        +'\n（很耗体力呢）'
        +'\n（去划船约会的情侣都这么辛苦吗。。。）'
        +'\n（或许有一天我也会去划船，趁现在加紧练习好了）'
        +'\n（不，我完全无法想象那场景。。。）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //拳击训练
      export async function event58(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（刺拳！一二！直拳！上勾拳！）'
        +'\n（觉得自己有变强，情绪越来越高昂了！）'
        +'\n咻、咻！呼！'
        +'\n（现在的我超像人类，就算被说是人型·纳比也没有人会信）'
        +'\n一二！勾拳！直拳！'
        +'\n白虎：“吼。。。”'
        +'\n嗯？白虎？你也要做拳击训练吗？'
        +'\n白虎：“吼~”'
        +'\n好啊，那就先出刺拳！'
        +'\n白虎：“吼！”'
        +'\n接着，一二！一二！'
        +'\n白虎：“吼！吼！”'
        +'\n出的都是猫拳嘛。'
        +'\n白虎：“吼。”'
        +'\n不过，一定比我的拳头更有威力。'
        +'\n白虎：“吼~”'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //深蹲
      export async function event59(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（增强体力的基础从下盘开始）'
        +'\n（如果不用正确姿势做深蹲，会伤到腰部或膝盖，要小心一点）'
        +'\n嗯————！'
        +'\n（。。。动作好单调喔）'
        +'\n（虽然单调。。。但是大腿肌肉超酸！觉得自己很像人类！）'
        +'\n（人型·纳比到底完美复制到什么地步呢）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
      //腹部训练机
      export async function event60(session: any,ctx: Context): Promise<string> {
        let data =await ctx.database.get('ap01', session.userId);
        let check=Tools.actionCheck(data);
        if(check!=''){
          return check;
        };
        let str='';
        str+='（这台椅背装有握把，外表像椅子的器材，就是腹部训练机啊。。。）'
        +'\n（不用支撑身体，看起来蛮轻松的，今天就用这个做训练吧）'
        +'\n（我看看喔，手肘弯曲成90度，以肚脐为中心卷曲背部，向腹肌施加压力。。。）'
        +'\n呼~~~~~吸~~~~~'
        +'\n（喔喔。。。比预想的还要有效。。。！觉得自己很像人类！）'
        +'\n（人型·纳比到底完美复制到什么地步呢）'
        +'\n（心理韧性上升1）'
        await ctx.database.set('ap01', session.userId, {
          hunger:data[0].hunger-10,stamina:data[0].stamina-20,mental:data[0].mental+1
        });
        return str;
      }
  }