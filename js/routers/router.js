define([
	'jquery',
	'underscore',
	'backbone',
	'views/header',
	'views/slider',
	'views/main',
	'views/footer',
	'views/game'
	],
function($, _, Backbone, HeaderView, SliderView, MainView, FooterView, GameView) {

	"use strict";

	var Router = Backbone.Router.extend({
		initialize: function() {
			console.log("router");

			$('header').each(function() {
				new HeaderView({el:this});
			});

			$('.game').each(function() {
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