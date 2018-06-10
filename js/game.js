function Game(ctx, enemy, our, biu){	
	this.ctx = ctx;
	this.enemy = enemy;
	this.our = our;
	this.biu = biu;
	this.diffArr = [30, 20, 10, 2];
	this.enemyTimer = null;
	this.ourTimer = null;	
	this.dom = document.getElementById("box");
	this.enemyArr = [];
	this.biuArr = [];
	this.biubiuArr = [];
	this.idx = 0;
	this.score = 0;
	this.initInterface();
}

Game.prototype.initInterface = function(){
//	var a = document.getElementsByName();
	var h1 = document.createElement("h1");
	
	h1.innerHTML = "打飞机v1.0";
	
	this.dom.appendChild(h1);
	this.difficult_arr = ["特别简单", "有点简单", "没那么简单", "有点困难"];	
	
	for(var i = 0; i < this.difficult_arr.length; i++){
		var div = document.createElement("div");
		div.innerHTML = this.difficult_arr[i];
		div.className = i === this.difficult_arr.length-1 ? "difficult" : "easy";
		div.i = i;
		var me = this;
		div.onclick = function(){
			me.startGame(this.i);
		}
		this.dom.appendChild(div);
	}
}

Game.prototype.startGame = function(idx) {
	
	this.dom.parentNode.removeChild(this.dom);
	this.ctx.canvas.width = 300;
	this.ctx.canvas.style.display = "block";
	this.first();
	
	var me = this;
	
	this.enemyTimer = setInterval(function() {
		me.clear();
		me.renderOur();
		me.checkBoom();
		me.idx++;
		if(me.idx % me.diffArr[idx] === 0){
			me.createEnemy();
			me.createBiu();
		}
		me.biuArr.forEach(function(value, index) {
			value.move();
		})
		me.checkBiu();		
		me.renderBiu();	
		me.enemyArr.forEach(function(value, index) {
			value.move();
		})
		me.checkEnemy();
		me.renderEnemy();
		me.renderBiubiu();
		me.renderScore();
	},20);
}

Game.prototype.clear = function() {
	
	this.ctx.clearRect(0, 0, 300, 500);
}

Game.prototype.renderEnemy = function() {
	
	this.enemyArr.forEach(function(value, index) {
		
		var enemyImg = value.enemyPlane;
		
		value.idx.x = value.x;
		value.idx.y = value.speed * value.iframe;
		
		this.ctx.drawImage(enemyImg, value.idx.x, value.idx.y, enemyImg.width, enemyImg.height);
	});
}

Game.prototype.createEnemy = function() {
	
	this.enemyArr.push(this.enemy.create());
}

Game.prototype.checkEnemy = function() {
	
	var me = this;
	
	this.enemyArr.forEach(function(value, index) {
		if((value.speed * value.iframe) >= 500){
			me.enemyArr.splice(index,1);
			me.checkEnemy();
		}
	});
}

Game.prototype.renderOur = function() {
		
	var me = this;
		
	document.onmousemove = function(e) {
		// 井
//		if(e.clientX <= me.ctx.canvas.offsetLeft){
//			if(e.clientY >=  me.ctx.canvas.offsetTop + me.ctx.canvas.clientHeight){
//				me.our.plane_x = me.ctx.canvas.offsetLeft;
//				me.our.plane_y = me.ctx.canvas.offsetTop + me.ctx.canvas.clientHeight;
//			}else if(e.clientY <=  me.ctx.canvas.offsetTop){
//				me.our.plane_x = me.ctx.canvas.offsetLeft;
//				me.our.plane_y = me.ctx.canvas.offsetTop;				
//			}else{
//				me.our.plane_x = me.ctx.canvas.offsetLeft;
//				me.our.plane_y = e.clientY;
//			}
//		}else if(e.clientX >= me.ctx.canvas.offsetLeft + me.ctx.canvas.clientWidth){
//			if(e.clientY >=  me.ctx.canvas.offsetTop + me.ctx.canvas.clientHeight){c
//				me.our.plane_x = me.ctx.canvas.offsetLeft + me.ctx.canvas.clientWidth;
//				me.our.plane_y = me.ctx.canvas.offsetTop + me.ctx.canvas.clientHeight;
//			}else if(e.clientY <=  me.ctx.canvas.offsetTop){
//				me.our.plane_x = me.ctx.canvas.offsetLeft + me.ctx.canvas.clientWidth;
//				me.our.plane_y = me.ctx.canvas.offsetTop;				
//			}else{
//				me.our.plane_x = me.ctx.canvas.offsetLeft + me.ctx.canvas.clientWidth;
//				me.our.plane_y = e.clientY;
//			}
//		}else{
//			if(e.clientY >=  me.ctx.canvas.offsetTop + me.ctx.canvas.clientHeight){c
//				me.our.plane_x = e.clientX - me.ctx.canvas.offsetLeft;
//				me.our.plane_y = me.ctx.canvas.offsetTop + me.ctx.canvas.clientHeight;
//			}else if(e.clientY <=  me.ctx.canvas.offsetTop){
//				me.our.plane_x = e.clientX - me.ctx.canvas.offsetLeft;
//				me.our.plane_y = me.ctx.canvas.offsetTop;				
//			}else{
//				me.our.plane_x = e.clientX - me.ctx.canvas.offsetLeft;
//				me.our.plane_y = e.clientY - me.ctx.canvas.offsetTop;
//			}			
//		}
	}

	this.ctx.canvas.parentNode.onmousemove = function(e) {
		var result = me.ctx.canvas.getBoundingClientRect();
		me.our.plane_x = e.clientX - result.left - me.our.plane.width / 2;
		me.our.plane_y = e.clientY - result.top - me.our.plane.height / 2;
	};	
	
	this.ctx.drawImage(this.our.plane, this.our.plane_x, this.our.plane_y, this.our.plane.width, this.our.plane.height);
}

