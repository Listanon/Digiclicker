/// <reference path="CaughtIndicatingItem.ts" />

class PokemonItem extends CaughtIndicatingItem {

    type: PokemonNameType;

    constructor(pokemon: PokemonNameType, basePrice: number, currency: GameConstants.Currency = GameConstants.Currency.questPoint, levelreq: number) {
        super(pokemon, basePrice, currency, undefined, levelreq, undefined, undefined, 'pokemonItem');
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

ItemList['Eevee']                = new PokemonItem('Eevee', 1, Currency.healthcoin, 1);
ItemList['Porygon']              = new PokemonItem('Porygon', 1, Currency.healthcoin, 1);
ItemList['Jynx']                 = new PokemonItem('Jynx', 1, Currency.healthcoin, 1);
ItemList['Mr. Mime']             = new PokemonItem('Mr. Mime', 1, Currency.healthcoin, 1);
ItemList['Lickitung']            = new PokemonItem('Lickitung', 1, Currency.healthcoin, 1);
ItemList['Magikarp']             = new PokemonItem('Magikarp', 1, Currency.healthcoin, 1);
ItemList['Togepi']               = new PokemonItem('Togepi', 1, Currency.healthcoin, 1);
ItemList['Beldum']               = new PokemonItem('Beldum', 1, Currency.healthcoin, 1);
ItemList['Skorupi']              = new PokemonItem('Skorupi', 1, Currency.healthcoin, 1);
ItemList['Combee']               = new PokemonItem('Combee', 1, Currency.healthcoin, 1);
ItemList['Burmy (plant)']        = new PokemonItem('Burmy (plant)', 1, Currency.healthcoin, 1);
ItemList['Cherubi']              = new PokemonItem('Cherubi', 1, Currency.healthcoin, 1);
ItemList['Spiritomb']            = new PokemonItem('Spiritomb', 1, Currency.healthcoin, 1);
ItemList['Zorua']                = new PokemonItem('Zorua', 1, Currency.healthcoin, 1);
ItemList['Meloetta (pirouette)'] = new PokemonItem('Meloetta (pirouette)', 1, Currency.healthcoin, 1);
ItemList['Furfrou (Debutante)']  = new PokemonItem('Furfrou (Debutante)', 1, Currency.healthcoin, 1);
ItemList['Furfrou (Diamond)']    = new PokemonItem('Furfrou (Diamond)', 1, Currency.speedcoin, 1);
ItemList['Furfrou (Matron)']     = new PokemonItem('Furfrou (Matron)', 1, Currency.attackcoin, 1);
ItemList['Furfrou (Dandy)']      = new PokemonItem('Furfrou (Dandy)', 1, Currency.intcoin, 1);
ItemList['Furfrou (Kabuki)']     = new PokemonItem('Furfrou (Kabuki)', 1, Currency.defencecoin, 1);
ItemList['Furfrou (Pharaoh)']    = new PokemonItem('Furfrou (Pharaoh)', 1, Currency.magiccoin, 1);
ItemList['Type: Null']           = new PokemonItem('Type: Null', 1, Currency.healthcoin, 1);
ItemList['Poipole']              = new PokemonItem('Poipole', 1, Currency.healthcoin, 1);
ItemList['Eternatus']            = new PokemonItem('Eternatus', 1, Currency.healthcoin, 1);
ItemList['Toxel']                = new PokemonItem('Toxel', 1, Currency.healthcoin, 1);
