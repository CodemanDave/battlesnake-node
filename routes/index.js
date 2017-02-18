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
    taunt: "Good meme yeah?", // optional, but encouraged!
  }

  return res.json(data)
})

// Handle POST request to '/move'
router.post('/move', function (req, res) {
  // NOTE: Do something here to generate your move

  var gen_move;

  console.log(req.body.snakes[0].coords); //contains the coordinates of the snakes' coordinates
  console.log(req.body.food);

  function check_if_edge() {
    //head at top left corner of wall
    if(req.body.snakes[0].coords[0][0] == 0 && req.body.snakes[0].coords[0][1] == 0) {
      //if next body part is below head
      if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] + 1) {
        gen_move = 'right';
      }
      //if next body is to right of head
      else if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] + 1) {
        gen_move = 'left';
      }
    }
    //top right corner of wall
    else if(req.body.snakes[0].coords[0][0] == (req.body.width - 1) && req.body.snakes[0].coords[0][1] == 0) {
      //if next body part is to left of head
      if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] - 1) {
        gen_move = 'down';
      }
      //if next body part is below head
      else if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] + 1) {
        gen_move = 'left';
      }
    }
    //bottom right corner of wall
    else if(req.body.snakes[0].coords[0][0] == (req.body.width - 1) && req.body.snakes[0].coords[0][1] == (req.body.height - 1)) {
      //if next body part is above head
      if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] - 1) {
        gen_move = 'right';
      }
      //if next body part is to left of head
      else if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] - 1) {
        gen_move = 'left';
      }
    }
    //bottom left corner of wall
    else if(req.body.snakes[0].coords[0][0] == 0 && req.body.snakes[0].coords[0][1] == (req.body.height - 1)) {
      //if next body part is to right of head
      if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] + 1) {
        gen_move = 'right';
      }
      //if next body part is above head
      else if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] - 1) {
        gen_move = 'left';
      }
    }
    else {
      check_if_firstrow();
    }
  }

  function check_if_firstrow() {
    if(req.body.snakes[0].coords[0][1] == 0) {
      gen_move = 'right';
    }
  }

  gen_move = 'up';
  check_if_firstrow();
  check_if_edge();

  // Response data
  var data = {
    //one of: ['up','down','left','right']
    move: gen_move,
    taunt: 'Snake and bake', // optional, but encouraged!
  }

  return res.json(data)
})

module.exports = router
