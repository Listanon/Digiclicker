/// <reference path="CaughtIndicatingItem.ts" />

class PokemonItem extends CaughtIndicatingItem {

    type: PokemonNameType;

    constructor(pokemon: PokemonNameType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint) {
        super(pokemon, basePrice, currency, undefined, undefined, undefined, 'pokemonItem');
        this.type = pokemon;
    }

    gain(amt: number) {
        let shiny = false;
        for (let i = 0; i < amt; i++) {
            shiny = shiny || PokemonFactory.generateShiny(GameConstants.SHINY_CHANCE_SHOP);
        }
        const pokemonName = this.name as PokemonNameType;
        if (shiny) {
            Notifier.notify({
                message: `✨ You obtained a shiny ${pokemonName}! ✨`,
                type: NotificationConstants.NotificationOption.warning,
            });
        }
        App.game.party.gainPokemonById(PokemonHelper.getPokemonByName(pokemonName).id, shiny, true);
    }

    getCaughtStatus(): CaughtStatus {
        return PartyController.getCaughtStatusByName(this.name as PokemonNameType);
    }

    get image() {
        const subDirectory = this.imageDirectory ? `${this.imageDirectory}/` : '';
        return `assets/images/items/${subDirectory}${this.name.replace(/[^\s\w.()-]/g, '')}.png`;
    }
}
