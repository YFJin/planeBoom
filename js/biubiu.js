function Biu(x, y) {
	this.biu = document.createElement("img");
	this.biu.src = "img/bullet.png";
	this.biu.width = 6;
	this.biu.height = 22;
	this.iframe = 0;
	this.speed = 5;
	this.x = x;
	this.y = y;
	this.idx = {
		x : 0,
		y : 0
	};
}

Biu.prototype.move = function() {
	this.iframe++;
}

Biu.prototype.create = function(x, y) {
	return new Biu(x, y);
}

