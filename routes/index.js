var express = require('express')
var router  = express.Router()

// Handle POST request to '/start'
router.post('/start', function (req, res) {
  // NOTE: Do something here to start the game

  //console.log(req.body);

  // Response data
  var data = {
    color: "#DFFF00",
    name: "The Intimidating Saj",
    head_url: "http://www.placecage.com/c/200/200", // optional, but encouraged!
    taunt: "Let's do thisss thang!", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move

  var gen_move;

  console.log(req.body.snakes[0].coords); //contains the coordinates of the snakes' coordinates
  console.log(req.body.food);
  //console.log(req.body);

  function check_if_edge() {
    //top left corner of wall
    if(req.body.snakes[0].coords[0][0] == 0 && req.body.snakes[0].coords[0][1] == 0) {
      //if(req.body.snakes[0].coords[1][0])
        gen_move = 'right';
    }
    //top right corner of wall
    else if(req.body.snakes[0].coords[0][0] == (req.body.width - 1) && req.body.snakes[0].coords[0][1] == 0) {
      gen_move = 'down';
    }
    //bottom right corner of wall
    else if(req.body.snakes[0].coords[0][0] == (req.body.width - 1) && req.body.snakes[0].coords[0][1] == (req.body.height - 1)) {
      gen_move = 'left';
    }
    //bottom left corner of wall
    else if(req.body.snakes[0].coords[0][0] == 0 && req.body.snakes[0].coords[0][1] == (req.body.height - 1)) {
      gen_move = 'up';
    }
  }

  function check_if_foodrightleft() {
    //if food is to the right somewhere close
    if(req.body.snakes[0].coords[0][0] >= req.body.food[0][0]) {
      gen_move = 'left';
    }
    //if food is to the left somewhere close
    else if(req.body.snakes[0].coords[0][0] <= req.body.food[0][0]) {
      gen_move = 'right';
    }
  }

  function check_if_topwall() {
    //if we reach the top
    if(req.body.snakes[0].coords[0][1] == 0) {
      //do something to make a smart choice of left or right
      //remove this line
      gen_move = 'left';
    }
    else {
      gen_move = 'right';
    }
  }

  check_if_edge();
  check_if_foodrightleft();
  check_if_topwall();

  // Response data
  var data = {
    //one of: ['up','down','left','right']
    move: gen_move,
    taunt: 'Snake and bake', // optional, but encouraged!
  }

  return res.json(data)
})

module.exports = router
