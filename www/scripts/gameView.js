class GameView {

    constructor() {
        this.imgF = document.querySelector('#img-f');
        this.imgA = document.querySelector('#img-a');
    }

    display(fighter, adverser) {

        let music1 = document.querySelector('#music1');
        let music2 = document.querySelector('#music2');
        let music3 = document.querySelector('#music3');
        
        
        let divFight = document.querySelector('.fighter');
        let name = document.querySelector('div input[name=name]').value;
    
        this.imgF.style.backgroundImage = `url(img/${fighter.name}/${fighter.name}.gif)`;
        this.imgA.style.backgroundImage = `url(img/${adverser.name}/${adverser.name}-a.gif)`;
    
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
        if (adverser.life <= 0) {
            if (adverser.name === 'chanli') {
                music2.src = '/audio/diegirl.wav';
            } else {
                music2.src = '/audio/dieguy.wav';
            }
            music2.currentTime = 0;
            music2.play();
            music1.src = '/audio/youwin.wav';
            music1.currentTime = 0;
            music1.play();
            this.gameOver(fighter, adverser, 1); 
        } 
        if (fighter.life <= 0) {
            music1.src = '/audio/dieguy.wav';
            music1.currentTime = 0;
            music1.play();
            music2.src = '/audio/youlose.wav';
            music2.currentTime = 0;
            music2.play();
            this.gameOver(fighter, adverser, 0);
        }  
    }

    animAttackF(fighter, adverser, i) {
        
        this.imgF.style.animationDuration = `${fighter.timeAttack[i-1]}s`;
        // imgF.style.animationDuration = `2.5s`;
        this.imgA.style.animationDuration = '1s';    
        this.imgA.style.animationDelay = `1.5s`;
        this.imgF.style.animationName = `attack${i}-${fighter.name}`;
        // console.log(imgF.style.animationName); 
        if (fighter.name === "blanka" && i===2) {
            this.imgA.style.animationName = `${adverser.name}-shocked`;
        } else {
            this.imgA.style.animationName = `${adverser.name}-tombe`;
        }
        
    }

    animAttackA(fighter, adverser, i) {
        this.imgA.style.animationName = `attack${i}-${adverser.name}-a`; 
        this.imgA.style.animationDuration = `${adverser.timeAttack[i-1]}s`;
        this.imgF.style.animationDuration =`1s`;
        this.imgF.style.animationDelay = `1.5s`;
        if (!fighter.onBlock) {
            this.imgF.style.animationName = `${fighter.name}-tombe`;        
        }
    }

    jumpF(fighter) {
        
        this.imgF.style.animationDuration = `${fighter.timeAttack[fighter.timeAttack.length - 1]}s`;    
        // imgF.style.animationDuration = '1s';
        this.imgF.style.animationName = `${fighter.name}-jump`;
        music1.src = '/audio/jump.mp3';
        music1.currentTime = 0;
        music1.play();

    }

    jumpA(adverser) {

        this.imgA.style.animationDuration = `${adverser.timeAttack[adverser.timeAttack.length - 1]}s`;    
        // imgA.style.animationDuration = '1s';
        this.imgA.style.animationName = `${adverser.name}-jump-a`;
        music2.src = '/audio/jump.mp3';
        music2.currentTime = 0;
        music2.play();
    }

    gameOver(fighter, adverser, msg) {
        let divStart = document.querySelector('.players-choice');
        let logo = document.querySelector('.header');
        let divCombat = document.querySelector('.combat');
        let buttonStart = document.querySelector('div button[type=submit]');        
        let divGameOver = document.querySelector('.game-over');
        let finalMsg = document.querySelector('.final-msg');
        let finalMsg1 = document.querySelector('.final-msg1');
        
        
        if (msg === 1) {
            this.imgA.style.backgroundImage = `url("img/${adverser.name}/${adverser.name}-ko-a.gif")`;
            this.imgF.style.backgroundImage = `url("img/${fighter.name}/${fighter.name}-win.gif")`;
            // alert("you win");
            finalMsg.textContent = "You win";
            finalMsg1.textContent = `Perfect ${fighter.name} good job`;
            
        } 
        if (msg === 0) {
            this.imgF.style.backgroundImage = `url("img/${fighter.name}/${fighter.name}-ko.gif")`;
            this.imgA.style.backgroundImage = `url("img/${adverser.name}/${adverser.name}-win-a.gif")`;
            // alert("you lose");
            finalMsg.textContent = "You lose";
            finalMsg1.textContent = `Perfect ${adverser.name}`;
        }
        divGameOver.style.display = 'block';

    }
}