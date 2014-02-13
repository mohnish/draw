
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
    // TODO make this optional so that it can be used for regular event binding
    if (!obj) throw new Error('Object missing');
    this.el = el;
    this.obj = obj;
  }

  EventManager.prototype.bind = function(evt, fn) {
    var obj = this.obj
      , el = this.el
      , args = [].slice.call(arguments, 2);

    function cb(e) {
      var listOfArgs = [e].concat(args);
      fn.apply(obj, listOfArgs);
    }

    bind(el, evt, cb);
    return cb;
  };

  EventManager.prototype.unbind = function(evt, fn) {
    unbind(this.el, evt, fn);
    return fn;
  };

  window.EventManager = EventManager;
})();
