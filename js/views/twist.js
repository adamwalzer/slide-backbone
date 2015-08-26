define([
	'jquery',
	'underscore',
	'backbone',
	'views/twist-board'
	],
function($, _, Backbone, BoardView) {

	"use strict";

	var TwistGameView = Backbone.View.extend({
		initialize: function() {
			console.log("one-by-one-game");
			this.score = 0;
			this.$score = this.$('.score');
			this.board = new BoardView({el:this.$('.board')[0],game:this});
		},
		render: function() {

		},
		updateScore: function(z) {
			this.score += z;
			this.$score.html(this.score);
		},
	});

	return TwistGameView;
});