define([
'jquery',
'underscore',
'backbone'
], function($, _, Backbone) {

"use strict";

var StickyBlockView = Backbone.View.extend({
  initialize: function(opts) {
    this.$container = opts.$container || $("main");

    console.log("initialize StickyBlockView");

    this.initialPosition = this.$el.css('position');

    $(window).on('scroll', _.throttle(_.bind(this.scroll, this), 10));
    $(window).on('resize', _.debounce(_.bind(this.resize, this)));
    $(document).on('sticky-resize', _.bind(this.reconfigure,this));

    if ( this.initialPosition === 'static' || this.initialPosition === 'relative') {
      this.isStatic = true;
    }

    this.resize();
  },
  resize: function () {
    /* Cache offset since scroll is expensive */
    console.log("resize");

    if($(window).width() < 600) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    this.reset();

    _.defer(_.bind(function () {

    this.top = parseInt(this.$el.offset().top);
    this.left = parseInt(this.$el.offset().left);
    this.width = this.$el.outerWidth();
    this.height = this.$el.outerHeight();

    /* Cache Container Dimensions */
    this.containerMax = this.$container.offset().top + this.$container.height();

    if (this.sticky) {
      this.stick(true);
    }

    }, this));
  },
  stick: function (e, reset) {

    this.trigger("stick");

    if (this.isMobile) {return;}

    if (!this.sticky || reset) {
      this.$el.addClass('sticky');
      this.$el.css({
        'left': this.left,
        'width': this.width,
        'height': this.height,
        'top': this.hh /* should be cached somehow */
      });
      this.sticky = true;
    }

    this.containerMax = this.$container.offset().top + this.$container.height();

    var max = this.containerMax - this.hh;
    var t = -(parseInt(this.$el.css('top') || 0));
    var bottom = this.$el.offset().top + t + this.height;

    if (bottom > max) {
      var diff = max - bottom;
      this.$el.css('top', diff + this.hh);
    } else if (t > 0) {
      this.$el.css('top', '');
    }
  },
  unstick: function () {
    this.trigger("unstick");

    this.reset();    
    this.sticky = false;
  },
  reset: function () {
    this.$el.removeClass('sticky');
    this.$el.css({
      'left': '',
      'width': '',
      'height': '',
      'top': ''
    });

    if (this.isStatic) {
      var $prev = this.$el.prev();
      $prev.css('padding-bottom', '');
    }
  },
  reconfigure: function(e, h) {
    console.log("reconfigure");
    h = h || 0;
    var hh = this.hh - h;
    this.scroll(e, hh);
  },
  scroll: function(e, hh) {
    this.hh = hh || $('#header').outerHeight();
    var st = $(window).scrollTop();

    if (st + this.hh >= this.top) {
      var reset = this.hh != parseInt(this.$el.css('top'));
      this.stick(e, reset);
    } else if (this.sticky) {
      this.unstick();
    }
  },
  destroy: function() {
    $(window).off('scroll.'+this.guid);
    $(window).off('resize.'+this.guid);
  }
});

return StickyBlockView;

});