define([
	'jquery',
	'underscore',
	'backbone',
	'views/piece'
	],
function($, _, Backbone, PieceView) {

	"use strict";

	var BoardView = Backbone.View.extend({
		initialize: function() {
			console.log("board");
			this.setupBoard();
			_.bindAll(this,'keyAction');
			$(document).bind('keydown', this.keyAction);
			this.score = 0;
			this.$score = this.$('.score');
			this.$board = this.$('.board');
			this.moving = false;
			this.createPiece();
		},
		render: function() {

		},
		setupBoard: function() {
			this.b = Array(Array(4),Array(4),Array(4),Array(4));
		},
		createPiece: function() {
			var spaces = [];
			// for(var i=0;i<4;i++) {
			// 	for(var j=0;j<4;j++) {
			// 		if(!this.b[i][j]) {
			// 			spaces.push({x:i,y:j});
			// 		}
			// 	}
			// }
			var self = this;
			_.each(self.b, function(a,i) {
				_.each(a, function(b,j) {
					if(!b) {
						spaces.push({x:i,y:j});
					}
				});
			});
			if(spaces.length === 0) {
				console.log("full");
			} else {
				var opts = {};
				opts.p = this;
				var l = Math.floor(Math.random()*spaces.length);
				var space = spaces[l];
				// spaces.splice(l,1);
				opts.x = space.x;
				opts.y = space.y;
				// opts.z = Math.floor(Math.random()*2+1)*2;
				opts.z = 2;
				this.updateScore(opts.z);
				this.b[opts.x][opts.y] = new PieceView(opts);
			}
		},
		updateScore: function(z) {
			this.score += z;
			this.$score.html(this.score);
		},
		left: function() {
			if(!this.moving) {
				this.moving = true;
				var moved = false;
				for(var j=0; j<4; j++) {
					for(var i=1; i<4; i++) {
						if(this.b[i][j]) {
							for(var k=1;k<=i;k++) {
								if(!this.b[i-k][j]) {
									this.b[i-k][j] = this.b[i-k+1][j].moveX(i-k);
									this.b[i-k+1][j] = null;
									moved = true;
								} else {
									if(this.b[i-k][j].val() === this.b[i-k+1][j].val()) {
										this.b[i-k][j].val(2*this.b[i-k][j].val());
										this.b[i-k+1][j].moveX(this.b[i-k][j].getX()).destroy();
										this.b[i-k+1][j] = null;
										moved = true;
									}
									break;
								}
							}
						}
					}
				}
				if(moved) {
					var self = this;
					_.delay(function() {
						self.createPiece();
					}, 250);
				}
				this.moving = false;
			}
		},
		up: function() {
			if(!this.moving) {
				this.moving = true;
				var moved = false;
				for(var i=0; i<4; i++) {
					for(var j=1; j<4; j++) {
						if(this.b[i][j]) {
							for(var k=1;k<=j;k++) {
								if(!this.b[i][j-k]) {
									this.b[i][j-k] = this.b[i][j-k+1].moveY(j-k);
									this.b[i][j-k+1] = null;
									moved = true;
								} else {
									if(this.b[i][j-k].val() === this.b[i][j-k+1].val()) {
										this.b[i][j-k].val(2*this.b[i][j-k].val());
										this.b[i][j-k+1].moveY(this.b[i][j-k].getY()).destroy();
										this.b[i][j-k+1] = null;
										moved = true;
									}
									break;
								}
							}
						}
					}
				}
				if(moved) {
					var self = this;
					_.delay(function() {
						self.createPiece();
					}, 250);
				}
				this.moving = false;
			}
		},
		right: function() {
			if(!this.moving) {
				this.moving = true;
				var moved = false;
				for(var j=0; j<4; j++) {
					for(var i=2; i>-1; i--) {
						if(this.b[i][j]) {
							for(var k=1;k<=3-i;k++) {
								if(!this.b[i+k][j]) {
									this.b[i+k][j] = this.b[i+k-1][j].moveX(i+k);
									this.b[i+k-1][j] = null;
									moved = true;
								} else {
									if(this.b[i+k][j].val() === this.b[i+k-1][j].val()) {
										this.b[i+k][j].val(2*this.b[i+k][j].val());
										this.b[i+k-1][j].moveX(this.b[i+k][j].getX()).destroy();
										this.b[i+k-1][j] = null;
										moved = true;
									}
									break;
								}
							}
						}
					}
				}
				if(moved) {
					var self = this;
					_.delay(function() {
						self.createPiece();
					}, 250);
				}
				this.moving = false;
			}
		},
		down: function() {
			if(!this.moving) {
				this.moving = true;
				var moved = false;
				for(var i=0; i<4; i++) {
					for(var j=2; j>-1; j--) {
						if(this.b[i][j]) {
							for(var k=1;k<=3-j;k++) {
								if(!this.b[i][j+k]) {
									this.b[i][j+k] = this.b[i][j+k-1].moveY(j+k);
									this.b[i][j+k-1] = null;
									moved = true;
								} else {
									if(this.b[i][j+k].val() === this.b[i][j+k-1].val()) {
										this.b[i][j+k].val(2*this.b[i][j+k].val());
										this.b[i][j+k-1].moveY(this.b[i][j+k].getY()).destroy();
										this.b[i][j+k-1] = null;
										moved = true;
									}
									break;
								}
							}
						}
					}
				}
				if(moved) {
					var self = this;
					_.delay(function() {
						self.createPiece();
					}, 250);
				}
				this.moving = false;
			}
		},
		keyAction: function(e) {
			var code = e.keyCode || e.which;
			if(code === 37) this.left();
			else if(code === 38) this.up();
			else if(code === 39) this.right();
			else if(code === 40) this.down();
		},
		events: {

		}
	});

	return BoardView;
});