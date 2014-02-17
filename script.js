
var dataRef = new Firebase('https://testdraw.firebaseio.com/')
  , node = dataRef.child('points')
  , painter = new Painter(document.querySelector('#draw-zone'), node);
