
;(function(window) {
  function Painter(el, node) {
    if (!(this instanceof Painter)) return new Painter(el);
    if (!el) throw new Error('A HTML Canvas element is required to operate on');
    this.el = el;
    this.ctx = el.getContext('2d');
    this.inProgress = false;
    this.eventManager = EventManager(this.el, this);
    this.node = node;
    this.attachEvents();
    this.subscribe();
  }

  Painter.prototype.attachEvents = function() {
    this.eventManager.bind('touchstart', this.start);
    this.eventManager.bind('mousedown', this.start);
    this.eventManager.bind('touchmove', this.paint);
    this.eventManager.bind('mousemove', this.paint);
    this.eventManager.bind('touchend', this.stop);
    this.eventManager.bind('mouseup', this.stop);
    return this;
  };

  Painter.prototype.start = function(e, x, y) {
    var x = x || e.x || e.touches[0].pageX
      , y = y || e.y || e.touches[0].pageY;

    e && e.preventDefault();

    this.ctx.strokeStyle = "rgb(200,0,0)";
    this.inProgress = true;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.publish('start', x, y);
    return this;
  };

  Painter.prototype.paint = function(e, x, y) {
    var x = x || e.x || e.touches[0].pageX
      , y = y || e.y || e.touches[0].pageY;

    e && e.preventDefault();

    if (this.inProgress) {
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
      this.publish('paint', x, y);
    }

    return this;
  };

  Painter.prototype.stop = function() {
    this.ctx.closePath();
    this.inProgress = false;
    this.publish('stop', null, null);
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

  Painter.prototype.publish = function(action, x, y) {
    this.node && this.node.set({ action: action, x: x, y: y });
  };

  Painter.prototype.subscribe = function() {
    var self = this;

    this.node && this.node.on('value', function(snapshot) {
      var data = snapshot.val();

      if ('start' == data.action) {
        self.start(null, data.x, data.y);
      } else if ('paint' == data.action) {
        self.paint(null, data.x, data.y);
      } else {
        self.stop();
      }
    });
  };

  window.Painter = Painter;
})(window);
