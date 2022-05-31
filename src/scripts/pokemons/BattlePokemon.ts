/// <reference path="../../declarations/GameHelper.d.ts" />

class BattlePokemon implements EnemyPokemonInterface {

    health: KnockoutObservable<number>;
    maxHealth: KnockoutObservable<number>;
    healthPercentage: KnockoutObservable<number>;

    /**
     * In case you want to manually create a Pokémon instead of generating it from the route number
     * @param name Pokémon name
     * @param id Pokémon
     * @param type1 First type of the Pokémon
     * @param type2 Second type of the Pokémon
     * @param maxHealth max health that the Pokémon can have
     * @param level level is 2 times the current route
     * @param catchRate base chance of catching this Pokémon
     * @param exp base exp reward for defeating this Pokémon
     * @param reward currency reward for defeating this Pokémon
     * @param shiny is a shiny variant
     * @param [heldItem] item to possibly gain for defeating this Pokémon
     */

    constructor(
        public name: PokemonNameType,
        public id: number,
        public type1: PokemonType = PokemonType.None,
        public type2: PokemonType = PokemonType.None,
        maxHealth: number,
        public level: number,
        public catchRate: number,
        public exp: number,
        public reward: Amount = new Amount(0, GameConstants.Currency.money),
        public shiny: boolean,
        public gemReward = 1,
        public heldItem?: BagItem
    ) {
        this.health = ko.observable(maxHealth);
        this.maxHealth = ko.observable(maxHealth);
        this.healthPercentage = ko.observable(100);
    }

    public isAlive(): boolean {
        return this.health() > 0;
    }

    /**
     * Lost health without
     * @param damage
     */
    public damage(damage: number): void {
        this.health(Math.max(0, this.health() - damage));
        this.healthPercentage(Math.floor(this.health() / this.maxHealth() * 100));
    }

    public defeat(trainer = false): void {
        GameHelper.incrementObservable(App.game.statistics.pokemonDefeated[this.id]);
        GameHelper.incrementObservable(App.game.statistics.totalPokemonDefeated);
        if (this.shiny) {
            GameHelper.incrementObservable(App.game.statistics.shinyPokemonDefeated[this.id]);
            GameHelper.incrementObservable(App.game.statistics.totalShinyPokemonDefeated);
        }

        if (this.reward.amount > 0) {
            App.game.wallet.addAmount(this.reward);
        }

        if (this.heldItem) {
            const name = BagHandler.displayName(this.heldItem);
            BagHandler.gainItem(this.heldItem);
            if (name  ===  "FightDisk Berry"){
            App.game.wallet.gainAttackcoin(1);}
            else if (name === "ToughDisk Berry"){
            App.game.wallet.gainDefencecoin(1);}
            else if (name === "ChargeDisk Berry"){
            App.game.wallet.gainSpeedcoin(1);}
            else if (name === "OracleDisk Berry"){
            App.game.wallet.gainIntcoin(1);}
            else if (name === "EnergyDisk Berry"){
            App.game.wallet.gainHealthcoin(1);}
            else if (name === "MageDisk Berry"){
            App.game.wallet.gainMagiccoin(1);}

        }
        App.game.party.gainExp(this.exp, this.level, trainer);
        App.game.gems.gainGems(this.gemReward, this.type1);
        App.game.gems.gainGems(this.gemReward, this.type2);
    }
}
