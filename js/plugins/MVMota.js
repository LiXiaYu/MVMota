/// <reference path="DIYHUD.js"/>
//=============================================================================
// MVMota.js
//=============================================================================


//封装在了MVMota里面，装个逼，就当namespace了，或者主class之类
var MVMota=window.MVMota||{};
    //Role基类
    MVMota.Role={
        createNew: function () {
            var role={};
            
            role.name="";
            role.hp=100;
            role.atc=10;
            role.def=5;
            
            role.atcType=1;
            role.atcEffectExtend=[null];
            role.atcEffect=function(){
                var effect=[null];
                //预定义的Type加载
                for(var i=1;i<$dataMVMotaAtcTypes.length;i++){
                    if($dataMVMotaAtcTypes[i].id==role.atcType){
                        for(var j=1;j<$dataMVMotaDefTypes.length;j++){
                            effect.push(1.0);
                        }
                        for(var j=1;j<$dataMVMotaAtcTypes[i].effects.length;j++){
                            effect[$dataMVMotaAtcTypes[i].effects[j].id]=$dataMVMotaAtcTypes[i].effects[j].effect;
                        }
                    }
                }
                //扩展
                for(var j=1;j<role.atcEffectExtend.length;j++){
                    effect[role.atcEffectExtend[j].id]=role.atcEffectExtend[j].effect;
                }
                
                return effect;
            }
            role.AttackValue=function(target){
                return role.atc*role.atcEffect()[target.defType];
            }
            
            role.defType=1;
            role.defEffectExtend=[null];
            role.defEffect=function(){
                var effect=[null];
                //预定义的Type加载
                for(var i=1;i<$dataMVMotaDefTypes.length;i++){
                    if($dataMVMotaDefTypes[i].id==role.defType){
                        for(var j=1;j<$dataMVMotaAtcTypes.length;j++){
                            effect.push(1.0);
                        }
                        for(var j=1;j<$dataMVMotaDefTypes[i].effects.length;j++){
                            effect[$dataMVMotaDefTypes[i].effects[j].id]=$dataMVMotaDefTypes[i].effects[j].effect;
                        }
                    }
                }
                //扩展
                for(var j=1;j<role.defEffectExtend.length;j++){
                    effect[role.defEffectExtend[j].id]=role.defEffectExtend[j].effect;
                }
                
                return effect;
            }
            role.DefendValue=function(target){
                return role.def*role.defEffect()[target.atcType]
            }
            
            
            return role;
        }
    };
    //Hero类，继承自Role
    MVMota.Hero={
        createNew: function () {
            var hero=MVMota.Role.createNew();
            
            hero.name="hero";
            hero.money=0;
            
            
            hero.floor=0;
            //区域，用于判断xxx的
            hero.area=function(){
                return Math.ceil(hero.floor/10)+1;//每10层
            }
            hero.items=MVMota.Item.CreatItemList();
            
            hero.atcType=2;
            
            hero.defType=2;
            
            hero.fight=function (monster) {
                
                do{
                    if(hero.AttackValue(monster)>monster.DefendValue(hero)){
                        monster.hp-=(hero.AttackValue(monster)-monster.DefendValue(hero));
                    }
                    if(monster.hp<=0)
                    {
                        hero.money+=monster.money;
                        return 1;
                    }
                    if(monster.AttackValue(hero)>hero.DefendValue(monster)){
                        hero.hp-=(monster.AttackValue(hero)-hero.DefendValue(monster));
                    }
                    if(hero.hp<=0)
                    {
                        return -1;
                    }
                    
                }while(hero.hp>0&&monster.hp>0)
                
                return 0;
            }
            
            hero.clone=function(){
                var copy=MVMota.Hero.createNew();
                copy.name=hero.name+"_copy";
                copy.hp=hero.hp;
                copy.atc=hero.atc;
                copy.def=hero.def;
                copy.money=hero.money;
                copy.floor=hero.floor;
                for(var i=0;i<hero.items.length;i++)
                {
                    copy.items[i]=hero.items[i];
                }
                
                return copy;
            }
            
            hero.findItemByName=function(name){
                for(var i=1;i<hero.item.length;i++){
                    if(hero.item[i].name==name){
                        return hero.item[i];
                    }
                }
            }
            
            return hero;
        }
    };
    //Monster类，继承自Role
    MVMota.Monster={
        createNew: function () {
            var monster=MVMota.Role.createNew();
            
            monster.id=0;
            monster.money=0;       
            
            return monster;
        },
        //创建怪物通过id，数据来自MVMotaMonsters.json
        buildMonster: function (id) {
            var monster=MVMota.Monster.createNew();
            
            monster.id=$dataMVMotaMonsters[id].id;
            monster.name=$dataMVMotaMonsters[id].name;
            monster.hp=$dataMVMotaMonsters[id].hp;
            monster.atc=$dataMVMotaMonsters[id].atc;
            monster.def=$dataMVMotaMonsters[id].def;
            monster.money=$dataMVMotaMonsters[id].money;
            monster.atcType=$dataMVMotaMonsters[id].atcType;
            monster.defType=$dataMVMotaMonsters[id].defType;
            return monster;
        }
    };
    //Item类
    MVMota.Item={
      createNew:function () {
          var item={};
          
          item.id=0;
          item.name="";
          item.amount=0;
          item.gainBefore=function(){
              return true;
          }
          item.gainOn=function(){
              item.amount++;
              return true;
          }
          item.gainAfter=function(){
              return true;
          }
          item.gain=function(){
              if(item.gainBefore())
              {
                  if(item.gainOn())
                  {
                      return item.gainAfter();
                  }
                  else
                  {
                      return false;
                  }
              }
              else
              {
                  return false;
              }
              
          }
          item.useBefore=function(){
              if(item.amount>0)
              {
                  return true;
              }
              else
              {
                  return false;
              }
          }
          item.useOn=function(){
              return true;
          }
          item.useAfter=function(){
              return item.drop();
          }
          item.use=function(){
              if(item.useBefore())
              {
                  if(item.useOn())
                  {
                      return item.useAfter();
                  }
                  else
                  {
                      return false;
                  }
              }
              else
              {
                  return false;
              }
          }
          item.dropBefore=function(){
              if(item.amount>0)
              {
                  return true;
              }
              else
              {
                  return false;
              }
          }
          item.dropOn=function(){
              item.amount--;
              return true;
          }
          item.dropAfter=function(){
              return true;
          }
          item.drop=function(){
              if(item.dropBefore())
              {
                  if(item.dropOn())
                  {
                      return item.dropAfter();
                  }
                  else
                  {
                      return false;
                  }
              }
              else
              {
                  return false;
              }
          }
          
          return item;
      },
      
      CreatItemList:function(){
          var itemlist=[];
          var items=$dataMVMotaItems;
          if(items==null)
          {
              return null;
          }
          itemlist.push(null);
          for(var i=1;i<items.length;i++)
          {
              var item=MVMota.Item.createNew();
              
              item.id=items[i].id;
              item.name=items[i].name;
              item.amount=items[i].amount;
              if(items[i].gainBefore!="")
              {
                  item.gainBefore=eval(items[i].gainBefore);
              }
              if(items[i].gainOn!="")
              {
                  item.gainOn=eval(items[i].gainOn);
              }
              if(items[i].gainAfter!="")
              {
                  item.gainAfter=eval(items[i].gainAfter);
              }
              if(items[i].useBefore!="")
              {
                  item.useBefore=eval(items[i].useBefore);
              }
              if(items[i].useOn!="")
              {
                  item.useOn=eval(items[i].useOn);
              }
              if(items[i].useAfter!="")
              {
                  item.useAfter=eval(items[i].useAfter);
              }
              if(items[i].dropBefore!="")
              {
                  item.dropBefore=eval(items[i].dropBefore);
              }
              if(items[i].dropOn!="")
              {
                  item.dropOn=eval(items[i].dropOn);
              }
              if(items[i].dropAfter!="")
              {
                  item.dropAfter=eval(items[i].dropAfter);
              }
              
              
              itemlist.push(item);
          }
          
          return itemlist;
      }
    };
    
    MVMota.mainHero=null;
    
    MVMota.Initialize=function () {
        //主英雄 对象 内含数据
        MVMota.mainHero=MVMota.Hero.createNew();
    };
    
    MVMota.changedMaps=[null];
    
