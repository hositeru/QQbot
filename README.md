# Koishi 模板仓库

本仓库包含了 Koishi 的模板项目。

## 使用教程

<https://koishi.chat/manual/starter/boilerplate.html>

## 启动
npm run start

## 启动开发者模式
npm run dev

## 编译
npm run build

## 创建一个新插件
npm run setup darkness-over-vellsar
    
    if((session.content)=='查询作者'){
      let name1 = await ctx.database.get('ap01', [1], ['name']);
      return (String(h('at',{id:(session.userId)}))+'ID：作者的名字叫:'+name1[0].name);
    }


  })
  ctx.command('插入 <table:string> <ID:string> <name:string>').action(async ({session},...args)=>{

    if(args[0]=='ap01'){
      await ctx.database.create('ap01', { id: args[1], name: args[2] });
      return ('插入数据成功');
    }
  })

  // write your plugin here
  ctx.middleware(async (session,next)=>{
    if((session.content)=='查询作者'){
      let name1 = await ctx.database.get('ap01', [1], ['name']);
      return (String(h('at',{id:(session.userId)}))+'ID：作者的名字叫:'+name1[0].name);
    }
    if((session.content)=='序言'){
      return ('“威尔萨”是一个充满利爪、獠牙和战斗的漆黑世界。\n为了争夺沉睡中的\n“黑暗之王”绝对者的王座，\n魑魅魍魉陷入了无尽的冲突。\n永恒之夜即将结束，\n觉醒的时刻会到来吗？');
    }
    if((session.content)=='你好'){
      return (' …轮回吧…巡行吧…嗯哼哼～');
    }
      
    return next();
  })
  ctx.command('查询 <table:string> <ID:string>').action(async ({session},...args)=>{
    // if(args[0]=='channelId'){
    //   return session.channelId;
    // }
    // if(args[0]=='userId'){
    //   return session.userId;
    // }
    // if(args[0]=='username'){
    //   return session.username;
    // }
    if(args[0]=='ap01'){
      let name1 = await ctx.database.get('ap01', [args[1]], ['name']);
      if(name1!=null&&name1.length>0){
        return name1[0].name;
      }else{
        return '未查询到结果';
      }
    }
  })
  ctx.command('插入 <table:string> <ID:string> <name:string>').action(async ({session},...args)=>{

    if(args[0]=='ap01'){
      await ctx.database.create('ap01', { id: args[1], name: args[2] });
      return ('插入数据成功');
    }
  })
  ctx.command('更新 <table:string> <ID:string> <name:string>').action(async ({session},...args)=>{

    if(args[0]=='ap01'){
      await ctx.database.set('ap01', args[1], {
        name: args[2],
      })
      return ('更新数据成功');
    }
  })
  ctx.command('删除 <table:string> <ID:string> ').action(async ({session},...args)=>{

    if(args[0]=='ap01'){
      await ctx.database.remove('ap01', args[1]);
      return ('删除数据成功');
    }
  })


  [Lv4星辉彩奈]

星辉彩奈你的当前数据：
金币：0
堕落：0
经验：0
种族：妖族
性别：女
饱食：100%
体力：100%
精力：100%
健康：100%
理智：100%
卫生：100%
快乐：100%
位置：幽暗街道