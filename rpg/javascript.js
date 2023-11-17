//14
var canvas, g;
var maptip;
var map;
var spReimu, spMarisa, spCirno, spKyoufu,spChirno2;
var spriteList;
var imgMarisa;
var mae = 0;
var level = 1;
var okane = 0;
var maxhp = 118;
var hp = 118;
var keikengoukei = 155;
var kaifukukei = "恐怖マンを倒してください！"
var saishoniageru = 15;
var atc = 47;
var def = 45;
var speed = 45;
var keikena = 155;
var keiken = 0;
var keikenmax = 6395269;
var keiken100 = 198155;
var keikenmai = 10000000000;
var keikenhyouji = "経験値." + keiken + "/" + keikena;
var leveldesu = "レベル." + level
const MapWidth = 32;
const MapHeight = 32;
const MapDrawWidth = 9;
const MapDrawHeight = 9;
const DrawSize = 64;
const AnimationNum = 16;
// シーンの定義
const Scenes = {
  Field: "Field",
  Battle: "Battle",
  Event: "Event",
};
var scrollX, scrollY;
var frameCount;
var currentKey;
var scene;
var currentEvent;
var currentBattle;
var currentEnemy;
var player;

onload = function () {
  // 描画コンテキストの取得
  canvas = document.getElementById("gamecanvas");
  g = canvas.getContext("2d");
  // 初期化
  init();
  // 入力処理の指定
  document.onkeydown = keydown;
  document.onkeyup = keyup;
  // ゲームループの設定 60FPS
  setInterval("gameloop()", 16);
};
setInterval(function(arg1, arg2) {
  leveldesu = "レベル." + level
  document.getElementById("level").innerText = leveldesu;
  document.getElementById("keiken").innerText = keikenhyouji;
  document.getElementById("hp").innerText = "体力."+ player.hp + "/" + player.maxhp;
  document.getElementById("atc").innerText = "攻撃."+ player.atc;
  document.getElementById("def").innerText = "防御."+ player.def;
  document.getElementById("okane").innerText = "お金."+ okane;
  keikenhyouji = "経験値." + keiken + "/" + keikena;
    if (keiken > keikena - 1) { 
      keiken = keiken - keikena;
      keikena = 40 * level + keikena;
      keikengoukei = 40 * level + keikengoukei;
      player.maxhp = level * 3 + player.maxhp 
      player.def = level * 2 + player.def
      player.atc = level * 2 + player.atc
      player.speed = level * 1 + player.speed
      level = level + 1;
      keikenhyouji = "経験値." + keiken + "/" + keikena;
      leveldesu = "レベル." + level
      console.log("Levelは" + level);
      console.log("経験値は" + keiken);
      console.log("経験値aは" + keikena);
      console.log("MaxHPは" + player.maxhp);
      console.log("MaxHPは" + player.hp);
      console.log("アタックは" + player.atc);
      console.log("防御は" + player.def);
      console.log("Speedは" + player.speed);
    }
}, 1);

