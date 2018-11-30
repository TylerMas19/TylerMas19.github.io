var name_button=document.getElementById("name_button");
var name_div=document.getElementById("enter_name");
var throw_choices = ["rock", "paper", "scissors"];
var current_player = JSON.parse(localStorage.getItem("current_player"));

if(current_player==null){
  showOrNot(name_div, true);
}
else{
  updateNameSpan(current_player.player_name);
  showOrNot(document.getElementById("throw_choice"), true);
  showOrNot(document.getElementById("buttons"),true);
}
if(localStorage.getItem("player_Browser")==null){
  current_opponent = new Player("Browser",false);
  localStorage.setItem("player_Browser",JSON.stringify(current_opponent));
}
else{
  current_opponent = JSON.parse(localStorage.getItem("player_Browser"));
}

throwChoice();

document.getElementById("show_rules_button").addEventListener("click", function(){//Go to rules.html
    location.href = "rules.html";
});
document.getElementById("show_stats_button").addEventListener("click", function(){//Go to stats.html if user selected
  if(current_player==null){//Negative feedback if attempt to see stats without entering name
    showOrNot(document.getElementById("feedback"),true);
    feedback.innerHTML = "Enter your name to see your stats.";
    feedback.classList.add("negative");
    feedback.classList.remove("positive");
    feedback.classList.remove("neutral");
  }
  else{
    location.href = "stats.html";
    // if(document.getElementById("stats").classList.contains("hidden")){
    //   document.getElementById("stats").classList.remove("hidden");
    //   document.getElementById("stats").classList.add("visible");
    // }
    // else{
    //   document.getElementById("stats").classList.remove("visible");
    //   document.getElementById("stats").classList.add("hidden");
    // }
  }
});
document.getElementById("log_out_button").addEventListener("click", function(){//Log out

  localStorage.setItem("current_player",null);
  current_player=null;
  showOrNot(name_div,true);
  showOrNot(document.getElementById("throw_choice"),false);
  showOrNot(document.getElementById("buttons"),false);
  showOrNot(document.getElementById("feedback"),false);
  showOrNot(document.getElementById("game_results"),false);
  document.getElementById("input_player_name").value="";
});
document.getElementById("name_button").addEventListener("click", function(){//Save Name
  var input = document.getElementById("input_player_name").value;
  showOrNot(document.getElementById("feedback"),true);
  if (input == "") {//if nothing entered, negative feedback
      feedback.innerHTML = "Enter your name to proceed.";
      feedback.classList.add("negative");
      feedback.classList.remove("positive");
      feedback.classList.remove("neutral");
  }
  else{//if name entered
    if(localStorage.getItem("player_"+input)==null){//if player is not in local storage, new player
      current_player = new Player(input,true);
      localStorage.setItem("player_"+input,JSON.stringify(current_player));
    }
    else{//if player is in local storage, retrieve data
      current_player = JSON.parse(localStorage.getItem("player_"+input));
    }
    localStorage.setItem("current_player",JSON.stringify(current_player));
    console.log("Current Player: "+current_player.player_name);
    showOrNot(name_div,false);
    showOrNot(document.getElementById("buttons"),true);
    showOrNot(document.getElementById("throw_choice"),true);
    updateNameSpan(current_player.player_name);
    feedback.innerHTML = "Ready to play, "+current_player.player_name+"?";
    feedback.classList.add("positive");
    feedback.classList.remove("negative");
    feedback.classList.remove("neutral");
  }
});
document.getElementById("reset").addEventListener("click", function(){
  showOrNot(document.getElementById("feedback"), false);
  showOrNot(document.getElementById("game_results"), false);
  showOrNot(document.getElementById("throw_choice"), true);
  document.getElementById("select_throw_choice").value=0;
});

