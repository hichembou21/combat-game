class GameView {

    constructor() {
        
    }

    display(fighter, adverser) {
        let _this = this;
        let divFight = document.querySelector('.fighter');
        let name = document.querySelector('div input[name=name]').value;
    
        let pictureF = document.querySelector('#img-f');
        pictureF.style.backgroundImage = `url(img/${fighter.name}/${fighter.name}.gif)`;
        pictureF = document.querySelector('#img-a');
        pictureF.style.backgroundImage = `url(img/${adverser.name}/${adverser.name}-a.gif)`;
    
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
        if (!(name==='')) {
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

    animAttackF(fighter, adverser, i) {
        let imgF = document.querySelector('#img-f');
        let imgA = document.querySelector('#img-a');
        imgF.style.animationDuration = `${fighter.timeAttack[i-1]}s`;
        // imgF.style.animationDuration = `2.5s`;
        imgA.style.animationDuration = '1s';    
        imgA.style.animationDelay = `1.5s`;
        imgF.style.animationName = `attack${i}-${fighter.name}`;
        // console.log(imgF.style.animationName); 
        if (fighter.name === "blanka" && i===2) {
            imgA.style.animationName = `${adverser.name}-shocked`;
        } else {
            imgA.style.animationName = `${adverser.name}-tombe`;
        }
        
    }

    animAttackA(fighter, adverser, i) {
        let imgF = document.querySelector('#img-f');
        let imgA = document.querySelector('#img-a');
        imgA.style.animationName = `attack${i}-${adverser.name}-a`; 
        imgA.style.animationDuration = `${adverser.timeAttack[i-1]}s`;
        imgF.style.animationDuration =`1s`;
        imgF.style.animationDelay = `1.5s`;
        if (!fighter.onBlock) {
            imgF.style.animationName = `${fighter.name}-tombe`;        
        }
    }

    jumpF(fighter) {
        let imgF = document.querySelector('#img-f');
        imgF.style.animationDuration = `${fighter.timeAttack[fighter.timeAttack.length - 1]}s`;    
        // imgF.style.animationDuration = '1s';
        imgF.style.animationName = `${fighter.name}-jump`;
    }

    jumpA(adverser) {
        let imgA = document.querySelector('#img-a');
        imgA.style.animationDuration = `${adverser.timeAttack[adverser.timeAttack.length - 1]}s`;    
    
        // imgA.style.animationDuration = '1s';
        imgA.style.animationName = `${adverser.name}-jump-a`;
    }
}