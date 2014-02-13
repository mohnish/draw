
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
    if (!obj) throw new Error('Object missing');
    this.el = el;
    this.obj = obj;
  }

  EventManager.prototype.bind = function(evt, fn) {
    var obj = this.obj
      , el = this.el;

    function cb() {
      fn.call(obj);
    }

    return bind(el, evt, cb);
  };

  EventManager.prototype.unbind = function(evt, fn) {
    return unbind(this.el, evt, fn);
  };

  window.EventManager = EventManager;
})();
