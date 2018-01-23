class Fighter {

    constructor(id, name, power, timeAttack) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.score = 0;
        this.life = 100;
        this.timeAttack = timeAttack;
        this.onAttack = false;
        this.onBlock = false;
    }

    simpleAttack(adverser) {
        this.score+=5;
        this.power-=5;
        adverser.power-=20;
        adverser.life-=5;
    }

    superAttack (adverser) {
        this.score+=30;
        this.power-=40;
        adverser.power-= 50;
        adverser.life-= 20;
    }

    getPower() {
        this.power+=5;
    }

}