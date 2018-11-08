var name_button=document.getElementById("name_button");
var name_div=document.getElementById("enter_name");
var player_name = localStorage.getItem('player_name');
var throw_choices = ["rock", "paper", "scissors"];
var player_stats = {rock: 0, paper: 0, scissors: 0};
var browser_stats = {rock: 0, paper: 0, scissors: 0};
var stats_list = ["Total Games", "Total Wins", "Total Ties", "Total Losses", "Win Loss Ratio"];
var player_stats_ids = ["stats_player_percent_rock", "stats_player_percent_paper", "stats_player_percent_scissors"];
var browser_stats_ids = ["stats_browser_percent_rock", "stats_browser_percent_paper", "stats_browser_percent_scissors"];
localStorage.setItem("Total Games", 0);
localStorage.setItem("Total Wins", 0);
localStorage.setItem("Total Ties", 0);
localStorage.setItem("Total Losses", 0);
localStorage.setItem("Win Loss Ratio", 0);

if(!player_name){
  showOrNot(name_div, true);
}
else{
  showOrNot(name_div, false);
  updateNames(player_name);
  showOrNot(document.getElementById("throw_choice"), true);
  document.getElementById("select_throw_choice").value=0;
  console.log(player_name);
}

makeToggleable(document.getElementById("show_rules_button"), document.getElementById("rules"));//Toggle Rules
makeToggleable(document.getElementById("show_stats_button"), document.getElementById("stats"));//Toggle Stats
printStats();
throwChoice();

document.getElementById("reset").addEventListener("click", function(){
  showOrNot(document.getElementById("feedback"), false);
  showOrNot(document.getElementById("game_results"), false);
  showOrNot(document.getElementById("throw_choice"), true);
  document.getElementById("select_throw_choice").value=0;
});
document.getElementById("name_button").addEventListener("click", function(){//Save Name
  var input = document.getElementById("input_player_name").value;
  showOrNot(document.getElementById("feedback"),true);
  if (input == "") {
      feedback.innerHTML = "Enter your name to proceed.";
      feedback.classList.add("negative");
      feedback.classList.remove("positive");
      feedback.classList.remove("neutral");
  }
  else{
    localStorage.setItem("player_name", input);
    player_name = localStorage.getItem("player_name");
    console.log("Player name saved as: "+player_name);
    showOrNot(name_div,false);
    showOrNot(document.getElementById("throw_choice"),true);
    updateNames(player_name);
    feedback.innerHTML = "Ready to play, "+player_name+"?";
    feedback.classList.add("positive");
    feedback.classList.remove("negative");
    feedback.classList.remove("neutral");
  }
});

