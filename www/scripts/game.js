"use strict";

let fighters = [
    ["ryu", 400], 
    ["ken", 400], 
    ["andro", 400],
    ["dhalsim", 400],
    ["guile", 400],
    ["blanka", 400],    
]; 
let adversers = [
    ["ken", 400], 
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
    logo.style.height = "100px";    

    display();
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
    fighter.simpleAttack(adverser);
    // savePlayers(fighter, adverser);
    if (adverser.life <= 0) {
        display();
        alert("you win");
        gameOver();
    }
    setTimeout(display(), 3000);
});

buttonSuperAttackF.addEventListener('click', function (event) {
    event.preventDefault();
    // let fighter = getPlayer();
    // let adverser = getAdverser();
    animAttackF(2);
    fighter.superAttack(adverser);
    // savePlayers(fighter, adverser);
    if (adverser.life <= 0) {
        display();
        alert("you win");
        gameOver();
    }
    setTimeout(display(), 3000);
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

function animAttackF(i) {
    let imgF = document.querySelector('#img-f');
    console.log(imgF);
    imgF.style.backgroundImage = `url(img/${fighter.name}-attack1.gif)`;
    // imgF.style.backgroundSize = 'cover';
    imgF.style.animationName = `attack${i}-${fighter.name}`; 
    imgF.addEventListener('animationend', function () {
        imgF.style.animationName = `none`;
    });
        
    console.log(imgF.style.animationName);
    // imgF.style.animationName = 'none';
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


