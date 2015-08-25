define([
'jquery',
'underscore',
'backbone'
], function ($, _, Backbone) {

"use strict";

var SliderView = Backbone.View.extend({
  initialize: function (opts) {
    opts = opts || {};
    this.duration = opts.duration || (5 * 1000);

    console.log("init SliderView");

    this.$slides = this.$el.find('.slides li');
    this.$navs = this.$el.find('.nav li');

    this.max = this.$slides.length - 1;
    this.i = 0;

    this.activate(this.i);
    this.startTimer();
  },
  next: function () {
    if (this.i === this.max) {
      var i = 0;
    } else {
      var i = this.i + 1;
    }
    this.goto(i);
  },
  prev: function () {
    if (this.i === 0) {
      var i = this.max;
    } else {
      var i = this.i - 1;
    }
    this.goto(i);
  },
  activate: function (i) {
    $(this.$slides[i]).addClass("active");
    $(this.$navs[i]).addClass("active");
  },
  deactivate: function (i) {
    $(this.$slides[i]).removeClass("active");
    $(this.$navs[i]).removeClass("active");
  },
  goto: function (i) {
    if(i !== this.i && i <= this.max && i >= 0) {
      this.activate(i);
      this.deactivate(this.i);
      this.i=i;
    }
  },
  onNavClick : function(e) {
    var $li = $(e.currentTarget);
    this.goto($li.index());
  },
  onSwipe: function(e) {
    var d = e.direction;
    alert('d');
    if(d === 'left') {
      this.prev();
    } else {
      this.next();
    }
  },
  stopTimer: function () {
    clearInterval(this.interval);
    this.interval = undefined;
  },
  startTimer: function () {
    if (this.interval) {
      this.stopTimer();
    }

    if(this.duration) {
      this.interval = setInterval(_.bind(function () {
        this.next();
      }, this), this.duration);
    }
  },
  events: {
    'click .nav li': 'onNavClick',
    'mouseenter': 'stopTimer',
    'mouseleave': 'startTimer',
    'click .next': 'next',
    'click .prev': 'prev',
    'swipe': 'onSwipe'
  }
});

return SliderView;

});