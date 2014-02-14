
;(function() {
  function Communicator(obj) {
    if (!(this instanceof Communicator)) return new Communicator(obj);
  }

  window.Communicator = Communicator;
})();
