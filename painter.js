
;(function(window) {
  function Painter(el) {
    if (!(this instanceof Painter)) return new Painter(el);
    this.el = el;
    this.ctx = el.getContext('2d');
    this.inProgress = false;
    this.eventManager = EventManager(this.el, this);
    this.attachEvents();
  }

  Painter.prototype.attachEvents = function() {
    this.eventManager.bind('mousedown', this.start);
    this.eventManager.bind('mousemove', this.paint);
    this.eventManager.bind('mouseup', this.stop);
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

  Painter.prototype.paint = function() {
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

  Painter.prototype.start = function() {
    this.inProgress = true;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    return this;
  };

  window.Painter = Painter;
})(window);
