"use strict";

let fighters = [
    ["ryu", 500], 
    ["ken", 500], 
    ["ronda", 400],
    ["andro", 400],
    ["guile", 400]
]; 
let adversers = [
    ["ryu", 500], 
    ["ken", 500], 
    ["chanli", 400],
    ["police", 400],
    ["bison", 400]
];

let fighter = new Fighter();
let adverser= new Fighter();

// récupération des éléments Buttons 
let buttonStart = document.querySelector('div button[type=submit]');
let buttonAttackF = document.querySelector('#attack-f');
let buttonAttackA = document.querySelector('#attack-a');
let buttonGetPowerF = document.querySelector('#get-power-f');
let buttonGetPowerA = document.querySelector('#get-power-a');
let buttonSuperAttackF = document.querySelector('#super-attack-f');
let buttonSuperAttackA = document.querySelector('#super-attack-a');
let buttonJumpAttackF = document.querySelector('#jump-f');
let buttonJumpAttackA = document.querySelector('#jump-a');

// récupéré les Div principales
let divStart = document.querySelector('.players-choice');
let divCombat = document.querySelector('.combat');
let choice = document.querySelectorAll('div input[type=radio]');
// console.log(choice);

// evenement Click sur button Start
buttonStart.addEventListener('click', function (event) {
    event.preventDefault();
    let id = 0;
    let name = document.querySelector('.input-group input[type=text]').value; 
    choice.forEach(item => {
        if (item.checked) {
            id = parseInt(item.getAttribute('id'));
        }
    });

    fighter = selectFighter(fighters[id][0], id);
    id = getRandomInt(3);
    adverser = selectFighter(fighters[id][0], id);
    // savePlayers(fighter, adverser);
    
    divStart.style.display = 'none';
    divCombat.style.display = 'flex';
    buttonStart.style.display = 'none';
    display();
})

function display() {
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    let divFight = document.querySelector('.fighter');
    divFight.innerHTML = '';
    let pictureF = document.createElement('img');
    pictureF.setAttribute("src", `img/${fighter.name}.gif`)
    pictureF.setAttribute("alt", "ryu picture");
    pictureF.setAttribute("width", "150");  
    pictureF.setAttribute("height", "300");  
    divFight.appendChild(pictureF);

    pictureF = document.createElement('img');
    pictureF.setAttribute("src", `img/${adverser.name}.gif`)
    pictureF.setAttribute("alt", "ryu picture");
    pictureF.setAttribute("width", "150");  
    pictureF.setAttribute("height", "300");
    divFight.appendChild(pictureF);

    let scoreF = document.querySelector("#score-f");
    let lifeF = document.querySelector("#life-f");
    let scoreA = document.querySelector("#score-a");
    let lifeA = document.querySelector("#life-a");
    let barreLifeF = document.querySelector("#barre-progress-f");
    let barreLifeA = document.querySelector("#barre-progress-a");
    
    let barrePowerF = document.querySelector("#barre-progress-power-f");
    let barrePowerA = document.querySelector("#barre-progress-power-a");
    
    scoreF.innerHTML = ''; 
    lifeF.innerHTML = ''; 
    scoreA.innerHTML = '';
    lifeA.innerHTML = '';
    
    scoreF.textContent = fighter.score; 
    lifeF.textContent = fighter.life; 
    scoreA.textContent = adverser.score; 
    lifeA.textContent = adverser.life; 
    barreLifeF.style.width = `${fighter.life}%`;
    barreLifeA.style.width = `${adverser.life}%`;   
    barrePowerF.style.width = `${fighter.power/4}%`;
    barrePowerA.style.width = `${adverser.power/4}%`;   
}

buttonAttackF.addEventListener('click', function (event) {
    event.preventDefault();
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    fighter.simpleAttack(adverser);
    // savePlayers(fighter, adverser);
    if (adverser.life <= 0) {
        alert("you win");
        console.log("you win");
        gameOver();
    }
    display();
});

buttonSuperAttackF.addEventListener('click', function (event) {
    event.preventDefault();
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    fighter.superAttack(adverser);
    // savePlayers(fighter, adverser);
    if (adverser.life <= 0) {
        alert("you win");
        console.log("you win");
        gameOver();
    }
    display();
});

buttonGetPowerF.addEventListener('click', function (event) {
    event.preventDefault();
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    if (fighter.power < 15) {
        fighter.getPower(); 
        console.log('+energy');  
    } else {
        alert('you have enough energy');
    }
    // savePlayers(fighter, adverser);
    display();
});

buttonAttackA.addEventListener('click', function (event) {
    event.preventDefault();
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    adverser.simpleAttack(fighter);
    // savePlayers(fighter, adverser);
    if (fighter.life <= 0) {
        alert("you lost");
        console.log("you win");
        gameOver();
    }
    display();
});

buttonSuperAttackA.addEventListener('click', function (event) {
    event.preventDefault();
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    adverser.superAttack(fighter);
    // savePlayers(fighter, adverser);
    if (fighter.life <= 0) {
        alert("you lost");
        console.log("you win");
        gameOver();
    }
    display();
});



// les functions
function selectFighter(name, id) {
    return new Fighter(id, name, fighters[id][1]);
        
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function savePlayers(player1, player2) {
    let player1Json = JSON.stringify(player1);     
    localStorage.setItem("fighter", player1Json); 
    let player2Json = JSON.stringify(player2);     
    localStorage.setItem("adverser", player2Json); 
}

function getPlayer() {
    return JSON.parse(localStorage.getItem("fighter"));
}

function getAdverser() {
    return JSON.parse(localStorage.getItem("adverser"));
}

function gameOver() {
    divStart.style.display = 'block';
    divCombat.style.display = 'none';
    buttonStart.style.display = 'block';
}


