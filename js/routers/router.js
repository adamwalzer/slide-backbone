define([
	'jquery',
	'underscore',
	'backbone',
	'views/header',
	'views/slider',
	'views/main',
	'views/footer',
	'views/board'
	],
function($, _, Backbone, HeaderView, SliderView, MainView, FooterView, BoardView) {

	"use strict";

	var Router = Backbone.Router.extend({
		initialize: function() {
			console.log("router");

			$('header').each(function() {
				new HeaderView({el:this});
			});

			$('.app').each(function() {
				window.board = new BoardView({el:this});
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