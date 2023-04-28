
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started = false;


var level = 0;


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkanswer(userClickedPattern.length-1);
});
function checkanswer(currentlevel){
  if(gamePattern[currentlevel]==userClickedPattern[currentlevel]){
    if(userClickedPattern.length==gamePattern.length){
      if(userClickedPattern.length==10){
        $("body").addClass("gamer-over-won");
        $("#level-title").text("You Won, Press Any Key to Restart");
        setTimeout(function(){
          $("body").removeClass("gamer-over-won");
          },200);
        return;
      }
      setTimeout(function() {
        nextSequence();
      },1000);
    
    }

  } 
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    startover();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;


  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startover(){
  level=0;
  gamePattern = [];
  started=false;
}
