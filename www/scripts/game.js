"use strict";

let gameCrtl = new GameController();

// let fighters = [
//     ["ryu", 400, [2.1, 2, 1]], 
//     ["ken", 400, [2.1,]], 
//     ["zangile", 400, [2.1,]],
//     ["dhalsim", 400, [2.1,]],
//     ["guile", 400, [2.1,]],
//     ["blanka", 400, [2.1,]],    
// ]; 
// let adversers = [
//     ["ken", 400, [3, 1]]
    
// ];

// let fighter = new Fighter();
// let adverser= new Fighter();

// // récupération des éléments Buttons 
// let buttonStart = document.querySelector('div button[type=submit]');
// let buttonAttackF = document.querySelector('#attack-f');
// let buttonAttackA = document.querySelector('#attack-a');
// let buttonGetPowerF = document.querySelector('#get-power-f');
// let buttonGetPowerA = document.querySelector('#get-power-a');
// let buttonSuperAttackF = document.querySelector('#super-attack-f');
// let buttonSuperAttackA = document.querySelector('#super-attack-a');
// let buttonJumpAttackF = document.querySelector('#jump-f');
// let buttonJumpAttackA = document.querySelector('#jump-a');
// let onAttack, onAttackA = false;

// // récupéré les Div principales
// let divStart = document.querySelector('.players-choice');
// let logo = document.querySelector('.header');
// let divCombat = document.querySelector('.combat');
// let choice = document.querySelectorAll('div input[type=radio]');
// let name = document.querySelector('div input[name=name]').value;
// // console.log(choice);

// // evenement Click sur button Start
// buttonStart.addEventListener('click', function (event) {
//     event.preventDefault();
//     let id = 0; 
//     choice.forEach(item => {
//         if (item.checked) {
//             id = parseInt(item.getAttribute('id'));
//         }
//     });

//     fighter = selectFighter(fighters[id][0], id);
//     id = getRandomInt(adversers.length);
//     adverser = selectFighter(adversers[id][0], id);
//     // savePlayers(fighter, adverser);
    
//     divStart.style.display = 'none';
//     divCombat.style.display = 'flex';
//     divCombat.style.backgroundImage = `url('img/photo${getRandomInt(3)}.gif')`;
    
//     buttonStart.style.display = 'none';
//     logo.style.height = "1px";    

//     display();
//     // attackA();
// })

// function display() {
//     // let fighter = getPlayer();
//     // let adverser = getAdverser();
//     let divFight = document.querySelector('.fighter');

//     let pictureF = document.querySelector('#img-f');
//     pictureF.style.backgroundImage = `url(img/${fighter.name}/${fighter.name}.gif)`;
//     // pictureF.style.animationName = '';
//     console.log(pictureF.style.animationName);
//     pictureF = document.querySelector('#img-a');
//     pictureF.style.backgroundImage = `url(img/${adverser.name}/${adverser.name}-a.gif)`;

//     let divNameF = document.querySelector(".name-f");
//     let divNameA = document.querySelector(".name-a");    
//     let scoreF = document.querySelector("#score-f");    
//     let lifeF = document.querySelector("#life-f");
//     let scoreA = document.querySelector("#score-a");
//     let lifeA = document.querySelector("#life-a");
//     let barreLifeF = document.querySelector("#barre-progress-f");
//     let barreLifeA = document.querySelector("#barre-progress-a");
    
//     let barrePowerF = document.querySelector("#barre-progress-power-f");
//     let barrePowerA = document.querySelector("#barre-progress-power-a");
    
//     scoreF.innerHTML = ''; 
//     lifeF.innerHTML = ''; 
//     scoreA.innerHTML = '';
//     lifeA.innerHTML = '';
//     if (!(name=='')) {
//         divNameF.textContent = name;
//     } else {
//         divNameF.textContent = fighter.name;
//     }
//     divNameA.textContent = adverser.name;
    
    
//     scoreF.textContent = fighter.score; 
//     lifeF.textContent = fighter.life; 
//     scoreA.textContent = adverser.score; 
//     lifeA.textContent = adverser.life; 
//     barreLifeF.style.width = `${fighter.life}%`;
//     barreLifeA.style.width = `${adverser.life}%`;   
//     barrePowerF.style.width = `${fighter.power/4}%`;
//     barrePowerA.style.width = `${adverser.power/4}%`;   
// }

