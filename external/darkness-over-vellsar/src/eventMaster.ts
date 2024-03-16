export interface Event {
     id:number
     def :string
     type :string
     limit:number
     place :string
     item:string
     quantity:number
     acme:number
}

export module EventMaster {
    export function getItemMaster():Event[] {
       return initItemlist();
    }
    function initItemlist() :Event[]{
        const item: Event[] = [
               { id:1, def: '你被一个路过的痴汉摸了一下胸。\n性感值+10', type: 'H' ,limit:0,place:'地下街',item:'',quantity:0,acme:10},
               { id:2, def: '你被一个路过的痴汉摸了一下おしり。\n性感值+10', type: 'H' ,limit:0,place:'地下街',item:'',quantity:0,acme:10},
               { id:3, def: '你被一个路过的痴汉摸了一下おマンコ。\n性感值+20', type: 'H' ,limit:0,place:'地下街',item:'',quantity:0,acme:20},
               { id:4, def: '你被一个路过的痴汉狠狠抱住来了下舌吻。（唔！。。嗯嗯。。。嗯~~♡）\n性感值+20', type: 'H',limit:0 ,place:'地下街',item:'',quantity:0,acme:20},
               { id:5, def: '你被一个路过的痴汉拽到了阴影处，对方狠狠地强暴了你。\n性感值+100，白浊液+10，EROS+1', type: 'H',limit:1  ,place:'地下街',item:'白浊液',quantity:10,acme:100},
               { id:6, def: '你被三个路过的痴汉拽到了阴影处，三人一起强暴了你。\n性感值+300，白浊液+30，EROS+1', type: 'H',limit:1  ,place:'地下街',item:'白浊液',quantity:10,acme:300},
            // ... 更多的数据
          ];
       return item;
    }
    export function getEventList(type:string,place:string,limit:number) :Event[]{
        const itemlist: Event[] =initItemlist(); 
        const item =itemlist.filter(item => item.place == place&&item.limit<=limit&&item.type==type);
       return item;
    }
    export function getItem(id:number) :Event{
      const itemlist: Event[] =initItemlist(); 
      const item = itemlist.find(item => item.id === id);
     return item;
  }
}