define([
	'jquery',
	'underscore',
	'backbone',
	'views/aside',
	'views/sticky-block',
	'views/prev-next'
	],
function($, _, Backbone, AsideView, StickyBlockView, PrevNextView) {

	"use strict";

	var MainView = Backbone.View.extend({
		initialize: function() {
			console.log("main");

			var self = this;

			$('aside').each(function() {
				self.aside = new AsideView({el:this, p:self});
				new StickyBlockView({el:this});
			});

			this.scroll();

			$('.prev-next').each(function() {
				self.pn = new PrevNextView({el:this, a:self.aside});
			});

			// if($('aside')[0]) {
			// 	$(document).on('scroll', _.bind(this.scroll,this));
			// }

			this.unwrapImgs();
		},
		unwrapImgs: function() {
			this.$el.find('p > img').each(function() {
				$(this).unwrap();
			});
		},
		scroll: function() {
			var $ts = this.$el.find('.subpage')
			var l = $ts.length - 1;
			var $t = $ts.filter(function(i) {
				return $(this).offset().top > 50 + $(window).scrollTop() || i === l;
			}).first();
			$t.addClass('active');
			var id = $t.attr('id');
			var $li = $("aside li[data-id='"+id+"']");
			if(!$li.hasClass('active')) {
				$('aside li').removeClass('active');
				$li.addClass('active');
			}
		},
		activate: function(id) {
			this.$el.find('.active').removeClass('active');
			this.$el.find(id).addClass('active');
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

	return MainView;
});