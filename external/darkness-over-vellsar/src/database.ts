/*数据库操作模块*/
import { Context } from 'koishi'
declare module 'koishi' {
    interface Tables {
        ap01: ap01//角色表
        ap02: ap02//背包
        ap03: ap03//奴隶市场
    }
}
export interface ap01 {
     id :string
     name :string
     bday :string
     gender :string
     level :number
     race :string
     hunger :number
     spirit :number
     health :number
     sanity :number
     shame :number
     evalue :number
     elevel :number
     corpt :number
     incap :number
     paras :number
     preg :number
     virgn :number
     fencntr :string
     estrus :number
     addctn :number
     sleep :number
     restra :number
     tsubm :number
     snsup :number
     burn :number
     frozen :number
     mpois :number
     berse :number
     dimm :number
     fpois :number
     hypno :number
     blind :number
     charm :number
     qtsk :number
     locat :string
     goldc :number
     exppt :number
     logindate :string
     stamina :number
     cloth :string
     foot :string
     head :string
     shoes :string
     pants :string
     timestage :string
     pickupid :string
     masterid :string
     splmis :number
     slavery :number
     acme :number
     measure:number
     gentle:number
     innocence:number
     mental:number
     crazy:number
     charisma:number
}
export interface ap02 {
    id :string
    name :string
    def :string
    type :string
    quantity :number
}
export interface ap03 {
    id :string
    name :string
    gender :string
    race :string
    price :number
}


export module DB {
    export async function initTable(ctx: Context) {
        //console.log('Init database.');
        await initAp01Table(ctx);
        await initAp02Table(ctx);
        await initAp03Table(ctx);
    }
    async function initAp01Table(ctx: Context) {
        if (ctx.model.tables.ap01 === undefined) {
            ctx.model.extend('ap01', {
                id :{ type: 'string' },
                name : { type: 'string' },
                bday :{ type: 'string' },
                gender :{ type: 'string' },
                level :{ type: 'integer' },
                race :{ type: 'string' },
                hunger :{ type: 'integer' },
                spirit :{ type: 'integer' },
                health :{ type: 'integer' },
                sanity :{ type: 'integer' },
                shame :{ type: 'integer' },
                evalue :{ type: 'integer' },
                elevel :{ type: 'integer' },
                corpt :{ type: 'integer' },
                incap :{ type: 'integer' },
                paras :{ type: 'integer' },
                preg :{ type: 'integer' },
                virgn :{ type: 'integer' },
                fencntr :{ type: 'string' },
                estrus :{ type: 'integer' },
                addctn :{ type: 'integer' },
                sleep :{ type: 'integer' },
                restra :{ type: 'integer' },
                tsubm :{ type: 'integer' },
                snsup :{ type: 'integer' },
                burn :{ type: 'integer' },
                frozen :{ type: 'integer' },
                mpois :{ type: 'integer' },
                berse :{ type: 'integer' },
                dimm :{ type: 'integer' },
                fpois :{ type: 'integer' },
                hypno :{ type: 'integer' },
                blind :{ type: 'integer' },
                charm :{ type: 'integer' },
                qtsk :{ type: 'integer' },
                locat :{ type: 'string' },
                goldc :{ type: 'integer' },
                exppt :{ type: 'integer' },
                logindate :{ type: 'string' },
                stamina :{ type: 'integer' },
                cloth :{ type: 'string' },
                foot :{ type: 'string' },
                head :{ type: 'string' },
                shoes :{ type: 'string' },
                pants :{ type: 'string' },
                timestage:{ type: 'string' },
                pickupid:{ type: 'string' },
                masterid:{ type: 'string' },
                splmis :{ type: 'integer' },
                slavery :{ type: 'integer' },
                acme :{ type: 'integer' },
                measure :{ type: 'integer' },
                gentle :{ type: 'integer' },
                innocence :{ type: 'integer' },
                mental :{ type: 'integer' },
                crazy :{ type: 'integer' },
                charisma :{ type: 'integer' },
            }, {
                primary: 'id',
            })
        }
    }

    async function initAp02Table(ctx: Context) {
        if (ctx.model.tables.ap02 === undefined) {
            ctx.model.extend('ap02', {
                id :{ type: 'string' },
                name : { type: 'string' },
                def :{ type: 'string' },
                type :{ type: 'string' },
                quantity :{ type: 'integer' },
            })
        }
    }
    async function initAp03Table(ctx: Context) {
        if (ctx.model.tables.ap03 === undefined) {
            ctx.model.extend('ap03', {
                id :{ type: 'string' },
                name : { type: 'string' },
                gender :{ type: 'string' },
                race :{ type: 'string' },
                price :{ type: 'integer' },
            })
        }
    }
}