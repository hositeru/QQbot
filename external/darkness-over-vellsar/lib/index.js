"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.Config = exports.name = void 0;
const koishi_1 = require("koishi");
const database_1 = require("./database");
exports.name = 'darkness-over-vellsar';
exports.Config = koishi_1.Schema.object({});
class MethodExecutor {
    methodMap = {};
    addMethod(methodName, method) {
        this.methodMap[methodName] = method;
    }
    executeMethod(methodName, ...args) {
        const method = this.methodMap[methodName];
        if (method) {
            return method(...args);
        }
        else {
            return Promise.resolve(`Method '${methodName}' not found.`);
        }
    }
}
function apply(ctx) {
    ctx.middleware(async (session, next) => {
        console.log(session.content);
        let str = '';
        if (session.content.startsWith('<at id="8503773913771718566"/>')) {
            str = extractContentAfterSecondSpace(session.content);
        }
        else {
            return next();
        }
        ctx.on('ready', async () => {
            await database_1.DB.initTable(ctx);
        });
        const methodExecutor = new MethodExecutor();
        init(methodExecutor);
        return methodExecutor.executeMethod(extractCommand(str), session, ctx);
    });
}
exports.apply = apply;
function init(methodExecutor) {
    methodExecutor.addMethod("/创建角色", createChara);
    methodExecutor.addMethod("/决定名字", decideName);
    methodExecutor.addMethod("/种族列表", getRaceList);
    methodExecutor.addMethod("/选择种族", selectRace);
    methodExecutor.addMethod("/选择性别", selectGender);
    methodExecutor.addMethod("/完成角色创建", complete);
    methodExecutor.addMethod("/指令一览", commandList);
    methodExecutor.addMethod("/属性", parameter);
    methodExecutor.addMethod("/装饰", decoration);
    methodExecutor.addMethod("/装备", equipment);
    methodExecutor.addMethod("/战斗配置", battleConfig);
    methodExecutor.addMethod("/购买", startsWithPurchase);
    methodExecutor.addMethod("/卖出", startsWithSell);
    methodExecutor.addMethod("/去", startsWithGo);
    methodExecutor.addMethod("/战斗", battle);
    methodExecutor.addMethod("/背包", inventory);
    methodExecutor.addMethod("/醒来", wakeUp);
    methodExecutor.addMethod("/睡觉", sleep);
    methodExecutor.addMethod("/查看", info);
    methodExecutor.addMethod("/猜拳", rockPaperScissors);
}
function formatDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}${month}${day}`;
}
function currentTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const currentHour = currentDate.getHours().toString().padStart(2, '0');
    return `${year}${month}${day}${currentHour}`;
}
function splitStringBySpace(input) {
    // 使用 split 方法将字符串按空格分割成数组
    return input.split(' ');
}
function extractCommand(input) {
    // 使用正则表达式匹配第一个空格之前的内容
    const match = input.match(/^(\S+)\s/);
    if (match) {
        // 如果匹配成功，返回提取到的指令
        return match[1];
    }
    else {
        // 如果没有匹配到空格，返回 null 或者你认为合适的默认值
        return input;
    }
}
function extractContentAfterSecondSpace(input) {
    // 使用正则表达式匹配第二个空格之后的所有字符
    const match = input.match(/[^ ]* [^ ]* (.+)/);
    if (match) {
        // 如果匹配成功，返回提取到的内容
        return match[1];
    }
    else {
        // 如果没有匹配到，返回 null 或者你认为合适的默认值
        return null;
    }
}
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRockPaperScissorsStr(num) {
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
function getRockPaperScissorsNum(str) {
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
async function rockPaperScissors(session, ctx) {
    const match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
    if (match.length > 1) {
        let message = '';
        let userChoice = getRockPaperScissorsNum(match[3]);
        if (userChoice == 0) {
            return '嗯哼哼～耍赖可不行哦，我愚蠢的孩子。';
        }
        let computerChoice = generateRandomNumber(1, 3);
        message += '我出的是' + getRockPaperScissorsStr(computerChoice) + '。\n';
        if (userChoice === computerChoice) {
            return message += "真厉害，竟然跟我平局...";
        }
        else if ((userChoice === 1 && computerChoice === 3) ||
            (userChoice === 2 && computerChoice === 1) ||
            (userChoice === 3 && computerChoice === 2)) {
            return message += "！！没想到，我竟然输了...是我低估了你。";
        }
        else {
            return message += "一切都在我的预测之中，是我赢了呢，嗯哼哼～";
        }
    }
    else {
        return '想跟我猜拳？可以试一试哦，反正我也很闲。（例:输入@弗洛洁斯 猜拳 剪刀/石头/布）';
    }
}
// /创建角色
async function createChara(session, ctx) {
    let data = await ctx.database.get('ap01', session.userId);
    if (data != null && data.length > 0) {
        return '你已经创建过角色了';
    }
    else {
        return '欢迎来到威尔萨，请发送 /决定名字 XXX 来决定你的角色名字。\n一经决定无法更改。';
    }
}
// /决定名字
async function decideName(session, ctx) {
    const match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
    if (match.length > 1) {
        let data = await ctx.database.get('ap01', session.userId, ['name']);
        if (data != null && data.length > 0) {
            return '你已经决定过你的名字了。你的名字叫' + data[0].name + '。';
        }
        else {
            await ctx.database.create('ap01', { id: session.userId, name: match[1], bday: formatDate() });
            return ('你的名字叫' + match[1] + '\n请发送 /种族列表 来查看所有种族\n请发送 /选择种族 XXX 来选择你的种族');
        }
    }
    else {
        return '请告诉我你的名字（/决定名字 XXX）';
    }
}
// /种族列表
async function getRaceList(session, ctx) {
    return '【人族】\n已经灭绝\n\n\n【妖族】\n能细分为众多种族，甚至单一个体，统称为妖族,常年内战\n\n\n【龙人】\n威尔萨最大的族群，有明确的上下关系\n\n\n【吸血鬼】\n被其他种族合力讨伐，几乎绝迹';
}
// /选择种族
async function selectRace(session, ctx) {
    const match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
    if (match.length > 1) {
        let data = await ctx.database.get('ap01', session.userId, ['race']);
        if (data == null || data.length < 1) {
            return '你还没决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
        }
        if (data[0].race != null && data[0].race.length > 0) {
            return '你已经选择过你的种族了。你的种族是' + data[0].race + '。';
        }
        else {
            const allowedValues = ['人族', '妖族', '龙人', '吸血鬼'];
            if (allowedValues.includes(match[1])) {
                await ctx.database.set('ap01', session.userId, {
                    race: match[1],
                });
                return ('你的种族是' + match[1] + '\n请发送 /选择性别 （男/女） 来选择你的性别');
            }
            else {
                return '这里不存在这样的种族';
            }
        }
    }
    else {
        return '请告诉我你的种族（/选择种族 XXX）';
    }
}
// /选择性别
async function selectGender(session, ctx) {
    const match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
    if (match.length > 1) {
        let data = await ctx.database.get('ap01', session.userId, ['gender']);
        if (data == null || data.length < 1) {
            return '你还没决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
        }
        if (data[0].gender != null && data[0].gender.length > 0) {
            return '你已经选择过你的性别了。';
        }
        else {
            const allowedValues = ['男', '女'];
            if (allowedValues.includes(match[1])) {
                await ctx.database.set('ap01', session.userId, {
                    gender: match[1],
                });
                return ('你的性别是' + match[1] + '\n请发送 /完成角色创建');
            }
            else {
                return '这里不存在这样的性别';
            }
        }
    }
    else {
        return '请告诉我你的性别（/选择性别 （男/女））';
    }
}
// /完成角色创建
async function complete(session, ctx) {
    let data = await ctx.database.get('ap01', session.userId);
    if (data == null || data.length < 1) {
        return '你还没决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
    }
    if (data[0].race == null || data[0].race.length < 1) {
        return '你还没决定过你的种族。\n请发送 /种族列表 来查看所有种族\n请发送 /选择种族 XXX 来选择你的种族';
    }
    if (data[0].gender == null || data[0].gender.length < 1) {
        return '你还没决定过你的性别。\n请发送 /选择性别 XX 来选择你的性别（男/女）';
    }
    return '恭喜你完成角色创建\n请发送 /指令一览 来查看常用指令';
}
async function commandList(session, ctx) {
    return '/属性\n/装饰\n/装备\n/战斗配置\n/购买 n XXX\n/卖出 n XXX\n/去 XXX\n/背包\n/查看 XXX\n/醒来\n/睡觉（注意！此行为会根据睡觉时间重置体力！不一定会增加！）';
}
// /属性
async function parameter(session, ctx) {
    let data = await ctx.database.get('ap01', session.userId);
    if (data == null || data.length < 1) {
        return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
    }
    let str = '';
    str = 'lv.'
        + data[0].level
        + data[0].name + '（';
    if (data[0].virgn != 0) {
        str += '非';
    }
    str += '处' + data[0].gender + '）'
        + '\n' + '============================' + '\n'
        + '种族：' + data[0].race + '\n'
        + '性别：' + data[0].gender + '\n'
        + '饥饿度：' + data[0].hunger + '\n'
        + '精神值：' + data[0].spirit + '\n'
        + '健康度：' + data[0].health + '\n'
        + '理智：' + data[0].sanity + '\n'
        + '羞耻心：' + data[0].shame + '\n'
        + '堕落度：' + data[0].evalue + '\n'
        + 'H数值：' + data[0].evalue + '\n'
        + 'H等级：' + data[0].elevel + '\n'
        + '异常状态：';
    let flg = true;
    if (data[0].sleep == 1) {
        str += '睡眠 ';
        flg = false;
    }
    if (data[0].incap == 1) {
        str += '行动不能 ';
        flg = false;
    }
    if (data[0].paras == 1) {
        str += '寄生 ';
        flg = false;
    }
    if (data[0].preg == 1) {
        str += '怀孕 ';
        flg = false;
    }
    if (data[0].estrus == 1) {
        str += '发情 ';
        flg = false;
    }
    if (data[0].addctn == 1) {
        str += '上瘾 ';
        flg = false;
    }
    if (data[0].restra == 1) {
        str += '拘束 ';
        flg = false;
    }
    if (data[0].tsubm == 1) {
        str += '完全屈服 ';
        flg = false;
    }
    if (data[0].snsup == 1) {
        str += '感度上升 ';
        flg = false;
    }
    if (data[0].burn == 1) {
        str += '灼热 ';
        flg = false;
    }
    if (data[0].frozen == 1) {
        str += '严寒 ';
        flg = false;
    }
    if (data[0].mpois == 1) {
        str += '魔力中毒 ';
        flg = false;
    }
    if (data[0].berse == 1) {
        str += '狂化 ';
        flg = false;
    }
    if (data[0].dimm == 1) {
        str += '即死无效 ';
        flg = false;
    }
    if (data[0].fpois == 1) {
        str += '食物中毒 ';
        flg = false;
    }
    if (data[0].hypno == 1) {
        str += '催眠 ';
        flg = false;
    }
    if (data[0].blind == 1) {
        str += '失明 ';
        flg = false;
    }
    if (data[0].charm == 1) {
        str += '魅惑 ';
        flg = false;
    }
    if (flg) {
        str += '无';
    }
    return str;
}
// /装饰
async function decoration(session, ctx) {
    return '暂无';
}
// /装备
async function equipment(session, ctx) {
    return '暂无';
}
// /战斗配置
async function battleConfig(session, ctx) {
    return '暂无';
}
// /购买
async function startsWithPurchase(session, ctx) {
    return '暂无';
}
// /卖出
async function startsWithSell(session, ctx) {
    return '暂无';
}
// /去
async function startsWithGo(session, ctx) {
    return '暂无';
}
// /战斗
async function battle(session, ctx) {
    return '暂无';
}
// /背包
async function inventory(session, ctx) {
    let data = await ctx.database.get('ap02', { id: [session.userId] });
    if (data == null || data.length < 1) {
        return String((0, koishi_1.h)('at', { id: (session.userId) })) + '的背包' + '\n空无一物';
    }
    let str = String((0, koishi_1.h)('at', { id: (session.userId) })) + '的背包' + '\n';
    let count = 0;
    data.forEach(item => {
        count++;
        str += item.name + ' ' + item.quantity;
        if (item.type == '宠物') {
            str += '只';
        }
        else if (item.type == '药水') {
            str += '瓶';
        }
        else if (item.type == '装备' || item.type == '装扮' || item.type == '武器') {
            str += '件';
        }
        else {
            str += '个';
        }
        if (count != data.length) {
            str += '，';
        }
    });
    return str;
}
// /查看物品信息
async function info(session, ctx) {
    const match = splitStringBySpace(extractContentAfterSecondSpace(session.content));
    if (match.length < 2) {
        return String((0, koishi_1.h)('at', { id: (session.userId) })) + '请告诉我你要查看的物品（/查看 XXX）';
    }
    let data = await ctx.database.get('ap02', { id: [session.userId], name: [match[1]] });
    if (data == null || data.length < 1) {
        return String((0, koishi_1.h)('at', { id: (session.userId) })) + '你没有该物品';
    }
    else {
        return '【' + data[0].type + '】' + data[0].name + '\n' + data[0].def;
    }
}
// /醒来
async function wakeUp(session, ctx) {
    let data = await ctx.database.get('ap01', session.userId);
    if (data == null || data.length < 1) {
        return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
    }
    let stamina = 0;
    let str;
    if (data[0].sleep == 1) {
        let time = calculateHourDifference(data[0].logindate, currentTime());
        if (time > 0) {
            if (time <= 8) {
                stamina = time * 10;
                str = '你睡醒了，你觉得睡得有点不够，观察四周大致判断了一下时间，睡了' + time + '个小时。';
            }
            else if (time >= 9 && time <= 12) {
                stamina = 100;
                str = '你睡醒了，你觉得睡得很足，观察四周大致判断了一下时间，睡了' + time + '个小时。';
            }
            else if (time <= 36) {
                stamina = 80;
                str = '你睡醒了很久，观察四周大致判断了一下时间，至少睡了12个小时以上，你感觉到了疲劳。';
            }
            else {
                stamina = 50;
                await ctx.database.set('ap01', session.userId, {
                    sleep: 0, logindate: currentTime(), spirit: stamina, stamina: stamina
                });
                return '你昏睡了三天以上，周围环境已经对不上记忆，你感觉到了虚弱。';
            }
        }
        else {
            str = '才过了不到1小时...完全没睡着！';
        }
        let updSpirit = stamina;
        let updStamina = stamina;
        if (stamina < data[0].spirit) {
            updSpirit = data[0].spirit;
        }
        if (stamina < data[0].stamina) {
            updStamina = data[0].stamina;
        }
        await ctx.database.set('ap01', session.userId, {
            sleep: 0, logindate: currentTime(), spirit: updSpirit, stamina: updStamina
        });
        return str;
    }
    else {
        return '你没有在睡觉，你大喊了一声“快醒过来！”，觉得自己的决心更加坚定了。';
    }
}
// /睡觉
async function sleep(session, ctx) {
    let data = await ctx.database.get('ap01', session.userId);
    if (data == null || data.length < 1) {
        return '你还没有决定过你的名字。\n请发送 /决定名字 XXX 来决定你的角色名字。';
    }
    if (data[0].sleep == 1) {
        return '你正在睡觉。';
    }
    else {
        await ctx.database.set('ap01', session.userId, {
            sleep: 1, logindate: currentTime()
        });
        return '你保持着决心，渐渐进入了梦乡。';
    }
}
function calculateHourDifference(yyyymmddhh1, yyyymmddhh2) {
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
