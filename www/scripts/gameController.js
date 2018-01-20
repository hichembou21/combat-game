class GameController {

    constructor() {

        this.fighter = new Fighter();
        this.adverser= new Fighter();
        this.view = new GameView();
        let _this = this;
        let fighters = [
            ["ryu", 400, [2, 2, 1]], 
            ["ken", 400, [2.5, 2, 1]], 
            ["zangile", 400, [2, 2, 1]],
            ["dhalsim", 400, [2.1,]],
            ["guile", 400, [2.1,]],
            ["blanka", 400, [2.1,]],    
        ]; 
        let adversers = [
            
            ["chanli", 400, [4, 2, 1]],
                     
        ];

        // récupération des éléments Buttons 
        let buttonStart = document.querySelector('div button[type=submit]');
        let buttonAttackF = document.querySelector('#attack-f');
        let buttonAttackA = document.querySelector('#attack-a');
        let buttonGetPowerF = document.querySelector('#get-power-f');
        let buttonGetPowerA = document.querySelector('#get-power-a');
        let buttonSuperAttackF = document.querySelector('#super-attack-f');
        let buttonSuperAttackA = document.querySelector('#super-attack-a');
        let buttonJumpF = document.querySelector('#jump-f');
        let buttonJumpA = document.querySelector('#jump-a');
        let onAttack, onAttackA = false;

        // récupéré les Div principales
        let divStart = document.querySelector('.players-choice');
        let logo = document.querySelector('.header');
        let divCombat = document.querySelector('.combat');
        let choice = document.querySelectorAll('div input[type=radio]');
                
        // evenement Click sur button Start
        buttonStart.addEventListener('click', function (event) {
            event.preventDefault();
            let id = 0; 
            choice.forEach(item => {
                if (item.checked) {
                    id = parseInt(item.getAttribute('id'));
                }
            });

            _this.fighter = selectFighter(fighters[id][0], id);
            id = getRandomInt(adversers.length);
            _this.adverser = selectFighter(adversers[id][0], id);
            
            divStart.style.display = 'none';
            divCombat.style.display = 'flex';
            divCombat.style.backgroundImage = `url('img/photo${getRandomInt(3)}.gif')`;
            
            buttonStart.style.display = 'none';
            logo.style.height = "1px";    

            _this.view.display(_this.fighter, _this.adverser);
            // attackA();
        });
        let imgF = document.querySelector('#img-f');
        let imgA = document.querySelector('#img-a');

        buttonAttackF.addEventListener('click', function (event) {
            event.preventDefault();
            onAttack = true;
            _this.view.animAttackF(_this.fighter, _this.adverser, 1);
            imgF.addEventListener('animationend', function () {
                    if (onAttack) {
                        _this.fighter.simpleAttack(_this.adverser);
    
                        _this.view.display(_this.fighter, _this.adverser)
                        onAttack = false;
                        imgF.style.animationName = 'none';
                    }
                });
            imgA.addEventListener('animationend', function () {
                imgA.style.animationName = 'none';
                imgA.style.animationDelay = '0s';
            });
            if (_this.adverser.life <= 0) {
                _this.view.display(_this.fighter, _this.adverser);
                alert("you win");
                gameOver();
            }
        });

        buttonSuperAttackF.addEventListener('click', function (event) {
            event.preventDefault();
            onAttack = true;
            _this.view.animAttackF(_this.fighter, _this.adverser, 2);
            imgF.addEventListener('animationend', function () {
                if (onAttack) {
                    _this.fighter.superAttack(_this.adverser);

                    _this.view.display(_this.fighter, _this.adverser)
                    onAttack = false;
                    imgF.style.animationName = 'none';
                }
            });
        imgA.addEventListener('animationend', function () {
            imgA.style.animationName = 'none';
            imgA.style.animationDelay = '0s';
        });
            if (_this.adverser.life <= 0) {
                _this.view.display(_this.fighter, _this.adverser);
                alert("you win");
                gameOver();
            }
        });

        buttonJumpF.addEventListener('click', function () {
            
            _this.view.jumpF(_this.fighter, '#img-f');
            imgF.addEventListener('animationend', function () {
                imgF.style.animationName = 'none';
            });   
        });

        buttonGetPowerF.addEventListener('click', function (event) {
            event.preventDefault();
            if (_this.fighter.power < 15) {
                _this.fighter.getPower(); 
                console.log('+energy');  
            } else {
                alert('you have enough energy');
            }
            _this.view.display(_this.fighter, _this.adverser);
        });

        buttonAttackA.addEventListener('click', function name(params) {
            _this.view.animAttackA(_this.fighter, _this.adverser, 1, onAttackA);            
            if (_this.fighter.life <= 0) {
                alert("you lost");
                console.log("you win");
                gameOver();
            }
        });

        buttonJumpA.addEventListener('click', function () {
            
            _this.view.jumpA(_this.adverser);
            imgA.addEventListener('animationend', function () {
                imgA.style.animationName = 'none';
            });   
        });
        

        function selectFighter(name, id) {
            return new Fighter(id, name, fighters[id][1], fighters[id][2]);    
        }
        
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }
        
        function gameOver() {
            divStart.style.display = 'block';
            divCombat.style.display = 'none';
            buttonStart.style.display = 'block';
        }
    }
}