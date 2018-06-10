function Enemy(){
	this.enemyPlane = document.createElement("img");
	this.enemyPlane.src = "img/enemy.png";
    this.enemyPlane.width = 23;
    this.enemyPlane.height = 30;
    this.x = Math.random() * 300 - this.enemyPlane.width / 2;
    this.y = 0;
    this.speed = Math.random() * 3 + 2;
    this.iframe = 0;
    this.idx = {
    	x : 0,
    	y : 0
    };
}

Enemy.prototype.create = function() {
	return new Enemy();
}

Enemy.prototype.move = function() {
	this.iframe += 0.5;
}
