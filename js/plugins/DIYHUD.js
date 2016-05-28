
/**
 * Created by 夏末渐离 on 2015/11/30.
 * 注意：脚本文件名为：DIYHUD.js
 */
//DIY部分
/*:
 * @plugindesc  DIY a HUD Window belong to you.
 * @author XMJL
 *
 *
 * @param  -------------FaceSprite
 * @desc   undefine
 * @default Part---------------
 *
 *
 * @param  FirstFaceBitmapName
 * @desc Please input HUDFaceBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  SecondFaceBitmapName
 * @desc Please input HUDFaceBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  ThirdFaceBitmapName
 * @desc Please input HUDFaceBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  FourFaceBitmapName
 * @desc Please input HUDFaceBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  FaceSpriteXY
 * @desc    Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default   20,20
 *
 * @param  ---------------HPSprite
 * @desc   undefine
 * @default Part---------------
 *
 * @param  hpboxBitmapName
 * @desc Please input HPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  hpboxSpriteXY
 * @desc    Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default   130,50
 *
 * @param  hpbarBitmapName
 * @desc Please input HPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  hpbarSpriteXY
 * @desc    Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default   140,60
 *
 * @param  checkHPpixel
 * @desc    Pixel.Position.left,Piexl.Position.y (The Pixel at Bitmap left corner and right corner.)
 * @default   0,180
 *
 * * @param  ---------------MPSprite
 * @desc   undefine
 * @default Part---------------
 *
 * @param  mpboxBitmapName
 * @desc Please input MPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  mpboxSpriteXY
 * @desc    Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default   130,100
 *
 * @param  mpbarBitmapName
 * @desc Please input MPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  mpbarSpriteXY
 * @desc    Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default   140,110
 *
 * @param  checkMPpixel
 * @desc    Pixel.Position.left,Piexl.Position.y (The Pixel at Bitmap left corner and right corner.)
 * @default   0,180
 *
 * @param  --------------EXPSprite
 * @desc   undefine
 * @default Part---------------
 *
 * @param  expboxBitmapName
 * @desc Please input EXPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  expboxSpriteXY
 * @desc    Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default   130,150
 *
 * @param  expbarBitmapName
 * @desc Please input EXPBitmap filename  at img/Pictures/.
 * @default
 *
 * @param  expbarSpriteXY
 * @desc    Point.Position.x,Point.Position.y (The Point at Bitmap upper left corner.)
 * @default   140,160
 *
 * @param  checkEXPpixel
 * @desc    Pixel.Position.left,Piexl.Position.y (The Pixel at Bitmap left corner and right corner.)
 * @default   0,180
 *
 * @param  ---------------Window
 * @desc   undefine
 * @default Part---------------
 *
 * @param  WindowWidth
 * @desc This HUDWindow Width
 * @default   300
 *
 * @param  WindowHeight
 * @desc This HUDWindow Height
 * @default   600
 *
 * @param  WindowOpacity
 * @desc This HUDWindow Opacity between 0-255
 * @default   255
 *
 * @param  WindowXY
 * @desc This HUDWindow Position xy
 * @default   0,0
 *
 * @param  -----------WindowText
 * @desc   undefine
 * @default Part---------------
 *
 * @param  FontWidth
 * @desc    this Window Text Size;
 * @default   24
 *
 * @param  ValueWidth
 * @desc the number frame width and "/" frame width  equal ValueWidth/2;
 * @default  60
 *
 * @param  FloorTextXY
 * @desc    FloorText.Position.x,FloorText.Position.y
 * @default   200,5
 * 
 * @param  HPTextXY
 * @desc    HPText.Position.x,HPText.Position.y
 * @default   200,50
 *
 * @param  AtcTextXY
 * @desc    AtcText.Position.x,AtcText.Position.y
 * @default   200,100
 * 
 * @param  DefTextXY
 * @desc    DefText.Position.x,DefText.Position.y
 * @default   200,150
 * 
 * @param  MoneyTextXY
 * @desc    MoneyText.Position.x,MoneyText.Position.y
 * @default   200,200
 * 
 * @param  YellowKeyTextXY
 * @desc    YellowKeyText.Position.x,YellowKeyText.Position.y
 * @default   200,250
 * 
 * @param  BlueKeyTextXY
 * @desc    BlueKeyText.Position.x,BlueKeyText.Position.y
 * @default   200,300
 * 
 * @param  RedKeyTextXY
 * @desc    RedKeyText.Position.x,RedKeyText.Position.y
 * @default   200,350
 * 
 * @param  MPTextXY
 * @desc    MPText.Position.x,MPText.Position.y
 * @default   200,400
 * 
 *
 * @param  EXPTextXY
 * @desc    EXPText.Position.x,EXPText.Position.y
 * @default   200,450
 *
 * @param  NameTextXY
 * @desc    NameText.Position.x,NameText.Position.y
 * @default   200,120
 *
 * @param  levelTextXY
 * @desc   levelText.Position.x,levelText.Position.y
 * @default   120,5
 *
 * @param levelNumberWidth
 * @desc  the levelNumber position (x+levelNumberWidth)
 * @default 30
 */

