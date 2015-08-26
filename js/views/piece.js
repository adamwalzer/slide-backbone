define([
	'jquery',
	'underscore',
	'backbone'
	],
function($, _, Backbone) {

	"use strict";

	var PieceView = Backbone.View.extend({
		initialize: function(opts) {
			console.log("piece");
			var opts = opts || {};
			this.x = opts.x || 0;
			this.y = opts.y || 0;
			this.v = opts.z || 2;
			this.m = opts.m || 0
			this.p = opts.p || {};
			this.render();
		},
		render: function() {
			this.$el = $('<div style="left:'+this.x*50+'px; top:'+this.y*50+'px;"></div>');
			this.val(this.v);
			this.p.$el.append(this.$el);
		},
		val: function(nv) {
			this.v = nv || this.v;
			this.$el.attr({'val':this.v}).html(this.v);
			return this.v;
		},
		move: function(m) {
			this.m = m || this.m;
			return this.m;
		},
		getX: function() {
			return this.x;
		},
		moveX: function(nx) {
			this.x = nx;
			this.$el.css({'left':nx*50+'px'});
			return this;
		},
		getY: function() {
			return this.y;
		},
		moveY: function(ny) {
			this.y = ny;
			this.$el.css({'top':ny*50+'px'});
			return this;
		},
		destroy: function() {
			var self = this;
			_.delay(function() {
				self.$el.remove();
			},250);
		},
		events: {

		}
	});

	return PieceView;
});