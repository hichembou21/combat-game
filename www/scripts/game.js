"use strict";

let fighters = [
    ["ryu", 400], 
    ["ken", 400], 
    ["zangile", 400],
    ["dhalsim", 400],
    ["guile", 400],
    ["blanka", 400],    
]; 
let adversers = [
    ["ken", 400], 
    
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
let onAttack, onAttackA = false;

// récupéré les Div principales
let divStart = document.querySelector('.players-choice');
let logo = document.querySelector('.header');
let divCombat = document.querySelector('.combat');
let choice = document.querySelectorAll('div input[type=radio]');
let name = document.querySelector('div input[name=name]').value;
// console.log(choice);

// evenement Click sur button Start
buttonStart.addEventListener('click', function (event) {
    event.preventDefault();
    let id = 0; 
    choice.forEach(item => {
        if (item.checked) {
            id = parseInt(item.getAttribute('id'));
        }
    });

    fighter = selectFighter(fighters[id][0], id);
    id = getRandomInt(adversers.length);
    adverser = selectFighter(adversers[id][0], id);
    // savePlayers(fighter, adverser);
    
    divStart.style.display = 'none';
    divCombat.style.display = 'flex';
    divCombat.style.backgroundImage = `url('img/photo${getRandomInt(3)}.gif')`;
    
    buttonStart.style.display = 'none';
    logo.style.height = "1px";    

    display();
    // attackA();
})

function display() {
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    let divFight = document.querySelector('.fighter');

    let pictureF = document.querySelector('#img-f');
    pictureF.style.backgroundImage = `url(img/${fighter.name}.gif)`;
    // pictureF.style.animationName = '';
    console.log(pictureF.style.animationName);
    pictureF = document.querySelector('#img-a');
    pictureF.style.backgroundImage = `url(img/${adverser.name}-a.gif)`;

    let divNameF = document.querySelector(".name-f");
    let divNameA = document.querySelector(".name-a");    
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
    if (!name==='') {
        divNameF.textContent = name;
    } else {
        divNameF.textContent = fighter.name;
    }
    divNameA.textContent = adverser.name;
    
    
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
    animAttackF(1);
    // savePlayers(fighter, adverser);
    if (adverser.life <= 0) {
        display();
        alert("you win");
        gameOver();
    }
    // setTimeout(display(), 3000);
});

buttonSuperAttackF.addEventListener('click', function (event) {
    event.preventDefault();
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    animAttackF(2);
    // savePlayers(fighter, adverser);
    if (adverser.life <= 0) {
        display();
        alert("you win");
        gameOver();
    }
    // setTimeout(display(), 3000);
});

buttonJumpAttackF.addEventListener('click', function () {

    let imgF = document.querySelector('#img-f');
    imgF.style.animationDuration = '1.2s';
    imgF.style.animationName = `${fighter.name}-jump`;
    imgF.addEventListener('animationend', function () {
        imgF.style.animationName = 'none';
    });   
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

buttonAttackA.addEventListener('click', function name(params) {
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    animAttackA(1);
    // savePlayers(fighter, adverser);
    if (fighter.life <= 0) {
        alert("you lost");
        console.log("you win");
        gameOver();
    }
});

buttonSuperAttackA.addEventListener('click', function () {
    
    animAttackA(2);
    // savePlayers(fighter, adverser);
    if (fighter.life <= 0) {
        alert("you lost");
        console.log("you win");
        gameOver();
    }
});

buttonJumpAttackA.addEventListener('click', function () {
    
        let imgA = document.querySelector('#img-a');
        imgA.style.animationDuration = '1s';
        imgA.style.animationName = `${adverser.name}-jump-a`;
        imgA.addEventListener('animationend', function () {
            imgA.style.animationName = 'none';
        });   
        display();
    });

// les functions

function animAttackF(i) {
    let imgF = document.querySelector('#img-f');
    let imgA = document.querySelector('#img-a');
    console.log(imgF);
    // imgF.style.backgroundSize = 'cover';
    onAttack = true;
    imgF.style.animationDuration = '3.5s';
    imgA.style.animationDuration = '1.5s';    
    imgA.style.animationDelay = `2.2s`;
    imgF.style.animationName = `attack${i}-${fighter.name}`; 
    imgA.style.animationName = `${adverser.name}-tombe`;
    imgF.addEventListener('animationend', function () {
            if (onAttack) {
                if (i===1) {
                    fighter.simpleAttack(adverser);
                } else {
                    fighter.superAttack(adverser);
                }
                display();
                onAttack = false;
            }
            imgF.style.animationName = 'none';
        });
    imgA.addEventListener('animationend', function () {
        imgA.style.animationName = 'none';
    });
        
    console.log(imgF.style.animationName);
    // imgF.style.animationName = 'none';
}

function animAttackA(i) {
    let imgF = document.querySelector('#img-f');
    let imgA = document.querySelector('#img-a');
    console.log(imgF);
    // imgF.style.backgroundSize = 'cover';
    onAttackA = true;
    imgA.style.animationName = `attack${i}-${adverser.name}-a`; 
    imgA.style.animationDuration = '2.8s';
    imgF.style.animationDelay = `2s`;
    imgF.style.animationName = `${fighter.name}-tombe`;
    imgA.addEventListener('animationend', function () {
            if (onAttackA) {
                if (i === 1) {
                    adverser.simpleAttack(fighter);
                } else {
                    adverser.superAttack(fighter);
                }
                display();
                onAttackA = false;
            }
            imgA.style.animationName = 'none';
        });
    imgF.addEventListener('animationend', function () {
        imgF.style.animationName = 'none';
    });
}


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


