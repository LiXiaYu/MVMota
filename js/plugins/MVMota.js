//=============================================================================
// MVMota.js
//=============================================================================
//"use strict";//严格模式，node.js的es6？？？

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
                for(var i=1;i<MVMota.AtcTypes.length;i++){
                    if(MVMota.AtcTypes[i].id==role.atcType){
                        for(var j=1;j<MVMota.DefTypes.length;j++){
                            effect.push(1.0);
                        }
                        for(var j=1;j<MVMota.AtcTypes[i].effects.length;j++){
                            effect[MVMota.AtcTypes[i].effects[j].id]=MVMota.AtcTypes[i].effects[j].effect;
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
                for(var i=1;i<MVMota.DefTypes.length;i++){
                    if(MVMota.DefTypes[i].id==role.defType){
                        for(var j=1;j<MVMota.AtcTypes.length;j++){
                            effect.push(1.0);
                        }
                        for(var j=1;j<MVMota.DefTypes[i].effects.length;j++){
                            effect[MVMota.DefTypes[i].effects[j].id]=MVMota.DefTypes[i].effects[j].effect;
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
            
            hero.fight=function (monster,ifMonsterAtcFirst) {
                if(ifMonsterAtcFirst)
                {
                    if(monster.AttackValue(hero)>hero.DefendValue(monster)){
                        hero.hp-=(monster.AttackValue(hero)-hero.DefendValue(monster));
                    }
                    if(hero.hp<=0)
                    {
                        return -1;
                    }
                }
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
            
            monster.id=MVMota.Monsters[id].id;
            monster.name=MVMota.Monsters[id].name;
            monster.hp=MVMota.Monsters[id].hp;
            monster.atc=MVMota.Monsters[id].atc;
            monster.def=MVMota.Monsters[id].def;
            monster.money=MVMota.Monsters[id].money;
            monster.atcType=MVMota.Monsters[id].atcType;
            monster.defType=MVMota.Monsters[id].defType;
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
          item.hiden=false;
          item.canUseByPlayer=true;

          return item;
      },
      
      CreatItemList:function(){
          var itemlist=[];
          var items=MVMota.Items;
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

              item.hiden=items[i].hiden;
              item.canUseByPlayer=items[i].canUseByPlayer;

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

////    //设置窗口大小  启发自 YEP
    SceneManager._screenWidth  = 864;
    //SceneManager._screenHeight = 624;
    SceneManager._boxWidth     = 864;
    //SceneManager._boxHeight    = 624;
    MVMota.SceneManager_run = SceneManager.run;
    SceneManager.run = function(sceneClass) {
        MVMota.SceneManager_run.call(this, sceneClass);
        if (Utils.isMobileDevice()) return;
        if (Utils.isMobileSafari()) return;
        if (Utils.isAndroidChrome()) return;
            var resizeWidth = Graphics.boxWidth - window.innerWidth;
            var resizeHeight = Graphics.boxHeight - window.innerHeight;
            window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
            window.resizeBy(resizeWidth, resizeHeight);
    };
////    

////    //HUD界面   启发自 夏末渐离
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function ()
    {
        _Scene_Map_createAllWindows.call(this);
         this.addChild(new MVMota.Window_HUD());
    };

    MVMota.Window_HUD=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.Window_HUD.prototype = Object.create(Window_Base.prototype);
    MVMota.Window_HUD.prototype.constructor = MVMota.Window_HUD;
    //初始化
    MVMota.Window_HUD.prototype.initialize = function (){
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x=this.windowPosition().x;
        var y=this.windowPosition().y;
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.opacity = this.windowOpacity();

        if(MVMota.mainHero==null)
        {
            return;
        }
        this.drawALLText();
        
        this.lastfloor=null;
        this.lasthp = null;
        this.lastatc = null;
        this.lastdef = null;
        this.lastmoney = null;
        this.lastyellowkey = null;
        this.lastbluekey = null;
        this.lastredkey = null;


    };
    //窗口位置
    MVMota.Window_HUD.prototype.windowPosition = function (){
        return {x:20,y:20};
    };
    //窗口宽
    MVMota.Window_HUD.prototype.windowWidth = function (){
        return 250;
    };
    //窗口高
    MVMota.Window_HUD.prototype.windowHeight = function (){
        return 500;
    };
    //窗口不透明度
    MVMota.Window_HUD.prototype.windowOpacity = function (){
        return 50;
    };
    MVMota.Window_HUD.prototype.drawALLText= function(){
        this.contents.clear();
        this.contents.fontSize = 24;
        var Px=200;
        var Py=50;
        var i=1;
        this.drawDataText(MVMota.mainHero.floor,"Floor",Px, Py/10);
        this.drawDataText(MVMota.mainHero.hp,"hp",Px,Py*(i++));
        this.drawDataText(MVMota.mainHero.atc,"atc",Px,Py*(i++));
        this.drawDataText(MVMota.mainHero.def,"def",Px,Py*(i++));
        this.drawDataText(MVMota.mainHero.money,"money",Px,Py*(i++));
        this.drawDataText(MVMota.mainHero.items[1].amount,MVMota.mainHero.items[1].name,Px,Py*(i++));
        this.drawDataText(MVMota.mainHero.items[2].amount,MVMota.mainHero.items[2].name,Px,Py*(i++));
        this.drawDataText(MVMota.mainHero.items[3].amount,MVMota.mainHero.items[3].name,Px,Py*(i++));
        //this.drawLevel(this.actor, levelPosition.x, levelPosition.y, addwidth);
    };
    //绘制数据文字
    MVMota.Window_HUD.prototype.drawDataText=function(current,item,x,y){
        var valueWidth=60;
        var x1 = x - valueWidth;
        var x2 = x1 - valueWidth/2;
        var x3 = x2 - valueWidth;
        this.drawText(item+":"+current, x3, y, valueWidth, 'right');
    };

    //刷新floor
    MVMota.Window_HUD.prototype.refresh_floor = function (){
            this.drawALLText();
            this.lastfloor = MVMota.mainHero.floor;
    };
    //刷新hp
    MVMota.Window_HUD.prototype.refresh_hp = function (){
            this.drawALLText();
            this.lasthp = MVMota.mainHero.hp;
    };
    //刷新atc
    MVMota.Window_HUD.prototype.refresh_atc = function (){
            this.drawALLText();
            this.lastatc = MVMota.mainHero.atc;
    };
    //刷新def
    MVMota.Window_HUD.prototype.refresh_def = function (){
            this.drawALLText();
            this.lastdef = MVMota.mainHero.def;
    };
    //刷新money
    MVMota.Window_HUD.prototype.refresh_money = function (){
            this.drawALLText();
            this.lastmoney = MVMota.mainHero.money;
    };
    //刷新yellowkey
    MVMota.Window_HUD.prototype.refresh_yellowkey = function (){
            this.drawALLText();
            this.lastyellowkey = MVMota.mainHero.key[0];
    };
    //刷新bluekey
    MVMota.Window_HUD.prototype.refresh_bluekey = function (){
            this.drawALLText();
            this.lastbluekey = MVMota.mainHero.key[1];
    };
    //刷新redkey
    MVMota.Window_HUD.prototype.refresh_redkey = function (){
            this.drawALLText();
            this.lastredkey = MVMota.mainHero.key[2];
    };

    MVMota.Window_HUD.prototype.update = function (){
        if(MVMota.mainHero==null)
        {
            return;
        }

        if(MVMota.mainHero.floor!=this.lastfloor)
            this.refresh_floor();
        if(MVMota.mainHero.hp!=this.lasthp)
            this.refresh_hp();
        if(MVMota.mainHero.atc!=this.lastatc)
            this.refresh_atc();
        if(MVMota.mainHero.def!=this.lastdef)
            this.refresh_def();
        if(MVMota.mainHero.money!=this.lastmoney)
            this.refresh_money();
        if(MVMota.mainHero.yellowkey!=this.lastyellowkey)
            this.refresh_yellowkey();
        if(MVMota.mainHero.bluekey!=this.lastbluekey)
            this.refresh_bluekey();
        if(MVMota.mainHero.redkey!=this.lastredkey)
            this.refresh_redkey();
            
        //绑定对地图的修改？？在这里，可能不大合适，但仍然在作为一个watcher??    
        for(var i=1;i<MVMota.changedMaps.length;i++)
        {
            if(MVMota.mainHero.floor==MVMota.changedMaps[i].floor)
            {
                for(var j=0;j<MVMota.changedMaps[i].mapData.length;j++)
                {
                    window['$dataMap'].data[j]=MVMota.changedMaps[i].mapData[j];
                }
                
            }
        }
    };
////    //楼层表，地图id与楼层floor相对应
    MVMota.MotaFloorList={};
    MVMota.MotaFloorList.list=[null,{mapId:10,floor:1},{mapId:7,floor:2},{mapid:8,floor:3}];
    MVMota.MotaFloorList.findIdByFloor=function(floor){
        for(var i=1;i<MVMota.MotaFloorList.list.length;i++)
        {
            if(MVMota.MotaFloorList.list[i].floor===floor)
            {
                return MVMota.MotaFloorList.list[i].id;
            }
        }

        return null;
    };
    MVMota.MotaFloorList.findFloorById=function(id){
        for(var i=1;i<MVMota.MotaFloorList.list.length;i++)
        {
            if(MVMota.MotaFloorList.list[i].mapId===id)
            {
                return MVMota.MotaFloorList.list[i].floor;
            }
        }

        return null;
    };

////    //对话记事本，对话记录
    MVMota.NotePad={};
    MVMota.NotePad.List=[null,{id:1,speaker:"ZhuangBi Older",contents:"Welcome to the world of Mota",hiden:false}];
    MVMota.NotePad.Show=function(id){
        for(var i=1;i<MVMota.NotePad.List.length;i++)
        {
            if(MVMota.NotePad.List[i].id===id)
            {
                MVMota.NotePad.List[i].hiden=false;
            }
        }
    }
    MVMota.NotePad.Hide=function(id){
        for(var i=1;i<MVMota.NotePad.List.length;i++)
        {
            if(MVMota.NotePad.List[i].id===id)
            {
                MVMota.NotePad.List[i].hiden=true;
            }
        }
    }

    MVMota.NotePad.sc=null;
    MVMota.NotePad.wl=null;
    MVMota.NotePad.wi=null;

    //左边，列表窗口
    MVMota.NotePad.Window_List=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.NotePad.Window_List.prototype = Object.create(Window_Command.prototype);
    MVMota.NotePad.Window_List.prototype.constructor = MVMota.NotePad.Window_List;
    //初始化
    MVMota.NotePad.Window_List.prototype.initialize = function (){
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x=this.windowPosition().x;
        var y=this.windowPosition().y;
        Window_Command.prototype.initialize.call(this, x, y, width, height);
        this.opacity = this.windowOpacity();


    };
    //窗口位置
    MVMota.NotePad.Window_List.prototype.windowPosition = function (){
        return {x:20,y:20};
    };
    //窗口宽
    MVMota.NotePad.Window_List.prototype.windowWidth = function (){
        return 200;
    };
    //窗口高
    MVMota.NotePad.Window_List.prototype.windowHeight = function (){
        return 500;
    };
    //窗口不透明度
    MVMota.NotePad.Window_List.prototype.windowOpacity = function (){
        return 50;
    };

    MVMota.NotePad.Window_List.prototype.makeCommandList=function(){
        var j=0;
        for(var i=1;i<MVMota.NotePad.List.length;i++)
        {
            if(MVMota.NotePad.List[i].hiden==false)
            {
                j++;
                var id=MVMota.NotePad.List[i].id;
                this.addCommand("第"+j+"条",""+id,true);
            }
        }
    }

    //右边，信息窗口
    MVMota.NotePad.Window_Information=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.NotePad.Window_Information.prototype = Object.create(Window_Selectable.prototype);
    MVMota.NotePad.Window_Information.prototype.constructor = MVMota.NotePad.Window_Information;
    //初始化
    MVMota.NotePad.Window_Information.prototype.initialize = function (){
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x=this.windowPosition().x;
        var y=this.windowPosition().y;
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.opacity = this.windowOpacity();
    };
    //窗口位置
    MVMota.NotePad.Window_Information.prototype.windowPosition = function (){
        return {x:220,y:20};
    };
    //窗口宽
    MVMota.NotePad.Window_Information.prototype.windowWidth = function (){
        return 500;
    };
    //窗口高
    MVMota.NotePad.Window_Information.prototype.windowHeight = function (){
        return 500;
    };
    //窗口不透明度
    MVMota.NotePad.Window_Information.prototype.windowOpacity = function (){
        return 50;
    };

    //场景
    MVMota.NotePad.Scene_NotePad=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.NotePad.Scene_NotePad.prototype=Object.create(Scene_MenuBase.prototype);
    MVMota.NotePad.Scene_NotePad.prototype.constructor=MVMota.NotePad.Scene_NotePad;
    MVMota.NotePad.Scene_NotePad.prototype.initialize=function(){
        Scene_MenuBase.prototype.initialize.call(this);
        
    }
    MVMota.NotePad.Scene_NotePad.prototype.create=function(){
        Scene_MenuBase.prototype.create.call(this);

        //加入窗口
        MVMota.NotePad.wl=new MVMota.NotePad.Window_List();
        MVMota.NotePad.wi=new MVMota.NotePad.Window_Information();
        for(var i=1;i<MVMota.NotePad.List.length;i++)
        {
            MVMota.NotePad.wl.setHandler(""+i,this.commandItem.bind(this));
        }
        this.addChild(MVMota.NotePad.wl);
        this.addChild(MVMota.NotePad.wi);
        MVMota.NotePad.sc=this;
    }
    //绑定命令的处理
    MVMota.NotePad.Scene_NotePad.prototype.commandItem=function(){
        MVMota.NotePad.wl.activate();
        MVMota.NotePad.wi.refresh();
        
        var id=parseInt(MVMota.NotePad.wl.currentSymbol());

        MVMota.NotePad.wi.contents.clear();
        MVMota.NotePad.wi.drawText(""+MVMota.NotePad.List[id].speaker+"：",15,18,MVMota.NotePad.Window_Information.prototype.windowWidth()-20,20,"left");
        MVMota.NotePad.wi.drawText("    "+MVMota.NotePad.List[id].contents+"：",15,40,MVMota.NotePad.Window_Information.prototype.windowWidth()-20,20,"left");
        
        MVMota.NotePad.wl.refresh();
        //MVMota.NotePad.wi.refresh();
            
        
    }
    MVMota.NotePad.Scene_NotePad.prototype.update=function(){
        Scene_MenuBase.prototype.update.call(this);
        if (Input.isTriggered('escape') || Input.isTriggered('cancel')) {
            MVMota.NotePad.wl.hide();
            MVMota.NotePad.wi.hide();
            SceneManager.goto(Scene_Map);
        }
    }

////    //对地图的改变，记录在此。。。
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
            this.addCommand(items[i].name+"："+items[i].amount,""+i,items[i].canUseByPlayer);
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
            this.addCommand(""+MVMota.Monsters[id].name,""+i,true);
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
        for (var p in MVMota.Monsters[id])
        {
            console.log(MVMota.Monsters[id][p]);
            MVMota.MonsterBook.wi.drawText(""+p+"："+MVMota.Monsters[id][p],MVMota.MonsterBook.wi.windowPosition().x,MVMota.MonsterBook.wi.windowPosition().y+23*i,500,20,"left");
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
    
////    //魔法钥匙-黄门列表
    MVMota.MagicKey={};
    MVMota.MagicKey.YellowDoorList=[null];
////    //炸弹    
    MVMota.Bomb={};
    MVMota.Bomb.DestoriabeList=[null];
////    //飞行魔杖
    MVMota.FlyingWand={};
    MVMota.FlyingWand.ArrivedFloorList=[null];
    MVMota.FlyingWand.LandingList=[null];
    MVMota.FlyingWand.Coming=function(floor){
        for(var i=1;i<MVMota.FlyingWand.ArrivedFloorList.length;i++)
        {
            if(MVMota.FlyingWand.ArrivedFloorList[i]===floor)
            {
                return;
            }
            else if(MVMota.FlyingWand.ArrivedFloorList[i]>floor)
            {
                MVMota.FlyingWand.ArrivedFloorList.splice(i,0,floor);
                return;
            }
        }
        MVMota.FlyingWand.ArrivedFloorList.push(floor);
    }
    MVMota.FlyingWand.Flyto=function(floor){
        if(floor==null)
        {
            return;
        }
        else
        {
            if(MVMota.mainHero.floor!=floor)
            {
                var id;
                var x;
                var y;
                for(var i=1;i<MVMota.FlyingWand.LandingList.length;i++)
                {
                    if(floor===MVMota.FlyingWand.LandingList[i].floor)
                    {
                        id=MVMota.FlyingWand.LandingList[i].id;
                        if(MVMota.mainHero.floor>floor)
                        {
                            x=MVMota.FlyingWand.LandingList[i].up.x;
                            y=MVMota.FlyingWand.LandingList[i].up.y;
                        }
                        else
                        {
                            x=MVMota.FlyingWand.LandingList[i].down.x;
                            y=MVMota.FlyingWand.LandingList[i].down.y;
                        }
                        break;
                    }
                }

                $gamePlayer.reserveTransfer(id, x, y);
                //飞行后的善后处理
                MVMota.mainHero.floor=floor;
                MVMota.MagicKey.YellowDoorList=[null];
                MVMota.Bomb.DestoriabeList=[null];
            } 
            else
            {
                return;
            }
        }
    }
    //飞行魔杖窗口
    MVMota.FlyingWand.sc=null;
    MVMota.FlyingWand.mw=null;
    MVMota.FlyingWand.targetFloor=null;
    
    MVMota.FlyingWand.Window_Item=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.FlyingWand.Window_Item.prototype = Object.create(Window_Command.prototype);
    MVMota.FlyingWand.Window_Item.prototype.constructor = MVMota.FlyingWand.Window_Item;
    //初始化
    MVMota.FlyingWand.Window_Item.prototype.initialize = function (){
        var width = this.windowWidth();
        var height = this.windowHeight();
        var x=this.windowPosition().x;
        var y=this.windowPosition().y;
        Window_Command.prototype.initialize.call(this, x, y, width, height);
        this.opacity = this.windowOpacity();


    };
    //窗口位置
    MVMota.FlyingWand.Window_Item.prototype.windowPosition = function (){
        return {x:20,y:20};
    };
    //窗口宽
    MVMota.FlyingWand.Window_Item.prototype.windowWidth = function (){
        return 500;
    };
    //窗口高
    MVMota.FlyingWand.Window_Item.prototype.windowHeight = function (){
        return 500;
    };
    //窗口不透明度
    MVMota.FlyingWand.Window_Item.prototype.windowOpacity = function (){
        return 50;
    };
    /*//更新方法，每次刷新窗口都要执行
    MVMota.FlyingWand.Window_Item.prototype.update = function (){
        this.contents.clear();
        this.addCommand("item","item",true);
    };*/
    
    MVMota.FlyingWand.Window_Item.prototype.makeCommandList=function(){
        var floors=MVMota.FlyingWand.ArrivedFloorList;
        for(var i=1;i<floors.length;i++)
        {
            //this.addCommand("item","item",true);
            this.addCommand("第"+floors[i]+"层",""+i,true);
        }
    }
    
    MVMota.FlyingWand.Scene_Item=function(){
        this.initialize.apply(this, arguments);
    }
    MVMota.FlyingWand.Scene_Item.prototype=Object.create(Scene_MenuBase.prototype);
    MVMota.FlyingWand.Scene_Item.prototype.constructor=MVMota.FlyingWand.Scene_Item;
    MVMota.FlyingWand.Scene_Item.prototype.initialize=function(){
        Scene_MenuBase.prototype.initialize.call(this);
        
    }
    MVMota.FlyingWand.Scene_Item.prototype.create=function(){
        Scene_MenuBase.prototype.create.call(this);
        
        MVMota.FlyingWand.mw=new MVMota.FlyingWand.Window_Item();
        for(var i=1;i<MVMota.FlyingWand.ArrivedFloorList.length;i++)
        {
            //MVMota.FlyingWand.mw.setHandler("item",this.commandItem.bind(this));
            MVMota.FlyingWand.mw.setHandler(""+i,this.commandItem.bind(this));
        }
        this.addChild(MVMota.FlyingWand.mw);
        MVMota.FlyingWand.sc=this;
    }
    MVMota.FlyingWand.Scene_Item.prototype.commandItem=function(){
        MVMota.FlyingWand.mw.activate();
        MVMota.FlyingWand.mw.refresh();
        
        var i=parseInt(MVMota.FlyingWand.mw.currentSymbol());
        MVMota.FlyingWand.targetFloor=i;
        MVMota.FlyingWand.mw.refresh();
            
        
    }
    MVMota.FlyingWand.Scene_Item.prototype.update=function(){
        Scene_MenuBase.prototype.update.call(this);
        if (Input.isTriggered('escape') || Input.isTriggered('cancel')) {
            MVMota.FlyingWand.mw.hide();
            SceneManager.goto(Scene_Map);

            MVMota.FlyingWand.Flyto(MVMota.FlyingWand.targetFloor);
            MVMota.FlyingWand.targetFloor=null;
            
        }
    }