function Player(name,good_or_bad){
  this.player_name=name;
  this.player_side=good_or_bad;
  this.player_stats_list=[this.player_name+"_Total_Games", this.player_name+"_Total_Wins", this.player_name+"_Total_Ties", this.player_name+"_Total_Losses", this.player_name+"_Win_Loss_Ratio"];
  this.player_throw_count=[this.player_name+"_percent_rock", this.player_name+"_percent_paper", this.player_name+"_percent_scissors"];
  for(var i=0; i<this.player_stats_list.length; i++){
    this.player_stats_list[i]=0;}
  for(var i=0; i<this.player_throw_count.length; i++){
    this.player_throw_count[i]=0;}
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
function updateNameSpan(name){
  var name_inserts=document.getElementsByClassName("player_name_span");
  for(var i=0; i<name_inserts.length; i++){
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
        current_player.player_stats_list[0]+=1;//total games +1
        current_opponent.player_stats_list[0]+=1;
        current_player.player_throw_count[player_choice-1]+=1;
        current_opponent.player_throw_count[browser_choice-1]+=1;

        document.getElementById("player_image").src="images/player_"+throw_choices[player_choice-1]+".png";
        document.getElementById("browser_image").src="images/browser_"+throw_choices[browser_choice-1]+".png";

        if (player_choice == browser_choice) {
          feedback.innerHTML = "You and Browser Tied";
          feedback.classList.add("neutral");
          feedback.classList.remove("negative");
          feedback.classList.remove("positive")
          winner = "Tie";

          current_player.player_stats_list[2]+=1;
          current_opponent.player_stats_list[2]+=1;
          current_player.player_stats_list[4]=current_player.player_stats_list[1]/(current_player.player_stats_list[0]-current_player.player_stats_list[2]).toFixed(2);
          current_opponent.player_stats_list[4]=current_opponent.player_stats_list[1]/(current_opponent.player_stats_list[0]-current_opponent.player_stats_list[2]).toFixed(2);
        }
        else if ((player_choice == 1 && browser_choice == 3) || player_choice > browser_choice) {
          feedback.innerHTML = "You Won!";
          feedback.classList.add("positive");
          feedback.classList.remove("negative");
          feedback.classList.remove("neutral");
          winner = current_player.player_name;

          current_player.player_stats_list[1]+=1;
          current_opponent.player_stats_list[3]+=1;
          current_player.player_stats_list[4]=current_player.player_stats_list[1]/(current_player.player_stats_list[0]-current_player.player_stats_list[2]).toFixed(2);
          current_opponent.player_stats_list[4]=current_opponent.player_stats_list[1]/(current_opponent.player_stats_list[0]-current_opponent.player_stats_list[2]).toFixed(2);
        }
        else {
          feedback.innerHTML = "You Lost!";
          feedback.classList.add("negative");
          feedback.classList.remove("positive");
          feedback.classList.remove("neutral");
          winner = "Browser";

          current_player.player_stats_list[3]+=1;
          current_opponent.player_stats_list[1]+=1;
          current_player.player_stats_list[4]=current_player.player_stats_list[1]/(current_player.player_stats_list[0]-current_player.player_stats_list[2]).toFixed(2);
          current_opponent.player_stats_list[4]=current_opponent.player_stats_list[1]/(current_opponent.player_stats_list[0]-current_opponent.player_stats_list[2]).toFixed(2);
        }

        showOrNot(document.getElementById("game_results"), true);
        if(winner=="Tie"){
          results_text.innerHTML = "You and Browser tied!"}
        else{
          results_text.innerHTML = "The winner is "+winner+"!";}
        player_text.innerHTML = "You threw "+throw_choices[player_choice-1]+ "!";
        browser_text.innerHTML = "Browser threw "+throw_choices[browser_choice-1]+ "!";

        localStorage.setItem("current_player",JSON.stringify(current_player));
        localStorage.setItem("player_"+current_player.player_name,JSON.stringify(current_player));
        localStorage.setItem("player_"+current_opponent.player_name,JSON.stringify(current_opponent));
      }
  });
}