function makeToggleable(button_element, div_element){
  button_element.addEventListener("click", function(){
    if(div_element.classList.contains("hidden")){
      div_element.classList.remove("hidden");
      div_element.classList.add("visible");
    }else{
      div_element.classList.remove("visible");
      div_element.classList.add("hidden");
      }
  });
}
function showOrNot(div_element, show){
  if(show && div_element.classList.contains("hidden")){
    div_element.classList.remove("hidden");
    div_element.classList.add("visible");
  }if(!show && div_element.classList.contains("visible")){
    div_element.classList.remove("visible");
    div_element.classList.add("hidden");
    }
}
function updateNames(name){
  var name_inserts=document.getElementsByClassName("player_name_span");
  for(var i=0; i<name_inserts.length; i++){
    console.log(name_inserts[i]);
    name_inserts[i].innerHTML=name;
  }
}
function throwChoice() {
  throw_button = document.getElementById("player_throw_submit_button");
  input_value = document.getElementById("select_throw_choice");
  results_text = document.getElementById("general_game_results");
  player_text =document.getElementById("player_game_results");
  browser_text= document.getElementById("browser_game_results");
  var winner;

  throw_button.addEventListener("click", function() {
    showOrNot(document.getElementById("feedback"),true);
    showOrNot(document.getElementById("throw_choice"),false);
    player_choice =  input_value.options[input_value.selectedIndex].value;
    browser_choice = Math.ceil(Math.random() * 3);

      if (player_choice == 0) {
        feedback.innerHTML = "Choose rock, paper, or scissors to play.";
        showOrNot(document.getElementById("throw_choice"),true);
        feedback.classList.add("negative");
        feedback.classList.remove("positive");
        feedback.classList.remove("neutral");
      }
      else {
        localStorage.setItem("Total Games", parseInt(localStorage.getItem('Total Games'))+1);
        player_stats[throw_choices[player_choice-1]]++;
        browser_stats[throw_choices[browser_choice-1]]++;

        document.getElementById("player_image").src="images/player_"+throw_choices[player_choice-1]+".png";
        document.getElementById("browser_image").src="images/browser_"+throw_choices[browser_choice-1]+".png";

        if (player_choice == browser_choice) {
          feedback.innerHTML = "You and Browser Tied";
          feedback.classList.add("neutral");
          feedback.classList.remove("negative");
          feedback.classList.remove("positive")
          winner = "Tie";
          localStorage.setItem("Total Ties", parseInt(localStorage.getItem('Total Ties'))+1);
        } else if ((player_choice == 1 && browser_choice == 3) || player_choice > browser_choice) {
          feedback.innerHTML = "You Won!";
          feedback.classList.add("positive");
          feedback.classList.remove("negative");
          feedback.classList.remove("neutral");
          winner = player_name;
          localStorage.setItem("Total Wins", parseInt(localStorage.getItem('Total Wins'))+1);
          localStorage.setItem("Win Loss Ratio", parseFloat(localStorage.getItem('Total Wins')/(localStorage.getItem('Total Games')-localStorage.getItem('Total Ties'))).toFixed(2));
        } else {
          feedback.innerHTML = "You Lost!";
          feedback.classList.add("negative");
          feedback.classList.remove("positive");
          feedback.classList.remove("neutral");
          winner = "Browser";
          localStorage.setItem("Total Losses", parseInt(localStorage.getItem('Total Losses'))+1);
          localStorage.setItem("Win Loss Ratio", parseFloat(localStorage.getItem('Total Wins')/localStorage.getItem('Total Losses')).toFixed(2));
        }
        showOrNot(document.getElementById("game_results"), true);


        if(winner=="Tie"){
          results_text.innerHTML = "You and Browser tied!"}
        else{
          results_text.innerHTML = "The winner is "+winner+"!";}

        player_text.innerHTML = "You threw "+throw_choices[player_choice-1]+ "!";
        browser_text.innerHTML = "Browser threw "+throw_choices[browser_choice-1]+ "!";
        printStats();
        console.log(player_stats);
      }
  });
}
function printStats() {
  stats_list.forEach(function(id){
    document.getElementById(id.toString()).innerHTML = localStorage.getItem(id.toString());
  });

  var total_games = localStorage.getItem("Total Games");
  document.getElementById(player_stats_ids[0].toString()).innerHTML = (100*(player_stats.rock/total_games)).toFixed(2)+"%";
  document.getElementById(player_stats_ids[1].toString()).innerHTML = (100*(player_stats.paper/total_games)).toFixed(2)+"%";
  document.getElementById(player_stats_ids[2].toString()).innerHTML = (100*(player_stats.scissors/total_games)).toFixed(2)+"%";
  document.getElementById(browser_stats_ids[0].toString()).innerHTML = (100*(browser_stats.rock/total_games)).toFixed(2)+"%";
  document.getElementById(browser_stats_ids[1].toString()).innerHTML = (100*(browser_stats.paper/total_games)).toFixed(2)+"%";
  document.getElementById(browser_stats_ids[2].toString()).innerHTML = (100*(browser_stats.scissors/total_games)).toFixed(2)+"%";
}
