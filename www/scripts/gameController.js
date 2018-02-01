class GameController {

    constructor() {

        this.fighter = new Fighter();
        this.adverser= new Fighter();
        this.view = new GameView();
        let _this = this;
        let fighters = [
            ["ryu", 400, [2, 3, 1]], 
            ["ken", 400, [2, 2, 1.3]], 
            ["zangile", 400, [2, 4, 1]],
            ["dhalsim", 400, [2.1, 3, 1.5]],
            ["guile", 400, [2, 2.5, 1]],
            ["blanka", 400, [2.5, 3, 1]],    
        ]; 
        let adversers = [
            ["ken", 400, [3, 3, 1]],
            ["chanli", 400, [1, 4, 1]]
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
        let btnGameOver = document.querySelector('#restart');
        let finalMessage = document.querySelector('.final-message');
        let music1 = document.querySelector('#music1');
        let music2 = document.querySelector('#music2');
        let soundCheck = document.querySelector('#sound-check');
        let soundIcon = document.querySelector('#sound-icon');
        let onAttack, onAttackA = false;

        soundCheck.addEventListener('change', function () {
            if (this.checked) {
                music1.src = '/audio/player-select.mp3';
                music1.currentTime = 2;
                music1.play();
                soundIcon.src = "img/sound-icon.png";        
            } else {
                music1.pause();
                soundIcon.src = "img/sound-mute.png";
            }
        });

        music1.src = '/audio/player-select.mp3';
        music1.currentTime = 2;
        music1.play();


        music1.addEventListener('ended', function (event) {
            if (!(divStart.style.display === 'none')) {
                this.currentTime = 2;
                music1.play();
            } 
        });

        // evenement Click sur button Start
        buttonStart.addEventListener('click', function (event) {
            event.preventDefault();
            music1.pause();
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
                    if ( _this.fighter.onAttack) {
                        music1.src = `/audio/${_this.fighter.name}-attack1.mp3`;
                        music1.currentTime = 0;
                        music1.play();
                    } 
            });

            imgF.addEventListener('animationend', function () {
                    if (_this.fighter.onAttack) {
                        _this.fighter.simpleAttack(_this.adverser);
    
                        _this.view.display(_this.fighter, _this.adverser)
                        _this.fighter.onAttack = false;
                        imgF.style.animationName = 'none';
                    }
            });

            imgA.addEventListener('animationstart', function () {
                if (_this.fighter.onAttack) {
                    music2.src = '/audio/tape.mp3';
                    music2.currentTime = 0;
                    music2.play(); 
                }
            });

            imgA.addEventListener('animationend', function () {
                    imgA.style.animationName = 'none';
                    imgA.style.animationDelay = '0s'; 
            });
        });

        buttonSuperAttackF.addEventListener('click', function (event) {
            event.preventDefault();
            onAttack = true;
            _this.view.animAttackF(_this.fighter, _this.adverser, 2);

            imgF.addEventListener('animationstart', function (event) {
                if (onAttack) {
                    music1.src = `/audio/${_this.fighter.name}-attack2.mp3`;
                    music1.currentTime = 0;
                    music1.play();
                }
            });

            imgF.addEventListener('animationend', function () {
                if (onAttack) {
                    _this.fighter.superAttack(_this.adverser);
                    _this.view.display(_this.fighter, _this.adverser)
                    onAttack = false;
                    imgF.style.animationName = 'none';
                    imgF.style.animationDelay = '0s';
                }
            });

            imgA.addEventListener('animationstart', function () {
                if (onAttack) {
                    music2.src = '/audio/tape.mp3';
                    music2.currentTime = 0;
                    music2.play(); 
                }
            });

            imgA.addEventListener('animationend', function () {
                    imgA.style.animationName = 'none';
                    imgA.style.animationDelay = '0s';
            });
        });

        buttonJumpF.addEventListener('click', function () {
            _this.view.jumpF(_this.fighter, '#img-f');
            imgF.addEventListener('animationend', function () {
                imgF.style.animationName = 'none';
                imgF.style.animationDelay = '0s';
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
            
            imgA.addEventListener('animationstart', function (event) {
                if ( _this.adverser.onAttack) {
                    music2.src = `/audio/${_this.adverser.name}-attack1.mp3`;
                    music2.currentTime = 0;
                    music2.play();
                } 
            });

            imgA.addEventListener('animationend', function () {
                if (_this.adverser.onAttack && !_this.fighter.onBlock) {
                        _this.adverser.simpleAttack(_this.fighter);
                        _this.view.display(_this.fighter, _this.adverser)
                        _this.adverser.onAttack = false;
                        imgA.style.animationName = 'none';      
                }
            });
            imgF.addEventListener('animationstart', function () {
                if (_this.adverser.onAttack) {
                    music1.src = '/audio/tape.mp3';
                    music1.currentTime = 0;
                    music1.play(); 
                }
            });
            imgF.addEventListener('animationend', function () {
                imgF.style.animationName = 'none';
                imgF.style.animationDelay = '0s';            
            });
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
            onAttackA = true;
            _this.view.animAttackA(_this.fighter, _this.adverser, 2);
            
            imgA.addEventListener('animationstart', function (event) {
                if (onAttackA) {
                    music2.src = `/audio/${_this.adverser.name}-attack2.mp3`;
                    music2.currentTime = 0;
                    music2.play();
                } 
            });

            imgA.addEventListener('animationend', function () {
                if (onAttackA && !_this.fighter.onBlock) {
                        _this.adverser.superAttack(_this.fighter);
                        _this.view.display(_this.fighter, _this.adverser)
                        onAttackA = false;
                        imgA.style.animationName = 'none';                       
                }
            });
            imgF.addEventListener('animationstart', function () {
                if (onAttackA) {
                    music1.src = '/audio/tape.mp3';
                    music1.currentTime = 0;
                    music1.play(); 
                }
            });
            imgF.addEventListener('animationend', function () {
                imgF.style.animationName = 'none';
                imgF.style.animationDelay = '0s';            
            });
        });

        buttonJumpA.addEventListener('click', function () {
            
            _this.view.jumpA(_this.adverser);
            imgA.addEventListener('animationend', function () {
                imgA.style.animationName = 'none';
                imgA.style.animationDelay = '0s';
            });   
        });

        buttonGetPowerA.addEventListener('click', function (event) {
            event.preventDefault();
            if (_this.adverser.power < 15) {
                _this.adverser.getPower();   
            } else {
                alert('you have enough energy');
            }
            _this.view.display(_this.fighter, _this.adverser);
        });

        btnGameOver.addEventListener('click', function (event) {
           event.preventDefault();
           divGameOver.style.display = 'none';
           divStart.style.display = 'block';
           buttonStart.style.display = 'block';
           divCombat.style.display = 'none';
           logo.style.height = "250px";
           music1.src = '/audio/player-select.mp3';
           music1.currentTime = 2;
           music1.play();
        });
        

        function selectFighter(name, id) {
            return new Fighter(id, name, fighters[id][1], fighters[id][2]);    
        }
        
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }       
    }
}