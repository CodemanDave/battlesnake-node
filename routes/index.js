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

  //console.log(req.body.snakes[0].coords); //contains the coordinates of the snakes' coordinates
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
        gen_move = 'down';
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
        gen_move = 'left';
      }
      //if next body part is to left of head
      else if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] - 1) {
        gen_move = 'up';
      }
    }
    //bottom left corner of wall
    else if(req.body.snakes[0].coords[0][0] == 0 && req.body.snakes[0].coords[0][1] == (req.body.height - 1)) {
      //if next body part is to right of head
      if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] + 1) {
        gen_move = 'up';
      }
      //if next body part is above head
      else if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] - 1) {
        gen_move = 'right';
      }
    }
  }

  function check_if_firstrow() {
    //if we are at top row
    if(req.body.snakes[0].coords[0][1] == 0) {
      //if we have a body part to our left
      if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] - 1) {
        gen_move = 'right';
      }
      //we must have a body part to our right
      else {
        gen_move = 'left';
      }
    }
  }

  function check_if_bottomrow() {
    //if we are at bottom row
    if(req.body.snakes[0].coords[0][1] == (req.body.height - 1)) {
      //if we have a body part to our left
      if(req.body.snakes[0].coords[1][0] == req.body.snakes[0].coords[0][0] - 1) {
        gen_move = 'right';
      }
      //we must have a body part to our right
      else {
        gen_move = 'left';
      }
    }
  }

  function check_if_rightcolumn() {
    //if we are at right column wall
    if(req.body.snakes[0].coords[0][0] == (req.body.width - 1)) {
      //if we have a body part above us
      if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] - 1) {
        gen_move = 'down';
      }
      //we must have a body part below us
      else {
        gen_move = 'up';
      }
    }
  }

  function check_if_leftcolumn() {
    //if we are at left column wall
    if(req.body.snakes[0].coords[0][0] == 0) {
      //if we have a body part above us
      if(req.body.snakes[0].coords[1][1] == req.body.snakes[0].coords[0][1] - 1) {
        gen_move = 'down';
      }
      //we must have a body part below us
      else {
        gen_move = 'up';
      }
    }
  }

  gen_move = 'up';
  check_if_firstrow();
  check_if_bottomrow();
  check_if_rightcolumn();
  check_if_leftcolumn();
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
