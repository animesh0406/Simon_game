var level=0;
var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var started = false;

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour) ;
$("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
level++;
$("h1").text("level "+level);
console.log(gamePattern);
}

$(".btn").click(function(){var userChosenColour=$(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
console.log(userClickedPattern);
checkAnswer(userClickedPattern.length-1); })


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(() => {    $("."+currentColor).removeClass("pressed"); }, 100);
}

$("body").keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
  console.log("success");
  if(userClickedPattern.length===gamePattern.length)
  {
    setTimeout(function() {
        nextSequence();}, 1000);
        userClickedPattern=[];
  }
}
else{
  console.log("wrong");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  started=false;
  level=0;
  gamePattern=[];
}
}
