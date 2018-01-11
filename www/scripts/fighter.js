class Fighter {

    constructor(id, name, power) {
        this.id = id;
        this.name = name;
        this.power = power;
        this.score = 0;
        this.life = 100;
    }

    simpleAttack(adverser) {
        this.score+=5;
        this.power-=5;
        adverser.power-=40;
        adverser.life-=10;
    }

    superAttack (adverser) {
        this.score+=30;
        this.power-=30;
        adverser.power-=80;
        adverser.life-=20;
    }

    getPower() {
        this.power+=5;
    }

}