(function ()
{
    // set parameters
    //脸图部分
    //第一位主角
    var parameters = PluginManager.parameters('DIYHUD');
    //读取脸图
    var FirstFaceBitmap = parameters['FirstFaceBitmapName'];
    var SecondFaceBitmap = parameters['SecondFaceBitmapName'];
    var ThirdFaceBitmap=parameters['ThirdFaceBitmapName'];
    var FourFaceBitmap=parameters['FourFaceBitmapName'];
    //脸图位置
    var FacePosition = FaceSpriteXY();
    function FaceSpriteXY()
    {
        //正则表达式匹配字符串
        var resFace = /(\d+),*(\d+)/.exec(parameters['FaceSpriteXY']);
        return {x: Number(resFace[1]), y: Number(resFace[2])};
    }
    //HP精灵
    //血槽
    var hpboxBitmap = parameters['hpboxBitmapName'];
    var hpboxPosition = hpboxSpriteXY();
    function hpboxSpriteXY()
    {
        //正则表达式匹配字符串
        var reshpbox = /(\d+),*(\d+)/.exec(parameters['hpboxSpriteXY']);
        return {x: Number(reshpbox[1]), y: Number(reshpbox[2])};
    }
    //血条
    var hpbarBitmap = parameters['hpbarBitmapName'];
    var hpbarPosition = hpbarSpriteXY();
    function hpbarSpriteXY()
    {
        //正则表达式匹配字符串
        var reshpbar = /(\d+),*(\d+)/.exec(parameters['hpbarSpriteXY']);
        return {x: Number(reshpbar[1]), y: Number(reshpbar[2])};
    }
    //校准血条
    var hpcheck = checkHPpixel();
    function checkHPpixel()
    {
        //正则表达式匹配字符串
        var resHPpixel = /(\d+),*(\d+)/.exec(parameters['checkHPpixel']);
        return {left: Number(resHPpixel[1]), right: Number(resHPpixel[2])};
    }
    //MP精灵
    //蓝槽
    var mpboxBitmap = parameters['mpboxBitmapName'];
    var mpboxPosition = mpboxSpriteXY();
    function mpboxSpriteXY()
    {
        //正则表达式匹配字符串
        var resmpbox = /(\d+),*(\d+)/.exec(parameters['mpboxSpriteXY']);
        return {x: Number(resmpbox[1]), y: Number(resmpbox[2])};
    }
    //蓝条
    var mpbarBitmap = parameters['mpbarBitmapName'];
    var mpbarPosition = mpbarSpriteXY();
    function mpbarSpriteXY()
    {
        //正则表达式匹配字符串
        var resmpbar = /(\d+),*(\d+)/.exec(parameters['mpbarSpriteXY']);
        return {x: Number(resmpbar[1]), y: Number(resmpbar[2])};
    }
    //校准蓝条
    var mpcheck = checkMPpixel();
    function checkMPpixel()
    {
        //正则表达式匹配字符串
        var resMPpixel = /(\d+),*(\d+)/.exec(parameters['checkMPpixel']);
        return {left: Number(resMPpixel[1]), right: Number(resMPpixel[2])};
    }
    //EXP精灵
    //经验槽
    var expboxBitmap = parameters['expboxBitmapName'];
    var expboxPosition = expboxSpriteXY();
    function expboxSpriteXY()
    {
        //正则表达式匹配字符串
        var resexpbox = /(\d+),*(\d+)/.exec(parameters['expboxSpriteXY']);
        return {x: Number(resexpbox[1]), y: Number(resexpbox[2])};
    }
    //经验条
    var expbarBitmap = parameters['expbarBitmapName'];
    var expbarPosition = expbarSpriteXY();
    function expbarSpriteXY()
    {
        //正则表达式匹配字符串
        var resexpbar = /(\d+),*(\d+)/.exec(parameters['expbarSpriteXY']);
        return {x: Number(resexpbar[1]), y: Number(resexpbar[2])};
    }
    //校准经验条
    var expcheck = checkEXPpixel();
    function checkEXPpixel()
    {
        //正则表达式匹配字符串
        var resEXPpixel = /(\d+),*(\d+)/.exec(parameters['checkEXPpixel']);
        return {left: Number(resEXPpixel[1]), right: Number(resEXPpixel[2])};
    }


    //窗口部分
    var WindowWidth = Number(parameters['WindowWidth'] || 300);
    var WindowHeight = Number(parameters['WindowHeigh'] || 600);
    var WindowOpacity = Number(parameters['WindowOpacity'] || 255);
    var WindowPosition = WindowXY();
    function WindowXY()
    {
        //正则表达式匹配字符串
        var reswindowxy = /(\d+),*(\d+)/.exec(parameters['WindowXY']);
        return {x: Number(reswindowxy[1]), y: Number(reswindowxy[2])};
    }


    //文字部分
    var valueWidth = Number(parameters['ValueWidth'] || 60);
    var textSize = Number(parameters['FontWidth'] || 24);
    //Floor相关
    var FloortextPosition = floortextXY();
    function floortextXY()
    {
        //正则表达式匹配字符串
        var resfloortext = /(\d+),*(\d+)/.exec(parameters['FloorTextXY']);
        return {x: Number(resfloortext[1]), y: Number(resfloortext[2])};
    }
    //HP相关
    var HPtextPosition = hptextXY();
    function hptextXY()
    {
        //正则表达式匹配字符串
        var reshptext = /(\d+),*(\d+)/.exec(parameters['HPTextXY']);
        return {x: Number(reshptext[1]), y: Number(reshptext[2])};
    }
    
    //atc相关
    var AtctextPosition = atctextXY();
    function atctextXY()
    {
        //正则表达式匹配字符串
        var resatctext = /(\d+),*(\d+)/.exec(parameters['AtcTextXY']);
        return {x: Number(resatctext[1]), y: Number(resatctext[2])};
    }
    //def相关
    var DeftextPosition = deftextXY();
    function deftextXY()
    {
        //正则表达式匹配字符串
        var resdeftext = /(\d+),*(\d+)/.exec(parameters['DefTextXY']);
        return {x: Number(resdeftext[1]), y: Number(resdeftext[2])};
    }
    //Money相关
    var MoneytextPosition = moneytextXY();
    function moneytextXY()
    {
        //正则表达式匹配字符串
        var resmoneytext = /(\d+),*(\d+)/.exec(parameters['MoneyTextXY']);
        return {x: Number(resmoneytext[1]), y: Number(resmoneytext[2])};
    }
    //YellowKey相关
    var YellowKeytextPosition = yellowkeytextXY();
    function yellowkeytextXY()
    {
        //正则表达式匹配字符串
        var resyellowkeytext = /(\d+),*(\d+)/.exec(parameters['YellowKeyTextXY']);
        return {x: Number(resyellowkeytext[1]), y: Number(resyellowkeytext[2])};
    }
    //BlueKey相关
    var BlueKeytextPosition = bluekeytextXY();
    function bluekeytextXY()
    {
        //正则表达式匹配字符串
        var resbluekeytext = /(\d+),*(\d+)/.exec(parameters['BlueKeyTextXY']);
        return {x: Number(resbluekeytext[1]), y: Number(resbluekeytext[2])};
    }
    //RedKey相关
    var RedKeytextPosition = redkeytextXY();
    function redkeytextXY()
    {
        //正则表达式匹配字符串
        var resredkeytext = /(\d+),*(\d+)/.exec(parameters['RedKeyTextXY']);
        return {x: Number(resredkeytext[1]), y: Number(resredkeytext[2])};
    }

   //MP相关
    var MPtextPosition = mptextXY();
    function mptextXY()
    {
        //正则表达式匹配字符串
        var resmptext = /(\d+),*(\d+)/.exec(parameters['MPTextXY']);
        return {x: Number(resmptext[1]), y: Number(resmptext[2])};
    }
    //EXP相关
    var EXPtextPosition = exptextXY();
    function exptextXY()
    {
        //正则表达式匹配字符串
        var resexptext = /(\d+),*(\d+)/.exec(parameters['EXPTextXY']);
        return {x: Number(resexptext[1]), y: Number(resexptext[2])};
    }
    //名字相关
    var NamePosition = NametextXY();
    function NametextXY()
    {
        //正则表达式匹配字符串
        var resnametext = /(\d+),*(\d+)/.exec(parameters['NameTextXY']);
        return {x: Number(resnametext[1]), y: Number(resnametext[2])};
    }

    //等级相关
    var addwidth = Number(parameters['levelNumberWidth'] || "10");
    var levelPosition = leveltextXY();
    function leveltextXY()
    {
        //正则表达式匹配字符串
        var resleveltext = /(\d+),*(\d+)/.exec(parameters['levelTextXY']);
        return {x: Number(resleveltext[1]), y: Number(resleveltext[2])};
    }
    var _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function ()
    {
        _Scene_Map_createAllWindows.call(this);
         this.addChild(new Window_HUD());
    };

    //-----------------------------------------------------------------------------
    // Window_HUD
    // HUD窗口
    function Window_HUD()
    {
        this.initialize.apply(this, arguments);
    }

    Window_HUD.prototype = Object.create(Window_Base.prototype);
    Window_HUD.prototype.constructor = Window_HUD;
    //初始化
    Window_HUD.prototype.initialize = function ()
    {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, WindowPosition.x, WindowPosition.y, width, height);
        this.opacity = WindowOpacity;
        this.actor = $gameParty.members()[0];
        
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
    //窗口宽
    Window_HUD.prototype.windowWidth = function ()
    {
        return WindowWidth;
    };
    //窗口高
    Window_HUD.prototype.windowHeight = function ()
    {
        return WindowHeight;
    };
   //绘制脸图精灵
  Window_HUD.prototype.DIYFace = function(BitmapName)
  {
      var FaceSp = new Sprite();
      FaceSp.bitmap = ImageManager.loadPicture(BitmapName);
      this.addChild(FaceSp);
      this.addChildToBack(FaceSp);
      FaceSp.move(FacePosition.x, FacePosition.y);
      this.MyFaceSp=FaceSp;
  }
    //选择脸图
   Window_HUD.prototype.drawDIYFace = function (Index)
   {
        switch(Index)
        {
           case 1:
           this.DIYFace(FirstFaceBitmap);
           break;
           case 2:
           this.DIYFace(SecondFaceBitmap);
           break;
           case 3:
           this.DIYFace(ThirdFaceBitmap);
           break;
           case 4:
           this.DIYFace(FourFaceBitmap);
           break;
        }
   };

    //绘制HP
    Window_HUD.prototype.drawDIYHP = function ()
    {
        //如果载入血槽图.png
        if (hpboxBitmap)
        {
            var hpBox = new Sprite();
            hpBox.bitmap = ImageManager.loadPicture(hpboxBitmap);
            this.addChild(hpBox);
            this.addChildToBack(hpBox);
            hpBox.move(hpboxPosition.x, hpboxPosition.y);
        }
        //如果载入血条图.png
        if (hpbarBitmap)
        {
            hpBar = new Sprite();
            hpBar.bitmap = ImageManager.loadPicture(hpbarBitmap);
            this.addChild(hpBar);
            hpBar.move(hpbarPosition.x, hpbarPosition.y);
            this.hpBar = hpBar;
        }
    };
    //绘制MP
    Window_HUD.prototype.drawDIYMP = function ()
    {

        //如果载入蓝槽图.png
        if (mpboxBitmap)
        {
            var mpBox = new Sprite();
            mpBox.bitmap = ImageManager.loadPicture(mpboxBitmap);
            this.addChild(mpBox);
            this.addChildToBack(mpBox);
            mpBox.move(mpboxPosition.x, mpboxPosition.y);
        }
        //如果载入蓝条图.png
        if (mpbarBitmap)
        {
            var mpBar = new Sprite();
            mpBar.bitmap = ImageManager.loadPicture(mpbarBitmap);
            this.addChild(mpBar);
            mpBar.move(mpbarPosition.x, mpbarPosition.y);
            this.mpBar = mpBar;
        }
    };

    //绘制EXP
    Window_HUD.prototype.drawDIYEXP = function ()
    {
        //如果载入EXP槽图.png
        if (expboxBitmap)
        {
            var expBox = new Sprite();
            expBox.bitmap = ImageManager.loadPicture(expboxBitmap);
            this.addChild(expBox);
            this.addChildToBack(expBox);
            expBox.move(expboxPosition.x, expboxPosition.y);
        }
        //如果载入EXP条图.png
        if (expbarBitmap)
        {
            var expBar = new Sprite();
            expBar.bitmap = ImageManager.loadPicture(expbarBitmap);
            this.addChild(expBar);
            expBar.move(expbarPosition.x, expbarPosition.y);
            this.expBar = expBar;
        }
    };

    //绘制文本信息
    Window_HUD.prototype.drawALLText= function()
    {
        this.contents.clear();
        this.contents.fontSize = textSize;
        this.drawDataText(MVMota.mainHero.floor,"Floor",FloortextPosition.x, FloortextPosition.y);
        this.drawDataText(MVMota.mainHero.hp,"hp",HPtextPosition.x,HPtextPosition.y);
        this.drawDataText(MVMota.mainHero.atc,"atc",AtctextPosition.x,AtctextPosition.y);
        this.drawDataText(MVMota.mainHero.def,"def",DeftextPosition.x,DeftextPosition.y);
        this.drawDataText(MVMota.mainHero.money,"money",MoneytextPosition.x,MoneytextPosition.y);
        this.drawDataText(MVMota.mainHero.items[1].amount,MVMota.mainHero.items[1].name,YellowKeytextPosition.x,YellowKeytextPosition.y);
        this.drawDataText(MVMota.mainHero.items[2].amount,MVMota.mainHero.items[2].name,BlueKeytextPosition.x,BlueKeytextPosition.y);
        this.drawDataText(MVMota.mainHero.items[3].amount,MVMota.mainHero.items[3].name,RedKeytextPosition.x,RedKeytextPosition.y);
        //this.drawLevel(this.actor, levelPosition.x, levelPosition.y, addwidth);
    };
    //绘制数据文字
    Window_HUD.prototype.drawDataText=function(current,item,x,y)
    {
        var x1 = x - valueWidth;
        var x2 = x1 - valueWidth/2;
        var x3 = x2 - valueWidth;
        this.drawText(item+":"+current, x3, y, valueWidth, 'right');
    };
    
    //绘制HP
    Window_HUD.prototype.drawHPText=function(current,max,x,y)
    {
        var x1 = x - valueWidth;
        var x2 = x1 - valueWidth/2;
        var x3 = x2 - valueWidth;
        this.drawText(current, x3, y, valueWidth, 'right');
        this.drawText('/', x2, y, valueWidth/2, 'right');
        this.drawText(max, x1, y, valueWidth, 'right');
    };
    Window_HUD.prototype.GetCurrentExp=function()
    {
        return this.actor.currentExp()-this.actor.expForLevel(this.actor.level);
    };
    Window_HUD.prototype.GetMaxExp=function()
    {
        return this.actor.nextLevelExp()-this.actor.expForLevel(this.actor.level);
    };
    //绘制等级
    Window_HUD.prototype.drawLevel = function (curactor, x, y, width)
    {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(curactor.level, x + width, y, 36, 'left');
    };
    //切换队员
    Window_HUD.prototype.SwitchActor = function ()
    {
        //设置键值
        if (Input.isTriggered('pageup'))
        {
            $gameParty._actors.push($gameParty._actors.shift());
            this.actor=$gameParty.members()[0];
            $gamePlayer.refresh();
            this.removeChild(this.MyFaceSp);
            this.drawDIYFace($gameParty._actors[0]);
            if(hpbarBitmap)this.refresh_HP();
            if(mpbarBitmap)this.refresh_MP();
            if(expbarBitmap)this.refresh_EXP();
            this.drawALLText();
         }
    };
    //刷新hp
    Window_HUD.prototype.refresh_floor = function ()
    {
            this.drawALLText();
            this.lastfloor = MVMota.mainHero.floor;
    };
    //刷新hp
    Window_HUD.prototype.refresh_hp = function ()
    {
            this.drawALLText();
            this.lasthp = MVMota.mainHero.hp;
    };
    //刷新atc
    Window_HUD.prototype.refresh_atc = function ()
    {
            this.drawALLText();
            this.lastatc = MVMota.mainHero.atc;
    };
    //刷新def
    Window_HUD.prototype.refresh_def = function ()
    {
            this.drawALLText();
            this.lastdef = MVMota.mainHero.def;
    };
    //刷新money
    Window_HUD.prototype.refresh_money = function ()
    {
            this.drawALLText();
            this.lastmoney = MVMota.mainHero.money;
    };
    //刷新yellowkey
    Window_HUD.prototype.refresh_yellowkey = function ()
    {
            this.drawALLText();
            this.lastyellowkey = MVMota.mainHero.key[0];
    };
    //刷新bluekey
    Window_HUD.prototype.refresh_bluekey = function ()
    {
            this.drawALLText();
            this.lastbluekey = MVMota.mainHero.key[1];
    };
    //刷新redkey
    Window_HUD.prototype.refresh_redkey = function ()
    {
            this.drawALLText();
            this.lastredkey = MVMota.mainHero.key[2];
    };
    //刷新MP
    Window_HUD.prototype.refresh_MP = function (index)
    {
        var left = mpcheck.left; //蓝条图像左端像素
        var right = mpcheck.right;//蓝条图像右端像素
        //判定当前队员序号再重绘蓝条
        var percent = this.actor.mp / this.actor.mmp;
        if(mpbarBitmap)
        {
            this.mpBar.width = percent * (right - left) + left;
            this.drawALLText();
            this.actor.lastmp = this.actor.mp;
        }

    };
    //刷新EXP
    Window_HUD.prototype.refresh_EXP = function (index)
    {
        var left = expcheck.left; //血条图像左端像素
        var right = expcheck.right;//血条图像右端像素
        //判定当前队员序号再重绘经验条
        var percent = this.GetCurrentExp(index)/ this.GetMaxExp(index);
        if(expbarBitmap)
        {
            this.expBar.width = percent * (right - left) + left;
            this.drawALLText();
            this.actor.lastexp = this.GetCurrentExp(index);
        }
    };
    //刷新等级
    Window_HUD.prototype.refresh_level = function (){
        //升级满状态回复
        this.actor.setHp(this.actor.mhp);
        this.actor.setMp(this.actor.mmp);
        //重绘血条
        this.refresh_HP();
        //重绘蓝条
        this.refresh_MP();
        this.actor.lastLevel=this.actor.level;
    };
    Window_HUD.prototype.update = function ()
    {
        if(MVMota.mainHero==null)
        {
            return;
        }
        this.SwitchActor();
        if(MVMota.mainHero.floor!=this.lasthp)
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
})();