////    //道具窗口
    MVMota.ItemWindow={};
    MVMota.ItemWindow.sc=null;
    MVMota.ItemWindow.mw=null;
    MVMota.ItemWindow.usedItemList=[null];
    
    MVMota.ItemWindow.Window_Item=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.ItemWindow.Window_Item.prototype = Object.create(Window_Command.prototype);
    MVMota.ItemWindow.Window_Item.prototype.constructor = MVMota.ItemWindow.Window_Item;
    //初始化
    MVMota.ItemWindow.Window_Item.prototype.initialize = function (){
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x=this.windowPosition().x;
        var y=this.windowPosition().y;
        Window_Command.prototype.initialize.call(this, x, y, width, height);
        this.opacity = this.windowOpacity();


    };
    //窗口位置
    MVMota.ItemWindow.Window_Item.prototype.windowPosition = function (){
        return {x:20,y:20};
    };
    //窗口宽
    MVMota.ItemWindow.Window_Item.prototype.windowWidth = function (){
        return 500;
    };
    //窗口高
    MVMota.ItemWindow.Window_Item.prototype.windowHeight = function (){
        return 500;
    };
    //窗口不透明度
    MVMota.ItemWindow.Window_Item.prototype.windowOpacity = function (){
        return 50;
    };
    /*//更新方法，每次刷新窗口都要执行
    MVMota.ItemWindow.Window_Item.prototype.update = function (){
        this.contents.clear();
        this.addCommand("item","item",true);
    };*/
    
    MVMota.ItemWindow.Window_Item.prototype.makeCommandList=function(){
        var items=MVMota.mainHero.items;
        for(var i=1;i<items.length;i++)
        {
            //this.addCommand("item","item",true);
            this.addCommand(items[i].name+"："+items[i].amount,""+i,true);
        }
    }
    
    MVMota.ItemWindow.Scene_Item=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.ItemWindow.Scene_Item.prototype=Object.create(Scene_MenuBase.prototype);
    MVMota.ItemWindow.Scene_Item.prototype.constructor=MVMota.ItemWindow.Scene_Item;
    MVMota.ItemWindow.Scene_Item.prototype.initialize=function(){
        Scene_MenuBase.prototype.initialize.call(this);
        
    }
    MVMota.ItemWindow.Scene_Item.prototype.create=function(){
        Scene_MenuBase.prototype.create.call(this);
        
        MVMota.ItemWindow.mw=new MVMota.ItemWindow.Window_Item();
        for(var i=1;i<MVMota.mainHero.items.length;i++)
        {
            //MVMota.ItemWindow.mw.setHandler("item",this.commandItem.bind(this));
            MVMota.ItemWindow.mw.setHandler(""+i,this.commandItem.bind(this));
        }
        this.addChild(MVMota.ItemWindow.mw);
        MVMota.ItemWindow.sc=this;
    }
    MVMota.ItemWindow.Scene_Item.prototype.commandItem=function(){
        MVMota.ItemWindow.mw.activate();
        MVMota.ItemWindow.mw.refresh();
        
        var i=parseInt(MVMota.ItemWindow.mw.currentSymbol());
        if(MVMota.mainHero.items[i].amount>0)
        {
            MVMota.ItemWindow.usedItemList.push(i);
            MVMota.mainHero.items[i].amount--;
        }
        MVMota.ItemWindow.mw.refresh();
            
        
    }
    MVMota.ItemWindow.Scene_Item.prototype.update=function(){
        Scene_MenuBase.prototype.update.call(this);
        if (Input.isTriggered('escape') || Input.isTriggered('cancel')) {
            MVMota.ItemWindow.mw.hide();
            SceneManager.goto(Scene_Map);
            for(var i=1;i<MVMota.ItemWindow.usedItemList.length;i++)
            {
                MVMota.mainHero.items[MVMota.ItemWindow.usedItemList[i]].amount++;
                MVMota.mainHero.items[MVMota.ItemWindow.usedItemList[i]].use();
            }
            MVMota.ItemWindow.usedItemList=[null];
            
        }
    }
    
    
