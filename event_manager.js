
;(function(){
  var binder = window.addEventListener ? 'addEventListener' : 'attachEvent'
    , unbinder = window.removeEventListener ? 'removeEventListener' : 'detachEvent'
    , prefix = binder !== 'addEventListener' ? 'on' : '';

  function bind(el, type, fn, capture) {
    el[binder](prefix + type, fn, capture || false);
    return fn;
  }

  function unbind(el, type, fn, capture) {
    el[unbinder](prefix + type, fn, capture || false);
    return fn;
  }

  function EventManager(el, obj) {
    if (!(this instanceof EventManager)) return new EventManager(el, obj);
    if (!el) throw new Error('Element missing');
    // TODO make this optional (for regular event binding)
    if (!obj) throw new Error('Object missing');
    this.el = el;
    this.obj = obj;
  }

  EventManager.prototype.bind = function(evt, fn) {
    var obj = this.obj
      , el = this.el;

    function cb(e) {
      fn.call(obj, e);
    }

    bind(el, evt, cb);
    return cb;
  };

  EventManager.prototype.unbind = function(evt, fn) {
    var obj = this.obj
      , el = this.el;

    function cb(e) {
      fn.call(obj, e);
    }

    unbind(el, evt, cb);
    return cb;
  };

  window.EventManager = EventManager;
})();
