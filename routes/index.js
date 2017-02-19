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

  var gen_move; //variable where we store the generated move

  var food_array_x_coords = []; //array containing x coordinates of food items
  var food_array_y_coords = []; //array containing y coordinates of food items

  var snakes_array_x_coords = []; //array containing x coordinates of opponent snakes
  var snakes_array_y_coords = []; //array containing y coordinates of opponent snakes

  //console.log(req.body.snakes[0].coords); //contains the coordinates of the snakes' coordinates
  console.log(req.body.snakes);

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

  function store_food_location_into_array() {
    //loop through the food array
    for(var i = 0; i < req.body.food.length; i++) {
      //store the x coordinates of the food locations into an array
      food_array_x_coords[i] = req.body.food[i][0];
      //store the y coordinates of the food locations into an array
      food_array_y_coords[i] = req.body.food[i][1];
    }
  }

  function store_snakes_location_into_array() {
    //loop through the snakes array (skip index 0 since it is our snake)
    for(var i = 1; i < req.body.snakes.length; i++) {
      snakes_array_x_coords[i] = req.body.snakes[i][0];
    }
  }

  //initially set the default move to up, then perform many checks
  //based on result of the checks, make changes accordingly in functions
  //if no change is made, then the default move of up will be sent to server
  gen_move = 'up';
  store_food_location_into_array();
  store_snakes_location_into_array();
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
