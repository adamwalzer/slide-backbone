define([
	'jquery',
	'underscore',
	'backbone'
	],
function($, _, Backbone) {

	"use strict";

	var HeaderView = Backbone.View.extend({
		initialize: function() {
			console.log("header");
			$(window).on('scroll', _.bind(this.scroll, this));
			this.render();
		},
		render: function() {
			
		},
		resize: function() {

		},
		scroll: function (e) {
			var st = $(window).scrollTop();
			var breakpoint = 50;

			if (st < breakpoint) {
				this.$el.removeClass('condensed');
				this.resize();
				_.defer(function() {
					$(window).trigger('scroll');
				});
			} else {
				this.$el.addClass('condensed');
			}

		},
		toggle: function(e) {
			var $p = $(e.currentTarget).parent();
			if($p.hasClass('active')) {
				$p.removeClass('active');
			} else {
				$p.addClass('active');
			}
		},
		emailClick: function(e) {
			if($(window).width() > 650) {
				e.preventDefault();
				this.ec = true;
				var email = $(e.currentTarget).attr('href').split(':')[1];
				window.prompt("Press Ctrl+C, Enter to copy to clipboard", email);
			}
		},
		events: {
			'click .toggle':'toggle',
			'click a[title="email"], a[title="phone"]':'emailClick'
		}
	});

	return HeaderView;
});