// buttonAttackF.addEventListener('click', function (event) {
//     event.preventDefault();
//     animAttackF(1);
//     if (adverser.life <= 0) {
//         display();
//         alert("you win");
//         gameOver();
//     }
// });

// buttonSuperAttackF.addEventListener('click', function (event) {
//     event.preventDefault();
//     animAttackF(2);
//     if (adverser.life <= 0) {
//         display();
//         alert("you win");
//         gameOver();
//     }
// });

// buttonJumpAttackF.addEventListener('click', function () {

//     let imgF = document.querySelector('#img-f');
//     imgF.style.animationDuration = `${fighter.timeAttack[fighter.timeAttack.length - 1]}s`;    
//     // imgF.style.animationDuration = '1s';
//     imgF.style.animationName = `${fighter.name}-jump`;
//     imgF.addEventListener('animationend', function () {
//         imgF.style.animationName = 'none';
//     });   
//     display();
// });

// buttonGetPowerF.addEventListener('click', function (event) {
//     event.preventDefault();
//     if (fighter.power < 15) {
//         fighter.getPower(); 
//         console.log('+energy');  
//     } else {
//         alert('you have enough energy');
//     }
//     display();
// });

// buttonAttackA.addEventListener('click', function name(params) {
//     animAttackA(1);
//     if (fighter.life <= 0) {
//         alert("you lost");
//         console.log("you win");
//         gameOver();
//     }
// });

// buttonSuperAttackA.addEventListener('click', function () {
    
//     animAttackA(2);
//     if (fighter.life <= 0) {
//         alert("you lost");
//         console.log("you win");
//         gameOver();
//     }
// });

// buttonJumpAttackA.addEventListener('click', function () {
    
//         let imgA = document.querySelector('#img-a');
//         imgA.style.animationDuration = `${adverser.timeAttack[adverser.timeAttack.length - 1]}s`;    
    
//         // imgA.style.animationDuration = '1s';
//         imgA.style.animationName = `${adverser.name}-jump-a`;
//         imgA.addEventListener('animationend', function () {
//             imgA.style.animationName = 'none';
//         });   
//         display();
//     });

// // les functions

// function animAttackF(i) {
//     let imgF = document.querySelector('#img-f');
//     let imgA = document.querySelector('#img-a');
//     onAttack = true;
//     imgF.style.animationDuration = `${fighter.timeAttack[i-1]}s`;
//     // imgF.style.animationDuration = `2s`;
    
//     imgA.style.animationDuration = '1s';    
//     imgA.style.animationDelay = `1.5s`;
//     imgF.style.animationName = `attack${i}-${fighter.name}`; 
//     imgA.style.animationName = `${adverser.name}-tombe`;
//     imgF.addEventListener('animationend', function () {
//             if (onAttack) {
//                 if (i===1) {
//                     fighter.simpleAttack(adverser);
//                 } else {
//                     fighter.superAttack(adverser);
//                 }
//                 display();
//                 onAttack = false;
//             }
//             imgF.style.animationName = 'none';
//         });
//     imgA.addEventListener('animationend', function () {
//         imgA.style.animationName = 'none';
//         imgA.style.animationDelay = '0s';
//     });
// }

// function animAttackA(i) {
//     let imgF = document.querySelector('#img-f');
//     let imgA = document.querySelector('#img-a');
//     onAttackA = true;
//     imgA.style.animationName = `attack${i}-${adverser.name}-a`; 
//     imgA.style.animationDuration = `${adverser.timeAttack[i-1]}s`;
//     imgF.style.animationDelay = `1.5s`;
//     imgF.style.animationName = `${fighter.name}-tombe`;
//     imgA.addEventListener('animationend', function () {
//             if (onAttackA) {
//                 if (i === 1) {
//                     adverser.simpleAttack(fighter);
//                 } else {
//                     adverser.superAttack(fighter);
//                 }
//                 display();
//                 onAttackA = false;
//             }
//             imgA.style.animationName = 'none';
//         });
//     imgF.addEventListener('animationend', function () {
//         imgF.style.animationName = 'none';
//     });
// }


// function selectFighter(name, id) {
//     return new Fighter(id, name, fighters[id][1], fighters[id][2]);    
// }

// function getRandomInt(max) {
//     return Math.floor(Math.random() * Math.floor(max));
// }

// function gameOver() {
//     divStart.style.display = 'block';
//     divCombat.style.display = 'none';
//     buttonStart.style.display = 'block';
// }


