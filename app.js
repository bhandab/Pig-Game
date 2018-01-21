/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScores, activePlayer, gamePlaying;

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

//just like queryselector, but getElementById works only for id selector and also faster than querySelector
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player-1';
    document.getElementById('name-1').textContent = 'Player-2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}
init();
//dice = Math.floor(Math.random()*6)+1;


//document.querySelector('#current-'+activePlayer).textContent = dice;//works with plain text modification
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>';//for HTML element midification use .innerHTML




//var x = document.querySelector('#score-0').textContent;//.textContent can also be used to read and store an element from webpage
//console.log(x);



//Lecture Events and Events Handling

/*
function btn(){
    
}
document.querySelector('.btn-roll').addEventListener('click',btn);*/

//if we dont want function to be called outside we can do it as follows and function defined inside is called anonymous function and cannot be used outside. It is a common pratice instead of defining function outside explicitly for event listeners
document.querySelector('.btn-roll').addEventListener('click', function(){
    if (gamePlaying){
      //1. Random number
    var dice = Math.floor(Math.random()*6)+1;
    //2.Display Result
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    //3. Update the round score only if the rolled number was not a 1
    if (dice !== 1){
        //Add Score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else{
        //Next Player
        nextPlayer();
        
    }  
    }
    
})
document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying){
       //add current score with the global score
    scores[activePlayer] += roundScore;
    
    //Update User Interface
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //check if player won the game
    if (scores[activePlayer] >= 100){
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }
    else{
        //nextPlayer
        nextPlayer();
    }
    
     
    }
    
   
})
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
        
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';//hides dice when 1 is there and changes player
        
}

document.querySelector('.btn-new').addEventListener('click', init);//calls init function when new game button is selected