// 创建画布
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// 准备背景图片，bgReady变量用来判断图片是否加载完毕，如果没有则会报错.
var bgReady = false;
var bgImage = new Image();//图片预加载，src需要放在onload后面否则ie浏览器会报错
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src ='images/18.jpg';

//  动滑稽
var dhjReady = false;
var dhjImage = new Image();
dhjImage.onload = function () {
	dhjReady = true;
};
dhjImage.src='images/tnimg.jpg';

// 移滑稽
var yhjReady = false;
var yhjImage = new Image();
yhjImage.onload = function () {
	yhjReady = true;
};
yhjImage.src='images/8d5494eef01f3a29e33f21d19e25bc315c607c3e.jpg';

// 游戏对象
var dhj = {
	speed: 256 // 每秒移动的像素
};
var yhj = {};
var monstersCaught = 0;//储存碰撞次数

// 处理按键,保存用户的输入
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];//注意 delete删除不掉原型链中的变量
}, false);

// 当两只滑稽碰撞之后开始新一轮游戏
var reset = function () {
	dhj.x = canvas.width / 2;
	dhj.y = canvas.height / 2;

	// 将新的滑稽随即放置在界面上
	yhj.x = 32 + (Math.random() * (canvas.width - 64));
	yhj.y = 32 + (Math.random() * (canvas.height - 64));
};

// 更新游戏对象的属性
var game = function (modifier) {
	if (38 in keysDown) { // 用户按下的是↑
		dhj.y -= dhj.speed * modifier;
	}
	if (40 in keysDown) { // 用户按下的是↓
		dhj.y += dhj.speed * modifier;
	}
	if (37 in keysDown) { // 用户按下的是←
		dhj.x -= dhj.speed * modifier;
	}
	if (39 in keysDown) { // 用户按下的是→
		dhj.x += dhj.speed * modifier;
	}
         //超出之后从对面出现
    if(dhj.x > canvas.width){
          dhj.x = 32;
    }
    if(dhj.x < 32){
        dhj.x = canvas.width -32;
    }

    if(dhj.y > canvas.height){ 
        dhj.y = 32;
  }
    if(dhj.y < 32){
       dhj.y = canvas.width -32;
  }

	// 滑稽与滑稽兽相遇
	if (
		dhj.x <= (yhj.x + 32)
		&& yhj.x <= (dhj.x + 32)
		&& dhj.y <= (yhj.y + 32)
		&& yhj.y <= (dhj.y + 32)
	) {
		++monstersCaught;
		reset();
	}
};

// 画出所有物体
var obj = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (dhjReady) {
		ctx.drawImage(dhjImage, dhj.x, dhj.y);
	}

	if (yhjReady) {
		ctx.drawImage(yhjImage, yhj.x, yhj.y);
	}

	// 计分牌
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("瞬间移动!帅不帅！: " + monstersCaught, 32, 32);
};

// 循环
var main = function () {
	var now = Date.now();
	var delta = now - then;

	game(delta / 1000);
	obj();

	then = now;

	requestAnimationFrame(main);
};


// 开始游戏
var then = Date.now();
reset();
main();
