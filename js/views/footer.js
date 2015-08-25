define([
	'jquery',
	'underscore',
	'backbone'
	],
function($, _, Backbone) {

	"use strict";

	var FooterView = Backbone.View.extend({
		initialize: function() {
			console.log("footer");
		},
		render: function() {

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
			'click a[title="email"], a[title="phone"]':'emailClick'
		}
	});

	return FooterView;
});