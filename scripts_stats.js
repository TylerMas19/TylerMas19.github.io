var current_player = JSON.parse(localStorage.getItem("current_player"));
var current_opponent = JSON.parse(localStorage.getItem("player_Browser"));

updateNameSpan(current_player.player_name);
printStats();
document.getElementById("show_rules_button").addEventListener("click",function(){
  location.href = "rules.html";
});
document.getElementById("back_to_game_button").addEventListener("click",function(){
  location.href = "index.html";
});

function updateNameSpan(name){
  var name_inserts=document.getElementsByClassName("player_name_span");
  for(var i=0; i<name_inserts.length; i++){
    name_inserts[i].innerHTML=name;
  }
}
function printStats(){
  console.log("Print Stats")
  if(current_player==null){
    console.log("player null");
  }
  else{
    document.getElementById("Total Games").innerHTML = current_player.player_stats_list[0];
    document.getElementById("Total Wins").innerHTML = current_player.player_stats_list[1];
    document.getElementById("Total Ties").innerHTML = current_player.player_stats_list[2];
    document.getElementById("Total Losses").innerHTML = current_player.player_stats_list[3];
    if(current_player.player_stats_list[4]==null){
      document.getElementById("Win Loss Ratio").innerHTML = "0"
    }
    else{
      document.getElementById("Win Loss Ratio").innerHTML = (current_player.player_stats_list[4]).toFixed(2);
    }
    document.getElementById("Opponent Total Games").innerHTML = current_opponent.player_stats_list[0];
    document.getElementById("Opponent Total Wins").innerHTML = current_opponent.player_stats_list[1];
    document.getElementById("Opponent Total Ties").innerHTML = current_opponent.player_stats_list[2];
    document.getElementById("Opponent Total Losses").innerHTML = current_opponent.player_stats_list[3];
    if(current_opponent.player_stats_list[4]==null){
      document.getElementById("Opponent Win Loss Ratio").innerHTML = "0"
    }
    else{
      document.getElementById("Opponent Win Loss Ratio").innerHTML = (current_opponent.player_stats_list[4]).toFixed(2);
    }

    var player_games = current_player.player_stats_list[0];
    if(player_games==0){
      document.getElementById("stats_player_percent_rock").innerHTML = "0.00%";
      document.getElementById("stats_player_percent_paper").innerHTML = "0.00%";
      document.getElementById("stats_player_percent_scissors").innerHTML = "0.00%";
    }
    else{
      document.getElementById("stats_player_percent_rock").innerHTML = (100*current_player.player_throw_count[0]/player_games).toFixed(2)+"%";
      document.getElementById("stats_player_percent_paper").innerHTML = (100*current_player.player_throw_count[1]/player_games).toFixed(2)+"%";
      document.getElementById("stats_player_percent_scissors").innerHTML = (100*current_player.player_throw_count[2]/player_games).toFixed(2)+"%";
    }

    var opponent_games = current_opponent.player_stats_list[0];
    if(opponent_games==0){
      document.getElementById("stats_browser_percent_rock").innerHTML = "0.00%";
      document.getElementById("stats_browser_percent_paper").innerHTML = "0.00%";
      document.getElementById("stats_browser_percent_scissors").innerHTML = "0.00%";
    }
    else{
      document.getElementById("stats_browser_percent_rock").innerHTML = (100*current_opponent.player_throw_count[0]/opponent_games).toFixed(2)+"%";
      document.getElementById("stats_browser_percent_paper").innerHTML = (100*current_opponent.player_throw_count[1]/opponent_games).toFixed(2)+"%";
      document.getElementById("stats_browser_percent_scissors").innerHTML = (100*current_opponent.player_throw_count[2]/opponent_games).toFixed(2)+"%";
    }
  }
}