Game.prototype.first = function() {
	
	var me = this;
	
	this.ctx.canvas.parentNode.onmouseenter = function(e) {
		var result = me.ctx.canvas.getBoundingClientRect();
		me.our.plane_x = e.clientX - result.left - me.our.plane.width / 2;
		me.our.plane_y = e.clientY - result.top - me.our.plane.height / 2;
	};	
	
	this.ctx.drawImage(this.our.plane, this.our.plane_x, this.our.plane_y, this.our.plane.width, this.our.plane.height);
}

Game.prototype.createBiu = function() {
	
	var x = this.our.plane_x;
	var y = this.our.plane_y;
	
	this.biuArr.push(this.biu.create(x, y));
}

Game.prototype.checkBiu = function() {
	
	var me = this;
	
	this.biuArr.forEach(function(value, index) {
		if((value.y-value.speed * value.iframe) <= 0){
			me.biuArr.splice(index,1);
			me.checkBiu();
		}
	});
}

Game.prototype.renderBiu= function() {
	
	var me = this;
	
	this.biuArr.forEach(function(value, index) {
		var biuImg = value.biu;
		value.idx.y = value.y - value.iframe * value.speed;
		value.idx.x = value.x + me.our.plane.width/2-3		
//		me.ctx.drawImage(biuImg, value.x, value.idx.y, biuImg.width, biuImg.height);
		me.ctx.drawImage(biuImg, value.idx.x, value.idx.y, biuImg.width, biuImg.height);				
	})
}

Game.prototype.checkBoom = function() {
	
	var me = this;
	
	this.enemyArr.forEach(function(e_value, e_index) {

		if(me.our.plane_x + me.our.plane.width >= e_value.idx.x && me.our.plane_x <= e_value.idx.x + e_value.enemyPlane.width){
			if(me.our.plane_y <= e_value.idx.y + e_value.enemyPlane.height && me.our.plane_y + me.our.plane.height >= e_value.idx.y){
				me.gameOver();
			}
		}		
		me.biuArr.forEach(function(b_value, b_index) {
				
			if(e_value.idx.y - e_value.enemyPlane.width <= b_value.idx.y && b_value.idx.y <= e_value.idx.y){
				if(e_value.idx.x <= b_value.idx.x && b_value.idx.x <= e_value.idx.x + e_value.enemyPlane.width )	{
					me.biuArr.splice(b_index, 1);
					me.biubiuArr.push(e_value);
					me.enemyArr.splice(e_index, 1);	
					me.score += 10;					
					me.renderEnemy();		
					me.checkBoom();	
				}
			}
		})
	})
}

Game.prototype.renderBiubiu = function() {
	var me = this;
	this.biubiuArr.forEach(function(value, index) {
		value.enemyPlane.src = "img/boom.png";
		me.ctx.drawImage(value.enemyPlane, value.x, value.idx.y);
		setTimeout(function() {
			me.biubiuArr.splice(index, 1);
		},20);
	})
}

Game.prototype.renderScore = function() {
	
	this.ctx.fillStyle = "white";
	this.ctx.font = "20px 宋体";
	
	var str = "得分：" + this.score;
	
	this.ctx.fillText(str, 0, 20);
}

Game.prototype.gameOver = function() {
	
	var me = this;
	
	this.our.plane.src = "img/boom2.png";
	this.renderOur();
	setTimeout(function(){
		clearInterval(me.enemyTimer);
		var dom = document.createElement("div");
		dom.className = "endDiv";
	
		var p0 = document.createElement("p");
		p0.innerHTML = "GAME OVER";	
		dom.appendChild(p0);
		
		var p1 = document.createElement("p");
		p1.innerHTML = "您的得分为：" + me.score + "分";	
		dom.appendChild(p1);
		
		var p2 = document.createElement("span");
		p2.innerHTML = "重新开始";
		p2.style.cursor = "pointer";
		dom.appendChild(p2);
		
		document.body.appendChild(dom);
		
		p2.onclick = function() {
			window.location.reload();
		}
	},20);
}