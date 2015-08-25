define([
	'jquery',
	'underscore',
	'backbone'
	],
function($, _, Backbone) {

	"use strict";

	var AsideView = Backbone.View.extend({
		initialize: function(opts) {
			console.log("aside");
			var opts = opts || {};
			this.p = opts.p;
		},
		render: function() {
			
		},
		resize: function() {

		},
		scroll: function() {

		},
		scrollTo: function(e) {
			var id = "#" + $(e.currentTarget).data('id');
			this.p.activate(id);
			this.$el.find('.active').removeClass('.active');
			$(e.currentTarget).addClass('active');
			this.p.pn.render();
			// var t = $(id).offset().top - 60;
			// $('html, body').animate({
			// 	scrollTop: t + 'px'
			// }, 'fast');
		},
		events: {
			'click li':'scrollTo'
		}
	});

	return AsideView;
});