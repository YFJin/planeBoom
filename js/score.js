function Score(){
	this.score_canvas = document.createElement("canvas");
	this.score_ctx = this.score_canvas.getContext("2d");
	this.fen = 0;
	this.score_canvas.width = 100;
	this.score_canvas.height = 50;
	this.score_ctx.fillStyle = "white";
	this.score_ctx.font = "20px 宋体";
}

Score.prototype.addScore = function() {
	var str = "得分：" + this.fen;
	this.score_ctx.drawText(str, 0, 0);
}