function init() {
  // マップの定義 0草 1木 2水 3山
  map = [
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [3,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
    [3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  ];
  // マップチップの読込
  maptip = [];
  for (var i = 0; i < 4; i++) {
    maptip[i] = new Image();
    maptip[i].src = "./maptip" + i + ".png";
  }

  // スプライトの初期化
  spReimu = new Sprite();
  spMarisa = new Sprite();
  spKyoufu = new Sprite();
  spCirno = new Sprite();
  spCirno2 = new Sprite();
  spriteList = [];
  spriteList.push(spMarisa);
  spriteList.push(spKyoufu);
  spriteList.push(spCirno);
  spriteList.push(spCirno2);

  // 初期位置
  spReimu.posx = 12;
  spReimu.posy = 7;
  spMarisa.posx = 14;
  spMarisa.posy = 14;
  spKyoufu.posx = 16;
  spKyoufu.posy = 7;
  spCirno.posx = 10;
  spCirno.posy = 8;
  spCirno2.posx = 26;
  spCirno2.posy = 21;

  // キャラ画像読込
  for (var i = 0; i < 2; i++) {
    spReimu.image[i] = new Image();
    spMarisa.image[i] = new Image();
    spKyoufu.image[i] = new Image();
    spCirno.image[i] = new Image();
    spCirno2.image[i] = new Image();
    spReimu.image[i].src = "anime/stop0.png";
    spMarisa.image[i].src = "./nikottoa.png";
    spKyoufu.image[i].src = "./nikottoa.png";
    spCirno.image[i].src = "./cirno" + i + ".png";
    spCirno2.image[i].src = "./cirno" + i + ".png";
  }
  imgMarisa = new Image();
  imgMarisa.src = "./nikottoa.png";

  // その他
  scrollX = 0;
  scrollY = 0;
  frameCount = 0;
  currentKey = -1;
  scene = Scenes.Field;
  player = new BattleCharacter("ニコットマン",maxhp,atc,def,speed);
}

var keyReleased = true; // キー押しっぱなし防止用
function keydown(e) {
  currentKey = e.keyCode;
}
function keyup(e) {
  currentKey = -1;
  keyReleased = true;
}
function inputCheck() {
  if (scrollX != 0 || scrollY != 0) return;

  if (scene == Scenes.Event) {
    // イベントシーン Enterキーをチェック
    if (keyReleased && currentKey == 13) {
      keyReleased = false;
      if (currentEvent.type == 0) {
        // チルノ
        scene = Scenes.Field;
        player.hp = player.maxhp;
        okane = okane + saishoniageru
        saishoniageru = 0;
        kaifukukei = "回復します"
      }else if (currentEvent.type == 3) {
          // チルノ
          scene = Scenes.Field;
          player.hp = player.maxhp;
          okane = okane + saishoniageru
          saishoniageru = 0;
          kaifukukei = "回復します"
      } else if (currentEvent.type == 1) {
        // 魔理沙
        scene = Scenes.Battle;
        currentEnemy = new BattleCharacter("恐怖マンB", 35, 130, 17.5, 0, imgMarisa, this.shokin = 35,ageru = 15,this.keikenplus = 95)
        currentBattle = new Battle(player, currentEnemy);
      } else if (currentEvent.type == 2) {
        // 魔理沙
        scene = Scenes.Battle;
        currentEnemy = new BattleCharacter("恐怖マンA", 110, 35, 38, 15, imgMarisa, this.shokin = 30, ageru = 10, this.keikenplus = 45)
        currentBattle = new Battle(player, currentEnemy);
      }
  }
  } else if (scene == Scenes.Battle) {
    // 戦闘シーン Enterキーをチェック
    if (keyReleased && currentKey == 13) {
      keyReleased = false;
      if (currentBattle.status == 1) {
        // 敵を倒した
        scene = Scenes.Field;
      } else if (currentBattle.status == -1) {
        // 全滅した
        scene = Scenes.Field;
      } else {
        // 戦闘継続中
        currentBattle.nextAction();
      }
    }
  } else if (scene == Scenes.Field) {
    // フィールド 方向キーをチェック
    var x = spReimu.posx;
    var y = spReimu.posy;
    var animx = 0;
    var animy = 0;
    if (currentKey == 37) {
      // 左
      for (var i = 0; i < 2; i++) {
        mae = 2;
        spReimu.image[i] = new Image();
        spReimu.image[i].src = "anime/hidari" + i + ".png";
      }
      x = (spReimu.posx - 1 + MapWidth) % MapWidth;
      animx = -1;
    } else if (currentKey == 38) {
      // 上
      for (var i = 0; i < 2; i++) {
        mae = 1;
        spReimu.image[i] = new Image();
        spReimu.image[i].src = "anime/usiro" + i + ".png";
      }
      y = (spReimu.posy - 1 + MapHeight) % MapHeight;
      animy = -1;
    } else if (currentKey == 39) {
      //みぎ
      for (var i = 0; i < 2; i++) {
        mae = 3;
        spReimu.image[i] = new Image();
        spReimu.image[i].src = "anime/migi" + i + ".png";
      }
      x = (spReimu.posx + 1) % MapWidth;
      animx = 1;
    } else if (currentKey == 40) {
      // 下
      for (var i = 0; i < 2; i++) {
        mae = 0
        spReimu.image[i] = new Image();
        spReimu.image[i].src = "anime/mae" + i + ".png";
      }
      y = (spReimu.posy + 1) % MapHeight;
      animy = 1;
    }else {
      for (var i = 0; i < 2; i++) {
        spReimu.image[i] = new Image();
        spReimu.image[i].src = "anime/stop" + mae + ".png";
      }
    }

    var spriteHit = false;
    spriteList.forEach(function (sp) {
      if (sp.posx == x && sp.posy == y) {
        spriteHit = true;
        return;
      }
    });

    // 当たり判定
    if (spriteHit) {
      scene = Scenes.Event;
      dispatchEvent(x, y);
    } else if (map[y][x] == 0 || map[y][x] == 1) {
      // 移動可能なら移動
      spReimu.posx = x;
      spReimu.posy = y;
      scrollX = animx * DrawSize;
      scrollY = animy * DrawSize;
    }
  }
}

// 座標から発生させるイベントを決定する
function dispatchEvent(x, y) {
  if (x == 10 && y == 8) {
    currentEvent = new GameEvent(0, [kaifukukei]);
  } else if (x == 14 && y == 14) {
    currentEvent = new GameEvent(1, ["恐怖マンB「 勝負をしますか？」"]);
  } else if (x == 21 && y == 26) {
    currentEvent = new GameEvent(3, [kaifukukei]);
  } else if (x == 16 && y == 7) {
    currentEvent = new GameEvent(2, ["恐怖マンA「 勝負をしますか？」"]);
  } else {
    currentEvent = new GameEvent(0, "Error");
  }
}

function gameloop() {
  update();
  draw();
}

function update() {
  inputCheck();

  // マップスクロール量の更新
  if (scrollX > 0) scrollX -= DrawSize / AnimationNum;
  if (scrollX < 0) scrollX += DrawSize / AnimationNum;
  if (scrollY > 0) scrollY -= DrawSize / AnimationNum;
  if (scrollY < 0) scrollY += DrawSize / AnimationNum;

  frameCount++;
}

function draw() {
  // マップの描画
  var startX = Math.floor((canvas.width - MapDrawWidth * DrawSize) / 2);
  var startY = Math.floor((canvas.height - MapDrawHeight * DrawSize) / 2);
  for (var i = 0; i < MapDrawHeight; i++) {
    for (var j = 0; j < MapDrawWidth; j++) {
      // 始点の算出
      var x = (spReimu.posx - Math.floor(MapDrawWidth / 2) + j + MapWidth) % MapWidth;
      var y = (spReimu.posy - Math.floor(MapDrawHeight / 2) + i + MapHeight) % MapHeight;
      // マップチップの描画
      g.drawImage(
        maptip[map[y][x]],
        startX + j * DrawSize + scrollX,
        startY + i * DrawSize + scrollY,
        DrawSize,
        DrawSize
      );
    }
  }

  if (scene == Scenes.Field || scene == Scenes.Event) {
    // スプライトの描画
    spriteList.forEach(function (sp) {
      // 自キャラからの距離　ループを考慮して近い方
      var x =
        Math.abs(sp.posx - spReimu.posx) < Math.abs(sp.posx - spReimu.posx - MapWidth)
          ? sp.posx - spReimu.posx
          : sp.posx - spReimu.posx - MapWidth;
      var y =
        Math.abs(sp.posy - spReimu.posy) < Math.abs(sp.posy - spReimu.posy - MapHeight)
          ? sp.posy - spReimu.posy
          : sp.posy - spReimu.posy - MapHeight;

      // TODO:描画範囲内にあるときだけ描画する
      g.drawImage(
        sp.image[Math.floor(frameCount / 10) % 2],
        Math.floor((canvas.width - DrawSize) / 2) + x * DrawSize + scrollX,
        Math.floor((canvas.height - DrawSize) / 2) + y * DrawSize - DrawSize / 6 + scrollY,
        DrawSize,
        DrawSize
      );
    });
    // 自キャラの描画
    g.drawImage(
      spReimu.image[Math.floor(frameCount / 10) % 2],
      Math.floor((canvas.width - DrawSize) / 2),
      Math.floor((canvas.height - DrawSize) / 2) - DrawSize / 6,
      DrawSize,
      DrawSize
    );
    // HPの描画
    drawStatus();
  }

  if (scene == Scenes.Event) {
    // イベントメッセージの描画
    drawMessage(currentEvent.message);
  }
  if (scene == Scenes.Battle) {
    var enemyShake = 0;
    if (currentBattle.status == 2) enemyShake = ((frameCount / 5) % 2) * 3;
    // 敵キャラの描画
    g.drawImage(
      currentEnemy.image,
      canvas.width / 2 - currentEnemy.image.width / 2 + enemyShake,
      (canvas.height * 2) / 5 - currentEnemy.image.height / 2
    );
    // 戦闘メッセージの描画
    drawMessage(currentBattle.message);
    var statusShake = 0;
    if (currentBattle.status == 3) statusShake = ((frameCount / 5) % 2) * 3;
    // HPの描画
    drawStatus(statusShake);
  }
}

// HP表示
function drawStatus(x = 0) {
  // 残HPで色を変える
  var color = "rgb(255,255,255)";
  if (player.hp == 0) {
    color = "rgb(255,32,32)";
  } else if (player.hp < player.maxhp / 2) {
    color = "rgb(255,180,32)";
  }
}

// イベントメッセージ描画
function drawMessage(message) {
  var WindowMargin = 10;
  var WindowWidth = canvas.width - WindowMargin * 2;
  var WindowHeight = canvas.height / 4;
  drawWindow(WindowMargin, canvas.height - WindowHeight - WindowMargin, WindowWidth, WindowHeight, WindowMargin);
  for (var i = 0; i < message.length; i++) {
    drawString(message[i], WindowMargin * 3, canvas.height - WindowHeight + WindowMargin + 24 * (i + 1));
  }
}

// メッセージウィンドウ描画
function drawWindow(x, y, WindowWidth, WindowHeight, WindowMargin = 10, frameColor = "rgb(255,255,255)") {
  g.fillStyle = frameColor;
  g.fillRect(x, y, WindowWidth, WindowHeight);
  g.fillStyle = "rgb(0,0,0)";
  g.fillRect(x + WindowMargin, y + WindowMargin, WindowWidth - WindowMargin * 2, WindowHeight - WindowMargin * 2);
}

// 文字列描画
function drawString(string, x, y, color = "rgb(255,255,255)") {
  g.font = "bold 16pt Arial";
  g.fillStyle = color;
  g.fillText(string, x, y);
}

// スプライトクラス
class Sprite {
  image = [];
  posx = 0;
  posy = 0;
}

// ゲームイベント
class GameEvent {
  type = 0;
  message = "";
  constructor(type, message) {
    this.type = type;
    this.message = message;
  }
}

// 戦闘用キャラクターデータ
class BattleCharacter {
  name = ""; // 名前
  hp = 0; // HP
  maxhp = 0; // 最大HP
  atc = 0; // 攻撃力
  def = 0; // 防御力
  speed = 0; // 素早さ
  image; // 画像

  constructor(name, hp, atc, def, speed, image) {
    this.name = name;
    this.hp = hp;
    this.maxhp = hp;
    this.atc = atc;
    this.def = def;
    this.speed = speed;
    this.image = image;
  }
}

// 戦闘管理クラス
class Battle {
  status = 0;
  progressCount = 0;
  actionOrder = [];
  message = [];

  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.nextAction();
  }

  // 次のキャラクター行動を実行する
  nextAction() {
    this.message = [];

    // 死亡チェック
    if (this.enemy.hp <= 0) {
      this.message.push(this.enemy.name + " を倒した！");
      okane = shokin + okane;
      keiken = keiken + keikenplus;
      this.status = 1;
      return;
    } else if (this.player.hp <= 0) {
      this.message.push(this.player.name + " は死んでしまった！");
      this.message.push("賞金として" + ageru + "ニコットを払った！");
      if (this.start == 1){
        this.message.push("賞金として" + ageru + "ニコットを払った！");
        this.updateActionOrder();
        this.status = 0;
        this.start = 0;
        spReimu.posx = 10;
        spReimu.posy = 9;
        okane = okane - ageru;
      }
    }

    // バトル
    if (this.progressCount == 0) {
      this.message.push(this.enemy.name + " があらわれた！");
      this.message.push("> battle start");
      // 行動順を設定
      this.updateActionOrder();
    } else if (this.progressCount == 1) {
      // 先行キャラの行動
      var damage = this.getDamage(this.actionOrder[0], this.actionOrder[1]);
      this.message.push(this.actionOrder[0].name + " の攻撃！");
      this.message.push(this.actionOrder[1].name + "は " + damage + " のダメージ！");
      this.actionOrder[1].hp = Math.max(0, this.actionOrder[1].hp - damage);
      if (this.actionOrder[1] == this.enemy) {
        this.status = 2;
      } else {
        this.status = 3;
      }
    } else if (this.progressCount == 2) {
      // 後攻キャラの行動
      var damage = this.getDamage(this.actionOrder[1], this.actionOrder[0]);
      this.message.push(this.actionOrder[1].name + " の攻撃！");
      this.message.push(this.actionOrder[0].name + "は " + damage + " のダメージ！");
      this.actionOrder[0].hp = Math.max(0, this.actionOrder[0].hp - damage);
      if (this.actionOrder[0] == this.enemy) {
        this.status = 2;
      } else {
        this.status = 3;
      }
    } else if (this.progressCount == 3) {
      // ターン終了
      this.message.push("> next turn");
      this.progressCount = 0;
      this.updateActionOrder();
      this.status = 0;
    }

    this.progressCount++;
  }

  // 速度を見て行動順序を決める
  updateActionOrder() {
    if (
      this.player.speed + this.getRandomInt(this.player.speed / 5) >
      this.enemy.speed + this.getRandomInt(this.enemy.speed / 5)
    ) {
      this.actionOrder[0] = this.player;
      this.actionOrder[1] = this.enemy;
    } else {
      this.actionOrder[0] = this.enemy;
      this.actionOrder[1] = this.player;
    }
  }

  // ダメージ計算
  getDamage(c1, c2) {
    // ドラクエ式
    var baseDamage = Math.max(c1.atc / 2 - c2.def / 4, 0);
    // 乱数を加算して返す
    return baseDamage + this.getRandomInt(2 + baseDamage / 10);
  }

  // 整数の乱数を取得
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}