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
        adverser.power-=30;
        adverser.life-=5;
    }

    superAttack (adverser) {
        this.score+=30;
        this.power-=40;
        adverser.power-=80;
        adverser.life-=10;
    }

    getPower() {
        this.power+=5;
    }

}