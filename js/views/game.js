define([
	'jquery',
	'underscore',
	'backbone',
	'views/board'
	],
function($, _, Backbone, BoardView) {

	"use strict";

	var GameView = Backbone.View.extend({
		initialize: function() {
			console.log("game");
			this.$('.title').html("Slide - Original");
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

	return GameView;
});