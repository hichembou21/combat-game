"use strict";

let fighters = [
    ["ryu", 500], 
    ["ken", 500], 
    ["ronda", 400]
]; 

let buttonStart = document.querySelector('div button[type=submit]');
let divStart = document.querySelector('.players-choice');
let divCombat = document.querySelector('.combat');
let choice = document.querySelectorAll('div input[type=radio]');
// console.log(choice);

buttonStart.addEventListener('click', function (event) {

    event.preventDefault();
    let id = 0;
    let name = document.querySelector('div input[type=text]').value; 
    choice.forEach(item => {
        if (item.checked) {
            id = parseInt(item.getAttribute('id'));
            console.log(id);
        }
    });

    let fighter = selectFighter(fighters[id][0], id);
    id = getRandomInt(3);
    let adverser = selectFighter(fighters[id][0], id);
    savePlayers(fighter, adverser);
    
    divStart.style.display = 'none';
    divCombat.style.display = 'flex';
    let img1 =  
    buttonStart.style.display = 'none';
    display();
})

function display() {
    let fighter = getPlayer();
    let adverser = getAdverser();
    let divFight = document.querySelector('.fighter');
    let pictureF = document.createElement('img');
    pictureF.setAttribute("src", `img/${fighter.name}.gif`)
    pictureF.setAttribute("alt", "ryu picture");
    pictureF.setAttribute("width", "150");  
    pictureF.setAttribute("height", "300");  
    divFight.appendChild(pictureF);

    pictureF = document.createElement('img');
    pictureF.setAttribute("src", `img/${adverser.name}.gif`)
    console.log(adverser.name);
    pictureF.setAttribute("alt", "ryu picture");
    pictureF.setAttribute("width", "150");  
    pictureF.setAttribute("height", "300");
    divFight.appendChild(pictureF);


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


