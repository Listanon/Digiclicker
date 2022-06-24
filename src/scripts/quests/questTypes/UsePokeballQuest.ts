/// <reference path="../Quest.ts" />

class UsePokeballQuest extends Quest implements QuestInterface {

    private pokeball: GameConstants.Pokeball;

    constructor(amount: number, reward: number, pokeball: GameConstants.Pokeball) {
        super(amount, reward);
        this.pokeball = pokeball;
        this.focus = App.game.statistics.pokeballsUsed[this.pokeball];
    }

    public static generateData(): any[] {
        const possiblePokeballs = [GameConstants.Pokeball.Pokeball, GameConstants.Pokeball.Greatball, GameConstants.Pokeball.Ultraball];
        const pokeball = SeededRand.fromArray(possiblePokeballs);
        const amount = SeededRand.intBetween(100, 500);
        const reward = this.calcReward(amount, pokeball);
        return [amount, reward, pokeball];
    }

    private static calcReward(amount: number, pokeball: GameConstants.Pokeball) {
        // Reward for Greatballs is 4x Pokeballs, Ultraballs are 9x Pokeballs
        const reward = Math.ceil(amount * (pokeball + 1) * (pokeball + 1) * GameConstants.DEFEAT_POKEMONS_BASE_REWARD);
        return super.randomizeReward(reward);
    }

    get description(): string {
        if(this.pokeball === GameConstants.Pokeball.Pokeball) {
            var displayname = "Digiscan"
        }
        else if(this.pokeball === GameConstants.Pokeball.Greatball){
            displayname = "Greatscan"
        }
        else{
            displayname = "Ultrascan"
        }
        return `Use ${this.amount.toLocaleString('en-US')} ${displayname}s.`;
    }

    toJSON() {
        const json = super.toJSON();
        json['name'] = this.constructor.name;
        json['data'].push(this.pokeball);
        return json;
    }
}
