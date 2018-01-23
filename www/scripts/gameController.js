class GameController {

    constructor() {

        this.fighter = new Fighter();
        this.adverser= new Fighter();
        this.view = new GameView();
        let _this = this;
        let fighters = [
            ["ryu", 400, [2, 2, 1]], 
            ["ken", 400, [2.5, 2, 1.3]], 
            ["zangile", 400, [2, 4, 1]],
            ["dhalsim", 400, [2.1, 3, 1.5]],
            ["guile", 400, [2, 2.5, 1]],
            ["blanka", 400, [2.5, 3, 1]],    
        ]; 
        let adversers = [
            ["ken", 400, [3, 2, 1]],
            ["chanli", 400, [2, 3, 1]],
            // ["bison", 400, [3, 3.5, 1]]
                     
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

        // récupéré les Div principales
        let divStart = document.querySelector('.players-choice');
        let logo = document.querySelector('.header');
        let divCombat = document.querySelector('.combat');
        let choice = document.querySelectorAll('div input[type=radio]');
        let divGameOver = document.querySelector('.game-over');
        let finalMessage = document.querySelector('.final-message');
        let music = document.querySelector('#music1');
        let onAttack = false;

        music.src = '/audio/player-select.mp3';
        music.currentTime = 2;
        music.play();


        music.addEventListener('ended', function (event) {
            if (!(divStart.style.display === 'none')) {
                this.currentTime = 2;
                music.play();
            } 
        });

        // evenement Click sur button Start
        buttonStart.addEventListener('click', function (event) {
            event.preventDefault();
            music.pause();
            // music.currentTime = 0;
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
            _this.fighter.onAttack = true;
            _this.view.animAttackF(_this.fighter, _this.adverser, 1);
            imgF.addEventListener('animationstart', function (event) {
                    if ( _this.fighter.onAttack === true) {
                        music.src = '/audio/hadouken.mp3';
                        music.currentTime = 0;
                        music.play();
                    }
                   
            });

            imgF.addEventListener('animationend', function () {
                    if (_this.fighter.onAttack && _this.adverser.life > 0 ) {
                        _this.fighter.simpleAttack(_this.adverser);
    
                        _this.view.display(_this.fighter, _this.adverser)
                        _this.fighter.onAttack = false;
                        imgF.style.animationName = 'none';
                    }
                });

            imgA.addEventListener('animationstart', function () {
                music.src = '/audio/tape.mp3';
                music.currentTime = 0;
                music.play();
            });

            imgA.addEventListener('animationend', function () {
                imgA.style.animationName = 'none';
                imgA.style.animationDelay = '0s';
            });
            if (_this.adverser.life <= 0) {
                // _this.view.display(_this.fighter, _this.adverser);
                
                imgA.style.backgroundImage = `url(img/${_this.adverser.name}/${_this.adverser.name}-tombe-a.gif)`;
                if (!_this.adverser.name === 'chanli') {
                    music.src = '/audio/dieguy.wav';
                    music.currentTime = 0;
                } else {
                    music.src = '/audio/diegirl.wav';
                    music.currentTime = 0;
                }
                music.play();
                gameOver("you win");
            }
        });

        buttonSuperAttackF.addEventListener('click', function (event) {
            event.preventDefault();
            onAttack = true;
            _this.view.animAttackF(_this.fighter, _this.adverser, 2);
            imgF.addEventListener('animationend', function () {
                if (onAttack && _this.adverser.life > 0) {
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
                // _this.view.display(_this.fighter, _this.adverser);
                imgA.style.backgroundImage = `url(img/${_this.adverser.name}/${_this.adverser.name}-tombe-a.gif)`;
                if (!_this.adverser.name === 'chanli') {
                    music.src = '/audio/dieguy.wav';
                    music.currentTime = 0;
                } else {
                    music.src = '/audio/diegirl.wav';
                    music.currentTime = 0;
                }
                music.play();
                gameOver("you win");
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
            } else {
                alert('you have enough energy');
            }
            _this.view.display(_this.fighter, _this.adverser);
        });

        buttonAttackA.addEventListener('click', function name(event) {
            event.preventDefault();
            _this.adverser.onAttack = true;
            _this.view.animAttackA(_this.fighter, _this.adverser, 1);            
            imgA.addEventListener('animationend', function () {
                if (_this.adverser.onAttack && !_this.fighter.onBlock) {
                    if (_this.fighter.life > 0) {
                        _this.adverser.simpleAttack(_this.fighter);
                        _this.view.display(_this.fighter, _this.adverser)
                        _this.adverser.onAttack = false;
                        imgA.style.animationName = 'none';
                    }
                       
                }
            });
            imgF.addEventListener('animationend', function () {
                imgF.style.animationName = 'none';
                imgF.style.animationDelay = '0s';            
            });
            if (_this.fighter.life <= 0) {
                gameOver("you lost");
            }
        });

        document.body.addEventListener("keydown", function (event) {
            let x = event.keyCode;
            console.log(x);
           if (x === 87 ) {
               imgF.style.backgroundImage = `url(img/${_this.fighter.name}/${_this.fighter.name}-block.gif)`;
               _this.fighter.onBlock = true;
           } 
        });

        document.body.addEventListener("keyup", function (event) {
            let x = event.keyCode;
            if (x == 87 ) {
                imgF.style.backgroundImage = `url(img/${_this.fighter.name}/${_this.fighter.name}.gif)`;
                _this.fighter.onBlock = false;
            } 
         });

        buttonSuperAttackA.addEventListener('click', function (event) {
            event.preventDefault();
            _this.adverser.onAttack = true;
            _this.view.animAttackA(_this.fighter, _this.adverser, 2);
            imgA.addEventListener('animationend', function () {
                if (_this.adverser.onAttack && !_this.fighter.onBlock) {
                    if (_this.fighter.life > 0) {
                        _this.adverser.superAttack(_this.fighter);
                        _this.view.display(_this.fighter, _this.adverser)
                        _this.adverser.onAttack = false;
                        imgA.style.animationName = 'none';
                    }
                       
                }
            });
            imgF.addEventListener('animationend', function () {
                imgF.style.animationName = 'none';
                imgF.style.animationDelay = '0s';            
            });
            if (_this.fighter.life <= 0) {
                gameOver("you lost");
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
        
        function gameOver(msg) {
            // _this.view.display(_this.fighter, _this.adverser);
            imgA.style.backgroundImage = `url(img/${_this.adverser.name}/${_this.adverser.name}-tombe-a.gif)`;
            alert(msg);
            divStart.style.display = 'block';
            buttonStart.style.display = 'block';
            divCombat.style.display = 'none';
            logo.style.height = "250px";
            music.src = '/audio/player-select.mp3';
            music.currentTime = 2;
            music.play();
        }
        // let restartBtn = document.querySelector('.restart');
        // restartBtn.addEventListener('click', function (event) {
        //     buttonStart.style.display = 'block';
        //     divStart.style.display = 'block';
        //     divGameOver.style.display = 'none';
        //     divCombat.style.display = 'none';
        //     logo.style.height = "250px";
        //     music.src = '/audio/player-select.mp3';
        //     music.currentTime = 2;
        //     music.play();
        // });
    }
}