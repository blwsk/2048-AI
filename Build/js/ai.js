
function AI(grid) {
  this.grid = grid;
}

// static evaluation function
AI.prototype.eval = function() {
  var emptyCells = this.grid.availableCells().length;

  var smoothWeight = 0.1,
      mono2Weight  = 1.0,
      emptyWeight  = 2.7,
      maxWeight    = 1.0;

  return this.grid.smoothness() * smoothWeight
       + this.grid.monotonicity2() * mono2Weight
       + Math.log(emptyCells) * emptyWeight
       + this.grid.maxValue() * maxWeight;
};


// performs a search and returns the best move
AI.prototype.getBest = function() {
  //return this.getRandom();
  //return this.getRandomLUR();
  return this.search();
}

AI.prototype.translate = function(move) {
 return {
    0: 'up',
    1: 'right',
    2: 'down',
    3: 'left'
  }[move];
}

// priority queue data structure
/*
function PriorityQueue(heuristic) {
  this.queue = [];
  this.len = 0;
  this.heuristic = heuristic;
}

PriorityQueue.prototype.push = function(item) {
  this.queue.push(item);
  this.len = this.len + 1;
}

PriorityQueue.prototype.pop = function() {
  var best; // index of bestScore
  var bestScore = 0;

  for (var i=this.len; i>0; i--) {
    var iScore = this.heuristic(this.queue[i]);
    if ( iScore > bestScore ) {
      best = i;
      bestScore = iScore;
    }
  }

  this.len = this.len - 1;

  var removed = this.queue.splice(best, 1)[0];

  return removed;
}
*/


/**********************************************************************
 * heuristics
 **********************************************************************/

// random move
AI.prototype.getRandom = function() {
  var random = Math.floor(Math.random() * 4);
  return { move: random };
}

// random three-direction move
AI.prototype.getRandomLUR = function() {
  var arr = [0,1,3];
  var random = Math.floor(Math.random() * 3);
  var a = this.grid.clone();
  console.log(a.score());
  return { move: arr[random] };
}

// search
AI.prototype.search = function() {

  var sides = 4,
      bestMove,
      bestScore = 0,
      newGrid,
      thisGrid = this.grid,
      moves = [0, 1, 2, 3];

  moves.forEach( function(m) {
    newGrid = thisGrid.clone();
    var a = newGrid.move(m);

    // did it move?
    if ( a.moved == true ) {
      var newScore = newGrid.score();
      if ( newScore > bestScore ) {
        bestScore = newScore;
        bestMove = m;
      }
    }
  });

  return { move: bestMove };
}















