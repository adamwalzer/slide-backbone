define([
	'jquery',
	'underscore',
	'backbone',
	'views/header',
	'views/slider',
	'views/main',
	'views/footer',
	'views/game',
	'views/one-by-one'
	],
function($, _, Backbone, HeaderView, SliderView, MainView, FooterView, GameView, OneByOneGameView) {

	"use strict";

	var Router = Backbone.Router.extend({
		initialize: function() {
			console.log("router");

			$('header').each(function() {
				new HeaderView({el:this});
			});

			$('.game.original').each(function() {
				window.board = new GameView({el:this});
			});

			$('.game.one-by-one').each(function() {
				window.board = new OneByOneGameView({el:this});
			});

			$('.game.twist').each(function() {
				window.board = new GameView({el:this});
			});

			$('main').each(function() {
				new MainView({el:this});
			});

			$('.slider').each(function() {
				new SliderView({el:this});
			});

			$('footer').each(function() {
				new FooterView({el:this});
			});

		}
	});

	return Router;
});