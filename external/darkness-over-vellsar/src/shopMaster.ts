export interface ShopItem {
     name :string
     price :number
     quantity :number
}

export module ShopMaster {
    export function getClothItemMaster():ShopItem[] {
       return initClothItemlist();
    }
    function initClothItemlist() :ShopItem[]{
        const item: ShopItem[] = [
            { name: '低调的私服', price: 2000, quantity: 1 },
            { name: '学院制服（春）', price: 3000, quantity: 1 },
            { name: '学院制服（夏）', price: 3000, quantity: 1 },
            { name: '学院制服（秋）', price: 3000, quantity: 1 },
            { name: '学院制服（冬）', price: 3000, quantity: 1 },
            { name: '运动服（长袖）', price: 5000, quantity: 1 },
            { name: '运动服（短袖）', price: 5000, quantity: 1 },
            { name: '学院泳装（藏青）', price: 5000, quantity: 1 },
            { name: '学院泳装（黑）', price: 5000, quantity: 1 },
            { name: '学院泳装（白）', price: 5000, quantity: 1 },                    
            { name: '绅士服', price: 8000, quantity: 1 },
            { name: '华丽的私服', price: 8000, quantity: 1 },
            { name: '巫女服', price: 15000, quantity: 1 },
            { name: '和服', price: 15000, quantity: 1 },
            { name: '纯白礼服', price: 15000, quantity: 1 },
            { name: '乌鸦礼服', price: 15000, quantity: 1 },
            { name: '纯白婚纱', price: 15000, quantity: 1 },
            { name: '漆黑婚纱', price: 15000, quantity: 1 },
            { name: '兔女郎服', price: 10000, quantity: 1 },
            { name: '黑色裤袜', price: 1600, quantity: 1 },
            { name: '白色裤袜', price: 1600, quantity: 1 },
            { name: '黑色长筒袜', price: 800, quantity: 1 },
            { name: '白色长筒袜', price: 800, quantity: 1 },
            { name: '黑白条纹长筒袜', price: 800, quantity: 1 },
            { name: '黑色吊带袜', price: 800, quantity: 1 },
            { name: '白色吊带袜', price: 800, quantity: 1 },
            { name: '黑白条纹吊带袜', price: 800, quantity: 1 },
            { name: '网袜', price: 3000, quantity: 1 },
            { name: '足袋', price: 500, quantity: 1 },
            { name: '冒险者短靴', price: 500, quantity: 1 },
            { name: '木屐', price: 500, quantity: 1 },
            { name: '黑色高跟鞋', price: 1600, quantity: 1 },
            { name: '红色高跟鞋', price: 1600, quantity: 1 },
            { name: '银色高跟鞋', price: 2000, quantity: 1 },
            { name: '运动鞋', price: 500, quantity: 1 },
            { name: '学院皮鞋', price: 500, quantity: 1 },
            { name: '黑色圆头洛丽塔鞋', price: 3000, quantity: 1 },
            { name: '蓝白内裤', price: 500, quantity: 1 },
            { name: '纯白蝴蝶结内裤', price: 1000, quantity: 1 },
            { name: '黑色蕾丝内裤', price: 1000, quantity: 1 },
            { name: '白色头带', price: 200, quantity: 1 },
            { name: '黑色头带', price: 200, quantity: 1 },
            { name: '红色头带', price: 200, quantity: 1 },
            { name: '蓝色头带', price: 200, quantity: 1 },
            { name: '兔耳', price: 500, quantity: 1 },
            { name: '猫耳', price: 500, quantity: 1 },
            // ... 更多的数据
          ];
       return item;
    }
    export function getClothShopItem(name:string) :ShopItem{
        const itemlist: ShopItem[] =initClothItemlist(); 
        const item = itemlist.find(item => item.name === name);
       return item;
    }
}
