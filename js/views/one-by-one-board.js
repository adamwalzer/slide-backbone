define([
	'jquery',
	'underscore',
	'backbone',
	'views/piece'
	],
function($, _, Backbone, PieceView) {

	"use strict";

	var BoardView = Backbone.View.extend({
		initialize: function(opts) {
			console.log("board");
			opts = opts || {};
			this.game = opts.game;
			this.setupBoard();
			$(document).bind('keydown', _.bind(this.keyAction,this));
			this.move = 0;
			this.$score = this.$('.score');
			this.moving = false;
			this.values = [1];
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
					if(b) {
						self.values.push(b.val());
					} else {
						spaces.push({x:i,y:j});
					}
				});
			});
			if(spaces.length > 0) {
				var opts = {};
				opts.p = this;
				var l = Math.floor(Math.random()*spaces.length);
				var space = spaces[l];
				// spaces.splice(l,1);
				opts.x = space.x;
				opts.y = space.y;
				opts.z = Math.max(Math.min.apply(null,this.values)-Math.floor(Math.random()*8/7),1);
				// opts.z = Math.floor(Math.random()*2*.75+1)*2;
				// opts.z = 2;
				this.move++;
				this.updateScore(opts.z);
				this.b[opts.x][opts.y] = new PieceView(opts);
			}
			if(spaces.length === 1) {
				var alive = false;
				_.each(self.b, function(a,i) {
					_.each(a, function(b,j) {
						if(b && i != 0) {
							if(b.val() === self.b[i-1][j].val()) {
								alive = true;
							}
						}
						if(b && j != 0) {
							if(b.val() === self.b[i][j-1].val()) {
								alive = true;
							}
						}
					});
				});
				if(!alive) {
					alert("No more moves. Your score is "+this.game.score);
				}
			}
			this.values = [];
		},
		updateScore: function(z) {
			this.game.updateScore(z);
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
									if(this.b[i-k][j].move() != this.move && this.b[i-k][j].val() === this.b[i-k+1][j].val()) {
										this.b[i-k][j].val(1+this.b[i-k][j].val());
										// this.b[i-k][j].val(2*this.b[i-k][j].val());
										this.b[i-k][j].move(this.move);
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
				this.afterMove(moved);
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
									if(this.b[i][j-k].move() != this.move && this.b[i][j-k].val() === this.b[i][j-k+1].val()) {
										this.b[i][j-k].val(1+this.b[i][j-k].val());
										// this.b[i][j-k].val(2*this.b[i][j-k].val());
										this.b[i][j-k].move(this.move);
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
				this.afterMove(moved);
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
									if(this.b[i+k][j].move() != this.move && this.b[i+k][j].val() === this.b[i+k-1][j].val()) {
										this.b[i+k][j].val(1+this.b[i+k][j].val());
										// this.b[i+k][j].val(2*this.b[i+k][j].val());
										this.b[i+k][j].move(this.move);
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
				this.afterMove(moved);
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
									if(this.b[i][j+k].move() != this.move && this.b[i][j+k].val() === this.b[i][j+k-1].val()) {
										this.b[i][j+k].val(1+this.b[i][j+k].val());
										// this.b[i][j+k].val(2*this.b[i][j+k].val());
										this.b[i][j+k].move(this.move);
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
				this.afterMove(moved);
			}
		},
		afterMove: function(moved) {
			if(moved) {
				var self = this;
				_.delay(function() {
					self.createPiece();
				}, 250);
			}
			this.moving = false;
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