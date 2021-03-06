
;(function(){
  var binder = window.addEventListener ? 'addEventListener' : 'attachEvent'
    , unbinder = window.removeEventListener ? 'removeEventListener' : 'detachEvent'
    , eventPrefix = binder !== 'addEventListener' ? 'on' : '';

  function bind(el, type, fn, capture) {
    el[binder](eventPrefix + type, fn, capture || false);
    return fn;
  }

  function unbind(el, type, fn, capture) {
    el[unbinder](eventPrefix + type, fn, capture || false);
    return fn;
  }

  function EventManager(el, obj) {
    if (!(this instanceof EventManager)) return new EventManager(el, obj);
    if (!el) throw new Error('Element missing');
    // TODO make this optional (for regular event binding)
    if (!obj) throw new Error('Object missing');
    this.el = el;
    this.obj = obj;
    this.eventSubscriptionList = {};
  }

  EventManager.prototype.bind = function(evt, fn) {
    var obj = this.obj
      , el = this.el
      , args = [].slice.call(arguments, 2);

    function cb(e) {
      var a = [].slice.call(arguments).concat(args);
      fn.apply(obj, a);
    }

    this.eventSubscriptionList[evt] = cb;

    bind(el, evt, cb);
    return cb;
  };

  // TODO this needs to be able to accept method names and not just callbacks
  EventManager.prototype.unbind = function(evt) {
    var obj = this.obj
      , el = this.el
      , cb = this.eventSubscriptionList[evt];

    unbind(el, evt, cb);
  };

  window.EventManager = EventManager;
})();
