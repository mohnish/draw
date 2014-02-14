
;(function(window) {
  function Painter(el) {
    if (!(this instanceof Painter)) return new Painter(el);
    if (!el) throw new Error('A HTML Canvas element is required to operate on');
    this.el = el;
    this.ctx = el.getContext('2d');
    this.inProgress = false;
    this.eventManager = EventManager(this.el, this);
    this.attachEvents();
  }

  Painter.prototype.attachEvents = function() {
    this.eventManager.bind('touchstart', this.start);
    this.eventManager.bind('touchmove', this.paint);
    this.eventManager.bind('touchend', this.stop);
    this.eventManager.bind('mousedown', this.start);
    this.eventManager.bind('mousemove', this.paint);
    this.eventManager.bind('mouseup', this.stop);
    return this;
  };

  Painter.prototype.start = function(e) {
    e.preventDefault();
    var x = e.x || e.touches[0].pageX
      , y = e.y || e.touches[0].pageY;

    this.ctx.strokeStyle = "rgb(200,0,0)";
    this.inProgress = true;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    return this;
  };

  Painter.prototype.paint = function(e) {
    e.preventDefault();
    var x = e.x || e.touches[0].pageX
      , y = e.y || e.touches[0].pageY;

    if (this.inProgress) {
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }

    return this;
  };

  Painter.prototype.stop = function() {
    this.ctx.closePath();
    this.inProgress = false;
    return this;
  };

  Painter.prototype.save = function() {
    this.ctx.save();
    return this;
  };

  Painter.prototype.restore = function() {
    this.ctx.restore();
    return this;
  };

  Painter.prototype.finish = function() {
    this.eventManager.unbind('mousedown', this.start);
    this.eventManager.unbind('mousemove', this.paint);
    this.eventManager.unbind('mouseup', this.stop);
    this.eventManager.unbind('touchstart', this.start);
    this.eventManager.unbind('touchmove', this.paint);
    this.eventManager.unbind('touchend', this.stop);
    return this;
  };

  window.Painter = Painter;
})(window);