////    //怪物图鉴
    MVMota.MonsterBook={};
    MVMota.MonsterBook.monsterList=[];
    MVMota.MonsterBook.monsterRegList=[null];
    MVMota.MonsterBook.sc=null;
    MVMota.MonsterBook.wl=null;
    MVMota.MonsterBook.wi=null;
    MVMota.MonsterBook.usedItemList=[null];
    
    MVMota.MonsterBook.Add=function(id){
        MVMota.MonsterBook.monsterRegList.push(id);
    }
    MVMota.MonsterBook.Remove=function(id){
        for(var i=1;i<MVMota.MonsterBook.monsterRegList.length;i++)
        {
            if(MVMota.MonsterBook.monsterRegList[i]==id)
            {
                MVMota.MonsterBook.monsterRegList.splice(i,1);
                break;
            }
        }
    }
    
    
    //左边，列表窗口
    MVMota.MonsterBook.Window_List=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.MonsterBook.Window_List.prototype = Object.create(Window_Command.prototype);
    MVMota.MonsterBook.Window_List.prototype.constructor = MVMota.MonsterBook.Window_List;
    //初始化
    MVMota.MonsterBook.Window_List.prototype.initialize = function (){
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x=this.windowPosition().x;
        var y=this.windowPosition().y;
        Window_Command.prototype.initialize.call(this, x, y, width, height);
        this.opacity = this.windowOpacity();


    };
    //窗口位置
    MVMota.MonsterBook.Window_List.prototype.windowPosition = function (){
        return {x:20,y:20};
    };
    //窗口宽
    MVMota.MonsterBook.Window_List.prototype.windowWidth = function (){
        return 200;
    };
    //窗口高
    MVMota.MonsterBook.Window_List.prototype.windowHeight = function (){
        return 500;
    };
    //窗口不透明度
    MVMota.MonsterBook.Window_List.prototype.windowOpacity = function (){
        return 50;
    };
    
    MVMota.MonsterBook.Window_List.prototype.makeCommandList=function(){
        for(var i=1;i<MVMota.MonsterBook.monsterList.length;i++)
        {
            var id=MVMota.MonsterBook.monsterList[i];
            this.addCommand(""+$dataMVMotaMonsters[id].name,""+i,true);
        }
    }
    
    //右边，信息窗口
    MVMota.MonsterBook.Window_Information=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.MonsterBook.Window_Information.prototype = Object.create(Window_Selectable.prototype);
    MVMota.MonsterBook.Window_Information.prototype.constructor = MVMota.MonsterBook.Window_Information;
    //初始化
    MVMota.MonsterBook.Window_Information.prototype.initialize = function (){
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x=this.windowPosition().x;
        var y=this.windowPosition().y;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.opacity = this.windowOpacity();
    };
    //窗口位置
    MVMota.MonsterBook.Window_Information.prototype.windowPosition = function (){
        return {x:220,y:20};
    };
    //窗口宽
    MVMota.MonsterBook.Window_Information.prototype.windowWidth = function (){
        return 500;
    };
    //窗口高
    MVMota.MonsterBook.Window_Information.prototype.windowHeight = function (){
        return 500;
    };
    //窗口不透明度
    MVMota.MonsterBook.Window_Information.prototype.windowOpacity = function (){
        return 50;
    };
    
    //场景
    MVMota.MonsterBook.Scene_MonsterBook=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.MonsterBook.Scene_MonsterBook.prototype=Object.create(Scene_MenuBase.prototype);
    MVMota.MonsterBook.Scene_MonsterBook.prototype.constructor=MVMota.MonsterBook.Scene_MonsterBook;
    MVMota.MonsterBook.Scene_MonsterBook.prototype.initialize=function(){
        Scene_MenuBase.prototype.initialize.call(this);
        
    }
    MVMota.MonsterBook.Scene_MonsterBook.prototype.create=function(){
        Scene_MenuBase.prototype.create.call(this);
        //复制得到当前所有怪物
        MVMota.MonsterBook.monsterList=MVMota.MonsterBook.monsterRegList.slice();
        //整理数组，去除重复项
        for(var i=1;i<MVMota.MonsterBook.monsterList.length;i++)
        {
            for(var j=i+1;j<MVMota.MonsterBook.monsterList.length;j++)
            {
                if(MVMota.MonsterBook.monsterList[j]==MVMota.MonsterBook.monsterList[i])
                {
                    MVMota.MonsterBook.monsterList.splice(j,1);
                }
            }            
        }
        //排序，从小到大
        MVMota.MonsterBook.monsterList.sort(function (value1, value2) {
                                                    if (value1 < value2) 
                                                    {
                                                        return -1;
                                                    } else if (value1 > value2) 
                                                    {
                                                        return 1;
                                                    } else 
                                                    {
                                                        return 0;
                                                    }
                                                });
        
        
        //加入窗口
        MVMota.MonsterBook.wl=new MVMota.MonsterBook.Window_List();
        MVMota.MonsterBook.wi=new MVMota.MonsterBook.Window_Information();
        for(var i=1;i<MVMota.MonsterBook.monsterList.length;i++)
        {
            MVMota.MonsterBook.wl.setHandler(""+i,this.commandItem.bind(this));
        }
        this.addChild(MVMota.MonsterBook.wl);
        this.addChild(MVMota.MonsterBook.wi);
        MVMota.MonsterBook.sc=this;
    }
    //绑定命令的处理
    MVMota.MonsterBook.Scene_MonsterBook.prototype.commandItem=function(){
        MVMota.MonsterBook.wl.activate();
        MVMota.MonsterBook.wi.refresh();
        
        var id=parseInt(MVMota.MonsterBook.wl.currentSymbol());
        var i=0;
        MVMota.MonsterBook.wi.contents.clear();
        for (var p in $dataMVMotaMonsters[id])
        {
            console.log($dataMVMotaMonsters[id][p]);
            MVMota.MonsterBook.wi.drawText(""+p+"："+$dataMVMotaMonsters[id][p],MVMota.MonsterBook.wi.windowPosition().x,MVMota.MonsterBook.wi.windowPosition().y+23*i,500,20,"left");
            i++;
        }
        
        MVMota.MonsterBook.wl.refresh();
        //MVMota.MonsterBook.wi.refresh();
            
        
    }
    MVMota.MonsterBook.Scene_MonsterBook.prototype.update=function(){
        Scene_MenuBase.prototype.update.call(this);
        if (Input.isTriggered('escape') || Input.isTriggered('cancel')) {
            MVMota.MonsterBook.wl.hide();
            MVMota.MonsterBook.wi.hide();
            SceneManager.goto(Scene_Map);
        }
    }
    
    
    MVMota.MagicKey={};
    MVMota.MagicKey.YellowDoorList=[null];