var canvas, g;
var maptip;
var map;
var posx, posy;
var imgReimu;
var MapWidth = 32;
var MapHeight = 32;
var MapDrawWidth = 16;
var MapDrawHeight = 16;
var DrawSize = 64;
var AnimationNum = 16;
var scrollX, scrollY;
var frameCount;
var currentKey;
var mae = 0;

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

function init() {
  // マップの定義 0草 1木 2水 3山
  map = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  ];
  // マップチップの読込
  maptip = [];
  for (var i = 0; i < 4; i++) {
    maptip[i] = new Image();
    maptip[i].src = "map/maptip" + i + ".png";
  }
  // 初期位置
  posx = 16;
  posy = 16;
  // キャラ画像読込
  imgReimu = [];
  for (var i = 0; i < 2; i++) {
    imgReimu[i] = new Image();
    imgReimu[i].src = "anime/stop0.png";
  }
  // その他
  scrollX = 0;
  scrollY = 0;
  frameCount = 0;
  currentKey = -1;
}

function keydown(e) {
  currentKey = e.keyCode;
}
function keyup(e) {
  currentKey = -1;
}
function inputCheck() {
  if (scrollX != 0 || scrollY != 0) return;

  var x = posx;
  var y = posy;
  var animx = 0;
  var animy = 0;
  if (currentKey == 37) {
    // 左
    x = (posx - 1 + MapWidth) % MapWidth;
    for (var i = 0; i < 2; i++) {
      mae = 2;
      imgReimu[i] = new Image();
      imgReimu[i].src = "anime/hidari" + i + ".png";
    }
    animx = -1;
  } else if (currentKey == 38) {
    // 上
    y = (posy - 1 + MapHeight) % MapHeight;
    for (var i = 0; i < 2; i++) {
      imgReimu[i] = new Image();
      imgReimu[i].src = "anime/usiro" + i + ".png";
    }
    mae = 1;
    animy = -1;
  } else if (currentKey == 39) {
    // 右
    x = (posx + 1) % MapWidth;
    animx = 1;
    for (var i = 0; i < 2; i++) {
      mae = 3;
      imgReimu[i] = new Image();
      imgReimu[i].src = "anime/migi" + i + ".png";
    }
  } else if (currentKey == 40) {
    // 下
    y = (posy + 1) % MapHeight;
    for (var i = 0; i < 2; i++) {
      imgReimu[i] = new Image();
      imgReimu[i].src = "anime/mae" + i + ".png";
    }
    mae = 0;
    animy = 1;
    }else if(currentKey == 65) {
      // 左
      x = (posx - 1 + MapWidth) % MapWidth;
      for (var i = 0; i < 2; i++) {
        mae = 2;
        imgReimu[i] = new Image();
        imgReimu[i].src = "anime/hidari" + i + ".png";
      }
      animx = -1;
    } else if (currentKey == 87) {
      // 上
      y = (posy - 1 + MapHeight) % MapHeight;
      for (var i = 0; i < 2; i++) {
        imgReimu[i] = new Image();
        imgReimu[i].src = "anime/usiro" + i + ".png";
      }
      mae = 1;
      animy = -1;
    } else if (currentKey == 68) {
      // 右
      x = (posx + 1) % MapWidth;
      animx = 1;
      for (var i = 0; i < 2; i++) {
        mae = 3;
        imgReimu[i] = new Image();
        imgReimu[i].src = "anime/migi" + i + ".png";
      }
    } else if (currentKey == 83) {
      // 下
      y = (posy + 1) % MapHeight;
      for (var i = 0; i < 2; i++) {
        imgReimu[i] = new Image();
        imgReimu[i].src = "anime/mae" + i + ".png";
      }
      mae = 0;
      animy = 1;
    }else { 
    for (var i = 0; i < 2; i++) {
      imgReimu[i] = new Image();
      imgReimu[i].src = "anime/stop" + mae + ".png";
    }
  }

  // 当たり判定
  if (map[y][x] == 0 || map[y][x] == 1) {
    // 移動可能なら移動
    posx = x;
    posy = y;
    scrollX = animx * DrawSize;
    scrollY = animy * DrawSize;
  }else if (map[y][x] == 2) { 
    for (var i = 0; i < 2; i++) {
      posx = x;
      posy = y;
      scrollX = animx * DrawSize;
      scrollY = animy * DrawSize;
      imgReimu[i] = new Image();
      imgReimu[i].src = "anime/fune" + mae + i + ".png";
    }
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
      var x = (posx - Math.floor(MapDrawWidth / 2) + j + MapWidth) % MapWidth;
      var y = (posy - Math.floor(MapDrawHeight / 2) + i + MapHeight) % MapHeight;
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
  // キャラの描画
  g.drawImage(
    imgReimu[Math.floor(frameCount / 10) % 2],
    Math.floor((canvas.width - DrawSize) / 2),
    Math.floor((canvas.height - DrawSize) / 2) - DrawSize / 6,
    DrawSize,
    DrawSize
  );
}
