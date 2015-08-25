define([
	'jquery',
	'underscore',
	'backbone'
	],
function($, _, Backbone) {

	"use strict";

	var PrevNextView = Backbone.View.extend({
		initialize: function(opts) {
			console.log("prev-next");
			var opts = opts || {};
			this.a = opts.a;
			this.p = this.$el.find('.previous');
			this.n = this.$el.find('.next');
			this.render();
		},
		render: function() {
			// console.log(this.a.$el.find('.active')[0]);
			if(this.a.$el.find('.active').is(":first-child")) {
				this.p.addClass('disabled');
			} else {
				this.p.removeClass('disabled');
			}

			if(this.a.$el.find('.active').is(":last-child")) {
				this.n.addClass('disabled');
			} else {
				this.n.removeClass('disabled');
			}
		},
		resize: function() {

		},
		scroll: function() {

		},
		previous: function() {
			this.a.$el.find('.active').prev().click();
			this.render();
		},
		next: function() {
			this.a.$el.find('.active').next().click();
			this.render();
		},
		events: {
			'click .previous':'previous',
			'click .next':'next'
		}
	});

	return PrevNextView;
});