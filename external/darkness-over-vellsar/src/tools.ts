import { Context, Keys } from "koishi";
import { ap01 } from "./database";
import { Item, ItemMaster } from "./itemMaster";

export module Tools {
  export class MethodExecutor {
    private methodMap: { [key: string]: (...args: any[]) => Promise<string> } = {};
  
    public addMethod(methodName: string, method: (...args: any[]) => Promise<string>): void {
        this.methodMap[methodName] = method;
    }
  
    public executeMethod(methodName: string, ...args: any[]): Promise<string> {
        const method = this.methodMap[methodName];
        if (method) {
            return method(...args);
        } else {
            return Promise.resolve(`我听不懂`);
        }
    }
  }
  export function getNextTime(time:string):string {
    let myMap = new Map();
    // 向 Map 中添加键值对
    myMap.set('早晨', '上午');
    myMap.set('上午', '正午');
    myMap.set('正午', '下午');
    myMap.set('下午', '傍晚');
    myMap.set('傍晚', '深夜');
    myMap.set('深夜', '凌晨');
    myMap.set('凌晨', '早晨');
    return myMap.get(time);
  }

  export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 移动check：二级限制
  export function moveCheck(data:Pick<ap01, Keys<ap01, any>>[]): string {
    if(data==null||data.length<1){
      return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
    }
    // 体精饥小于0或者行动不能时不能走路
    if(data[0].stamina<0||data[0].spirit<0||data[0].incap==1){
      return '你使不上一点劲，哪里都去不了。';
    }
    // 睡觉时不能走路
    if(data[0].sleep==1){
      return '你在梦里前往了你想去的地方，但是那里空无一人,你大声呼喊，但是谁都没有来。';
    }
    // 拘束时不能走路
    if(data[0].restra==1){
      return '你被拘束中，无法行动。';
    }
    // 完全屈服时不能离开
    if(data[0].tsubm==1){
      return '你不想离开这里,你完全屈服了。';
    }
    // 特殊任务
    if(data[0].splmis==1){
      return '你正在特殊任务中，无法离开。';
    }
    return ''
  }

    // 行动check：一级限制
    export function actionCheck(data:Pick<ap01, Keys<ap01, any>>[]): string {
      if(data==null||data.length<1){
        return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
      }
      if(data[0].gender==null||data[0].gender==''){
        return '请告诉我你的性别（/选择性别 （男/女））';
      }
      if(data[0].incap==1){
        return '你使不上一点劲。';
      }
      if(data[0].sleep==1){
        return '你还在睡觉。';
      }
      if(data[0].restra==1){
        return '你被拘束中';
      }
      return ''
    }
    // 行动check：二级限制
    export function sexCheck(data:Pick<ap01, Keys<ap01, any>>[]): string {
      if(data==null||data.length<1){
        return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
      }
      if(data[0].gender==null||data[0].gender==''){
        return '请告诉我你的性别（/选择性别 （男/女））';
      }
      if(data[0].stamina<0||data[0].spirit<0||data[0].hunger<0||data[0].incap==1){
        return '你使不上一点劲。';
      }
      if(data[0].sleep==1){
        return '你还在睡觉。';
      }
      if(data[0].restra==1){
        return '你被拘束中';
      }
      return ''
    }
    // 获取
    export async function get(ctx: Context,id:string,name:string,quantity:number) {
      let item =await ctx.database.get('ap02', {id: id,name:name});
      if(item==null||item.length<1){
        let itemMaster=ItemMaster.getItem(name);
        await ctx.database.create('ap02', { id: id, name: itemMaster.name ,def:itemMaster.def,type:itemMaster.type,quantity:100});
      }else{
        await ctx.database.set('ap02', {
          id:id,name:name
        }, {
          quantity:item[0].quantity+quantity
        });
      }
    }
    // // /无法行动check
    // export function actionCheck(data:Pick<ap01, Keys<ap01, any>>[]): string {
    //   if(data==null||data.length<1){
    //     return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
    //   }
    //   if(data[0].stamina<0||data[0].spirit<0||data[0].hunger<0){
    //     return '你使不上一点劲，哪里都去不了。';
    //   }
    //   if(data[0].sleep==1){
    //     return '你在梦里前往了你想去的地方，但是那里空无一人,你大声呼喊，但是谁都没有来。';
    //   }
    //   return ''
    // }
}